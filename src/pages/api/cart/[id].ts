import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-this";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ error: "Not auth" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;

      const [items]: any = await db.execute(
        `SELECT oi.order_id
         FROM order_items oi
         JOIN orders o ON oi.order_id = o.id
         WHERE oi.id = ? AND o.user_id = ?`,
        [id, decoded.userId],
      );

      if (items.length === 0) {
        return res.status(404).json({ error: "doesnt seem" });
      }

      const orderId = items[0].order_id;

      await db.execute("DELETE FROM order_items WHERE id = ?", [id]);

      await db.execute(
        `UPDATE orders
         SET total = (SELECT COALESCE(SUM(quantity * price), 0) FROM order_items WHERE order_id = ?)
         WHERE id = ?`,
        [orderId, orderId],
      );

      return res.status(200).json({ message: "Item deleted" });
    } catch (error) {
      console.error("Error deleting:", error);
      return res.status(500).json({ error: "Error server" });
    }
  } else if (req.method === "PATCH") {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ error: "Dont auth" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const { quantity } = req.body;

      if (quantity < 1) {
        return res.status(400).json({ error: "quantity must be >= 1" });
      }

      const [items]: any = await db.execute(
        `SELECT oi.order_id
         FROM order_items oi
         JOIN orders o ON oi.order_id = o.id
         WHERE oi.id = ? AND o.user_id = ?`,
        [id, decoded.userId],
      );

      if (items.length === 0) {
        return res.status(404).json({ error: "product doesnt seem" });
      }

      const orderId = items[0].order_id;

      await db.execute("UPDATE order_items SET quantity = ? WHERE id = ?", [
        quantity,
        id,
      ]);

      await db.execute(
        `UPDATE orders
         SET total = (SELECT SUM(quantity * price) FROM order_items WHERE order_id = ?)
         WHERE id = ?`,
        [orderId, orderId],
      );

      return res.status(200).json({ message: "quantity updated" });
    } catch (error) {
      console.error("update error:", error);
      return res.status(500).json({ error: "error server" });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
