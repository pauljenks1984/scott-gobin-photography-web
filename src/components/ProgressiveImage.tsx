import React, { useState } from "react";
import { cloudinaryUrl } from "@/lib/cloudinary";

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

  const readableAlt = img.public_id.split("/").pop()?.replace(/[-_]/g, " ") ?? img.public_id;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${readableAlt}`}
      className="relative w-full cursor-pointer overflow-hidden rounded"
      style={{ paddingBottom: `${aspectRatio}%` }}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      {/* Placeholder background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          loaded ? "bg-transparent" : "bg-gray-100"
        }`}
      />

      {/* Main image */}
      <img
        src={cloudinaryUrl(img.secure_url, "f_auto,q_auto,w_800")}
        alt={readableAlt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}