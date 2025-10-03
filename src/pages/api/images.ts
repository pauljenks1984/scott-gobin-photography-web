// src/pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchImagesByFolder } from "@/lib/cloudinary";

// 🔹 In-memory cache
let cache: any[] | null = null;
let lastFetch = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now();

  // If cache exists and is fresh (< 60s old), return it
  if (cache && now - lastFetch < 60000) {
    return res.status(200).json(cache);
  }

  try {
    const folders = [
      "photography/commercial",
      "photography/weddings",
      "photography/fashion",
      "photography/portraits",
    ];

    // Fetch from all folders
    const allImages = await Promise.all(folders.map(folder => fetchImagesByFolder(folder)));
    const merged = allImages.flat();

    // Separate featured vs others
    const featured = merged.filter(img => img.tags?.includes("featured"));
    const others = merged.filter(img => !img.tags?.includes("featured"));

    // Sort featured by newest first
    const sortedFeatured = featured.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Shuffle others
    const shuffledOthers = others.sort(() => Math.random() - 0.5);

    // Combine
    const final = [...sortedFeatured, ...shuffledOthers];

    // Store in cache
    cache = final;
    lastFetch = now;

    res.status(200).json(final);
  } catch (err) {
    console.error("❌ Error fetching all images:", err);
    res.status(500).json({ error: "Failed to load images" });
  }
}
