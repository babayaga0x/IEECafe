import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { db } from "@/lib/db";
import { createToken } from "@/lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешен" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email и пароль обязательны",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(401).json({
        error: "Неверный email или пароль",
      });
    }

    const user = users[0] as any;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Неверный email или пароль",
      });
    }

    const token = createToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: "Вход выполнен успешно",
    });
  } catch (error) {
    console.error("Ошибка входа:", error);
    return res.status(500).json({
      error: "Ошибка сервера при входе",
    });
  }
}
