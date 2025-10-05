import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Lightbox from "yet-another-react-lightbox";
import ProgressiveImage from "@/components/ProgressiveImage";
import Masonry from "react-masonry-css";
import "yet-another-react-lightbox/styles.css";

type CloudinaryImage = {
  id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  folder?: string;
  metadata?: Record<string, string>;
};

export default function Home() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initial load
  useEffect(() => {
    loadImages();
  }, []);

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        nextCursor
      ) {
        loadMore();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextCursor]);

  const loadImages = async (cursor?: string) => {
    try {
      const res = await fetch(
        `/api/images?folder=photography${cursor ? `&cursor=${cursor}` : ""}`
      );
      const data = await res.json();

      if (!data || !Array.isArray(data.images)) return;

      // ✅ Featured first
      const featured = data.images.filter(
        (img: CloudinaryImage) => img.metadata?.featured === "true"
      );
      const others = data.images.filter(
        (img: CloudinaryImage) => img.metadata?.featured !== "true"
      );

      // Avoid duplicates if same image appears again
      const newImages = [...featured, ...others].filter(
        (img) => !images.some((existing) => existing.id === img.id)
      );

      setImages((prev) => [...prev, ...newImages]);
      setNextCursor(data.next_cursor || null);
    } catch (err) {
      console.error("❌ Error loading images:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextCursor) return;
    await loadImages(nextCursor);
  };

  const slides = images.map((img) => ({ src: img.secure_url }));

  // ✅ Masonry breakpoints
  const breakpointColumns = {
    default: 3,
    768: 2, // mobile
  };

  return (
    <Layout>
      <SEOHead title="Home" description="Scott-Gobin Photography — Featured work" />
      <div className="max-w-8xl mx-auto px-4">
        <h1 className="sr-only">Featured Work</h1>

        {loading && <p className="text-center text-gray-500">Loading gallery...</p>}

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex gap-4"
          columnClassName="space-y-4"
        >
          {images.map((img, index) => (
            <ProgressiveImage
              key={img.id || img.public_id || `${index}-${img.secure_url}`}
              img={img}
              onClick={() => {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }}
            />
          ))}
        </Masonry>

        {nextCursor && (
          <div className="text-center my-8">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={slides}
      />
    </Layout>
  );
}
