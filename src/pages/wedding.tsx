// src/pages/wedding.tsx
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

export default function Wedding() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState(false);

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
        `/api/images?folder=photography/wedding${cursor ? `&cursor=${cursor}` : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (!data || !Array.isArray(data.images)) return;

      // ✅ Featured first
      const featured = data.images.filter(
        (img: CloudinaryImage) => img.metadata?.featured === "true"
      );
      const others = data.images.filter(
        (img: CloudinaryImage) => img.metadata?.featured !== "true"
      );
      const sorted = [...featured, ...others];

      setImages((prev) => [...prev, ...sorted]);
      setNextCursor(data.next_cursor || null);
    } catch (err) {
      console.error("❌ Error loading images:", err);
      setError(true);
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
  const breakpointColumnsObj = {
        default: 3,   // desktop (>= 1024px)
        1024: 2,      // tablet
        640: 1        // mobile
  };

  return (
    <Layout>
      <SEOHead
        title="Wedding"
        description="Scott-Gobin Photography — Wedding portfolio"
      />
      <div className="max-w-8xl mx-auto px-4 pt-4">
        <h1 className="visually-hidden text-3xl font-semibold my-8">Wedding</h1>

        {loading && <p className="text-center text-gray-500">Loading gallery...</p>}

        {error ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">
              ⚠️ Wedding gallery is unavailable right now. Please try again later.
            </p>
            <img
              src="/fallback.jpg"
              alt="Fallback gallery"
              className="mx-auto max-w-sm opacity-70"
            />
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
          >
            {images.map((img, index) => (
              <div
                key={img.id || img.public_id || `${index}-${img.secure_url}`}
                style={{ breakInside: "avoid" }}
              >
                <ProgressiveImage
                  img={img}
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            ))}
          </Masonry>
        )}

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
