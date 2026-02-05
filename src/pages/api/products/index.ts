import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const [products] = await db.execute("SELECT * FROM products");
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
}
