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
};

export default function Commercial() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadImages() {
      try {
        // ✅ point to a new API route just for this folder
        const res = await fetch("/api/images?folder=photography/commercial");
        const data = await res.json();

        const sorted = data.sort((a: any, b: any) => b.version - a.version);
        setImages(sorted);
      } catch (err) {
        console.error("❌ Error loading images:", err);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  const slides = images.map((img) => ({ src: img.secure_url }));

  return (
    <Layout>
      <SEOHead title="Commercial" description="Scott-Gobin Photography — Commercial portfolio" />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold my-8">Commercial</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : images.length > 0 ? (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {images.map((img, index) => (
              <img
                key={img.id}
                src={img.secure_url}
                alt={img.public_id}
                className="w-full cursor-pointer shadow-sm hover:opacity-80 transition"
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
