// src/pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchImagesByFolder } from "@/lib/cloudinary";

type CacheEntry = {
  timestamp: number;
  data: { images: any[]; next_cursor?: string | null };
};

const CACHE: Record<string, CacheEntry> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const folder = (req.query.folder as string) || "photography";
  const cursor = req.query.cursor as string | undefined;
  const cacheKey = `${folder}-${cursor || "first"}`;

  const now = Date.now();

  // ✅ Use cache if it’s still fresh
  if (CACHE[cacheKey] && now - CACHE[cacheKey].timestamp < CACHE_TTL) {
    return res.status(200).json(CACHE[cacheKey].data);
  }

  try {
    const { resources, next_cursor } = await fetchImagesByFolder(folder, cursor);

    // ✅ Featured always first
    const featured = resources.filter((img: any) => img.metadata?.featured === "true");
    const others = resources.filter((img: any) => img.metadata?.featured !== "true");
    const sorted = [...featured, ...others];

    const data = { images: sorted, next_cursor: next_cursor || null };

    // ✅ Save to cache
    CACHE[cacheKey] = { timestamp: now, data };

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching images for folder:", folder, err);

    // ✅ Serve stale cache if we have one
    if (CACHE[cacheKey]) {
      return res.status(200).json(CACHE[cacheKey].data);
    }

    return res.status(500).json({ error: "Failed to load images" });
  }
}
