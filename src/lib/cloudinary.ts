// src/lib/cloudinary.ts

export type CloudinaryImage = {
  asset_id?: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format?: string;
  created_at?: string;
  tags?: string[];
  context?: Record<string, string>;
  bytes?: number;
  folder?: string;
  version?: number;
};

export async function fetchImagesByFolder(
  folder: string = "photography"
): Promise<CloudinaryImage[]> {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!CLOUD_NAME) {
    console.error("❌ Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
    return [];
  }

  try {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder}.json`;
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`❌ Cloudinary request failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    const resources: CloudinaryImage[] = (data.resources || []).sort(
      (a: CloudinaryImage, b: CloudinaryImage) => (b.version || 0) - (a.version || 0)
    );

    return resources;
  } catch (error) {
    console.error("❌ Cloudinary fetch error:", error);
    return [];
  }
}
