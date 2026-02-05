import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Ошибка загрузки файла" });

    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file) return res.status(400).json({ error: "Файл не найден" });

    const fileName = `${Date.now()}_${file.originalFilename}`;
    const newPath = path.join(uploadDir, fileName);

    fs.renameSync(file.filepath, newPath);

    // Приводим поля к нужным типам
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const priceStr = Array.isArray(fields.price)
      ? fields.price[0]
      : fields.price;

    if (!name || !priceStr)
      return res
        .status(400)
        .json({ error: "Поля name или price не заполнены" });

    const price = Number(priceStr);

    try {
      await db.query(
        "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
        [name, price, `/uploads/${fileName}`],
      );
      res
        .status(200)
        .json({ message: "Продукт добавлен", image: `/uploads/${fileName}` });
    } catch (e) {
      res.status(500).json({ error: "Ошибка при сохранении в базе" });
    }
  });
}
