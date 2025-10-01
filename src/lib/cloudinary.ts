// src/lib/cloudinary.ts
export async function fetchImagesByFolder(folder: string) {
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("❌ Missing Cloudinary environment variables");
    return [];
  }

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

    const body = {
      expression: `folder:${folder}/*`,
      max_results: 100,
      with_field: ["context", "metadata", "tags"], // 👈 force context & metadata in response
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`❌ Cloudinary API error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    // 🔎 For debugging: log the first resource’s context/metadata
    if (data.resources.length > 0) {
      console.log("📝 Example context:", data.resources[0].context);
      console.log("📝 Example metadata:", data.resources[0].metadata);
    }

    return data.resources;
  } catch (error) {
    console.error("❌ Cloudinary fetch error:", error);
    return [];
  }
}
