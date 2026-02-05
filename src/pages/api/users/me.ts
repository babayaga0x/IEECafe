import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { verifyToken } from "@/lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Метод не разрешен" });
  }

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Не авторизован" });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: "Токен невалидный или истек" });
    }

    return res.status(200).json({
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
