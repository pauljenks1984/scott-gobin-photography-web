// src/pages/api/images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchImagesByFolder } from "@/lib/cloudinary";

// 🔹 Helper: check if image is featured
function isFeatured(img: any): boolean {
  const metaVal = img?.metadata?.featured;
  const fromMeta =
    typeof metaVal === "string"
      ? metaVal.toLowerCase() === "true" || metaVal === "1" || metaVal === "yes"
      : !!metaVal;
  const fromTags = Array.isArray(img?.tags) && img.tags.includes("featured");
  return fromMeta || fromTags;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const folder = (req.query.folder as string) || "photography";
    const cursor = (req.query.cursor as string) || undefined;

    const { resources, next_cursor } = await fetchImagesByFolder(folder, cursor);

    // 🔹 Force featured images first
    const featured = resources.filter(isFeatured);
    const others = resources.filter((r: any) => !isFeatured(r));

    // Sort featured newest → oldest
    featured.sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Combine
    const images = [...featured, ...others];

    res.status(200).json({
      images,
      next_cursor: next_cursor || null,
    });
  } catch (err) {
    console.error("❌ Error fetching images:", err);
    res.status(500).json({ error: "Failed to load images" });
  }
}
