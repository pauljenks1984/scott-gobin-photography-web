// src/pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchImagesByFolder } from "@/lib/cloudinary";

type Resource = {
  metadata?: Record<string, any>;
  tags?: string[];
  context?: any;
  created_at?: string;
};

type CacheEntry = {
  timestamp: number;
  data: { images: Resource[]; next_cursor?: string | null };
};

// In-memory cache (per server instance)
export const CACHE: Record<string, CacheEntry> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ✅ Check multiple possible places for featured flag
function isFeatured(r: Resource): boolean {
  const metaVal =
    r?.metadata?.featured ??
    r?.metadata?.Featured ??
    r?.context?.featured ??
    r?.context?.custom?.featured;

  const metaYes =
    typeof metaVal !== "undefined" &&
    String(metaVal).toLowerCase() === "true";

  const tagYes =
    Array.isArray(r?.tags) &&
    r.tags.some((t) => String(t).toLowerCase() === "featured");

  return Boolean(metaYes || tagYes);
}

// ✅ Shuffle helper
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const folder = (req.query.folder as string) || "photography";
  const cursor = (req.query.cursor as string) || undefined;
  const cacheKey = `${folder}-${cursor || "first"}`;
  const now = Date.now();

  // Serve fresh cache if available
  if (CACHE[cacheKey] && now - CACHE[cacheKey].timestamp < CACHE_TTL) {
    return res.status(200).json(CACHE[cacheKey].data);
  }

  try {
    const { resources, next_cursor } = await fetchImagesByFolder(folder, cursor);
    const list: Resource[] = Array.isArray(resources) ? resources : [];

    // Split featured vs others
    const featured = list.filter(isFeatured);
    const others = list.filter((r) => !isFeatured(r));

    // Sort featured newest first
    featured.sort(
      (a, b) => +new Date(b.created_at || 0) - +new Date(a.created_at || 0)
    );

    let final: Resource[];
    if (featured.length > 0) {
      // ✅ Featured first, others randomized
      final = [...featured, ...shuffle(others)];
    } else {
      // ✅ No featured → shuffle everything
      final = shuffle(list);
    }

    const data = { images: final, next_cursor: next_cursor || null };

    // Cache sorted result
    CACHE[cacheKey] = { timestamp: now, data };

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching images for folder:", folder, err);

    // Fallback to stale cache if present
    if (CACHE[cacheKey]) {
      return res.status(200).json(CACHE[cacheKey].data);
    }
    return res.status(500).json({ error: "Failed to load images" });
  }
}

// Helper to clear cache manually
export function clearCache() {
  Object.keys(CACHE).forEach((key) => delete CACHE[key]);
  console.log("✅ Cache cleared");
}
