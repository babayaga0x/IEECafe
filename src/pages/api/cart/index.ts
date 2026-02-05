import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-this";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ error: "Не авторизован" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Нахождение или создание корзины
      const [orders]: any = await db.execute(
        "SELECT id FROM orders WHERE user_id = ? AND status = 'cart' LIMIT 1",
        [decoded.userId],
      );

      let orderId;
      if (orders.length === 0) {
        const [result]: any = await db.execute(
          "INSERT INTO orders (user_id, total, status) VALUES (?, 0, 'cart')",
          [decoded.userId],
        );
        orderId = result.insertId;
      } else {
        orderId = orders[0].id;
      }

      // Получение товаров
      const [cartItems] = await db.execute(
        `SELECT
          oi.id,
          oi.quantity,
          oi.price,
          p.id as product_id,
          p.name,
          p.image
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
        ORDER BY oi.created_at DESC`,
        [orderId],
      );

      return res.status(200).json({ cartItems });
    } catch (error) {
      console.error("Ошибка получения корзины:", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  } else if (req.method === "POST") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ error: "Не авторизован" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;

      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "ID товара обязателен" });
      }

      // Получение товара
      const [products]: any = await db.execute(
        "SELECT id, price FROM products WHERE id = ?",
        [productId],
      );

      if (products.length === 0) {
        return res.status(404).json({ error: "Товар не найден" });
      }

      const product = products[0];

      // Нахождение или создание корзины
      const [orders]: any = await db.execute(
        "SELECT id FROM orders WHERE user_id = ? AND status = 'cart' LIMIT 1",
        [decoded.userId],
      );

      let orderId;
      if (orders.length === 0) {
        const [result]: any = await db.execute(
          "INSERT INTO orders (user_id, total, status) VALUES (?, 0, 'cart')",
          [decoded.userId],
        );
        orderId = result.insertId;
      } else {
        orderId = orders[0].id;
      }

      // Проверка товара
      const [existingItems]: any = await db.execute(
        "SELECT id, quantity FROM order_items WHERE order_id = ? AND product_id = ?",
        [orderId, productId],
      );

      if (existingItems.length > 0) {
        await db.execute(
          "UPDATE order_items SET quantity = quantity + 1 WHERE id = ?",
          [existingItems[0].id],
        );
      } else {
        await db.execute(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, 1, ?)",
          [orderId, productId, product.price],
        );
      }

      // total
      await db.execute(
        `UPDATE orders
         SET total = (SELECT SUM(quantity * price) FROM order_items WHERE order_id = ?)
         WHERE id = ?`,
        [orderId, orderId],
      );

      return res.status(200).json({ message: "Товар добавлен в корзину" });
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      return res.status(500).json({ error: "Ошибка сервера" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
