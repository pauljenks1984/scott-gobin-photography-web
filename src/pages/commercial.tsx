import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import Lightbox from "yet-another-react-lightbox";
import ProgressiveImage from "@/components/ProgressiveImage";
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

export default function Commercial() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/images?folder=photography/commercial");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (!data || !Array.isArray(data.images)) return;

        const featured = data.images.filter(
          (img: CloudinaryImage) => img.metadata?.featured === "true"
        );
        const others = data.images.filter(
          (img: CloudinaryImage) => img.metadata?.featured !== "true"
        );

        const newImages = [...featured, ...others];
        setImages(newImages);
      } catch (err) {
        console.error("❌ Error loading images:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const slides = images.map((img) => ({ src: img.secure_url }));

  return (
    <Layout>
      <SEOHead
        title="Commercial"
        description="Scott-Gobin Photography — Commercial portfolio"
      />
      <div className="max-w-8xl mx-auto px-4">
        <h1 className="sr-only">Commercial</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">
              ⚠️ Commercial gallery is unavailable right now. Please try again later.
            </p>
            <img
              src="/fallback.jpg"
              alt="Fallback gallery"
              className="mx-auto max-w-sm opacity-70"
            />
          </div>
        ) : images.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
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
          </div>
        ) : (
          <p className="text-center text-gray-400">No images found.</p>
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
