export async function fetchImagesByFolder(folder: string, nextCursor?: string) {
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error("❌ Missing Cloudinary environment variables");
  }

  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

  const body: any = {
    expression: `folder:${folder}/*`,
    max_results: 50,
    with_field: ["context", "metadata", "tags"], // width/height are included automatically
  };

  if (nextCursor) {
    body.next_cursor = nextCursor;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Cloudinary API error: ${res.status} - ${res.statusText}`);
  }

  const data = await res.json();

  return {
    resources: data.resources,
    next_cursor: data.next_cursor || null,
  };
}
