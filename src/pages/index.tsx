import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type CloudinaryImage = {
  id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  folder?: string;
  tags?: string[];
};

export default function Home() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("❌ Error loading images:", err);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  // Split featured and normal
  const featured = images.filter((img) => img.tags?.includes("featured"));
  const normal = images.filter((img) => !img.tags?.includes("featured"));

  // Merge for lightbox indexing
  const allImages = [...featured, ...normal];
  const slides = allImages.map((img) => ({ src: img.secure_url }));

  return (
    <Layout>
      <SEOHead title="Home" description="Scott-Gobin Photography — Featured work" />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="sr-only">Featured Work</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : (
          <>
            {/* Featured Section */}
            {featured.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Featured</h2>
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {featured.map((img, index) => (
                    <img
                      key={img.id}
                      src={img.secure_url}
                      alt={img.public_id}
                      className="w-full cursor-pointer rounded shadow-md hover:opacity-80 transition"
                      onClick={() => {
                        setCurrentIndex(index); // index based on allImages
                        setLightboxOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Normal Masonry Section */}
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {normal.map((img, index) => (
                <img
                  key={img.id}
                  src={img.secure_url}
                  alt={img.public_id}
                  className="w-full cursor-pointer shadow-sm hover:opacity-80 transition"
                  onClick={() => {
                    // offset index by featured count
                    setCurrentIndex(index + featured.length);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={slides}
      />
    </Layout>
  );
}