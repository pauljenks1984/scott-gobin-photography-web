import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: "Missing Cloudinary credentials" });
    }

    const auth = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload?max_results=50`,
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );

    const data = await response.json();

    // ✅ Clean up the response for frontend use
    const images = (data.resources || []).map((img: any) => ({
      id: img.asset_id,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      folder: img.asset_folder,
    }));

    return res.status(200).json(images);
  } catch (error) {
    console.error("❌ Cloudinary API error:", error);
    return res.status(500).json({ error: "Failed to fetch images" });
  }
}
