// src/lib/cloudinary.ts

export type CloudinaryImage = {
  asset_id: string;
  public_id: string;
  format: string;
  secure_url: string;
  width: number;
  height: number;
  folder: string;
};

export async function fetchImagesByFolder(folder: string = "photography/commercial") {
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("❌ Missing Cloudinary environment variables");
    return [];
  }

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${folder}/&max_results=100`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`❌ Cloudinary API error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data.resources as CloudinaryImage[];
  } catch (error) {
    console.error("❌ Cloudinary fetch error:", error);
    return [];
  }
}
