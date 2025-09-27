export async function fetchImagesByFolder(folder: string = "photography") {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  try {
    const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder}.json`;
    const res = await fetch(url);
    const data = await res.json();

    return data.resources || [];
  } catch (error) {
    console.error("❌ Cloudinary fetch error:", error);
    return [];
  }
}
