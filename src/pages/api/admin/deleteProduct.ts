import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID продукта не указан" });
    }

    const [rows]: any = await db.query(
      "SELECT image FROM products WHERE id = ?",
      [id],
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    const imagePath = rows[0].image;

    // Удаляем из базы данных
    await db.query("DELETE FROM products WHERE id = ?", [id]);

    // Удаляем файл изображения с диска
    if (imagePath) {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    res.status(200).json({ message: "Продукт успешно удалён" });
  } catch (e) {
    console.error("Delete error:", e);
    res.status(500).json({ error: "Ошибка при удалении продукта" });
  }
}
