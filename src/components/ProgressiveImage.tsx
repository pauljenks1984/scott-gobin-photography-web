import React, { useState } from "react";

type Props = {
  img: {
    secure_url: string;
    public_id: string;
    width?: number;
    height?: number;
  };
  onClick: () => void;
};

export default function ProgressiveImage({ img, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  // Default aspect ratio if missing
  const aspectRatio =
    img.width && img.height ? (img.height / img.width) * 100 : 66.66;

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden rounded"
      style={{ paddingBottom: `${aspectRatio}%` }}
      onClick={onClick}
    >
      {/* Placeholder background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          loaded ? "bg-transparent" : "bg-gray-100"
        }`}
      />

      {/* Main image */}
      <img
        src={img.secure_url}
        alt={img.public_id}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}