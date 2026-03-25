import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method doesnt allow" });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Incorrect mail format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "The password must contain 6 characters",
      });
    }

    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return res.status(400).json({
        error: "User data was not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, name, "student"],
    );

    const userId = (result as any).insertId;

    return res.status(201).json({
      user: {
        id: userId,
        email: email,
        name: name,
        role: "student",
      },
      message: "Registration is successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: "Server error during registration",
    });
  }
}
