import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

type CloudinaryImage = {
  id: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
};

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  useEffect(() => {
    async function loadImages() {
      const res = await fetch("/api/images?folder=photography/commercial");
      const data = await res.json();
      setImages(data);
    }
    loadImages();
  }, []);

  const breakpoints = { default: 3, 1100: 2, 700: 1 };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.secure_url}
          alt={img.public_id}
          style={{
            width: "100%",
            display: "block",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        />
      ))}
    </Masonry>
  );
}
