import type { NextApiRequest, NextApiResponse } from "next";
import { clearCache } from "./images"; // ✅ import our clearCache helper

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    clearCache(); // wipe in-memory cache
    return res.status(200).json({ success: true, message: "Cache cleared ✅" });
  } catch (err) {
    console.error("❌ Failed to clear cache:", err);
    return res.status(500).json({ error: "Failed to clear cache" });
  }
}
