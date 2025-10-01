import React from "react";

export type CloudinaryImage = {
  public_id: string;
  secure_url: string;
  format?: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

type MasonryGalleryProps = {
  images: CloudinaryImage[];
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images found.</p>;
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((img) => (
        <img
          key={img.public_id}
          src={img.secure_url}
          alt={img.public_id}
          className="w-full mb-4 shadow-sm hover:opacity-90 transition"
          loading="lazy"
        />
      ))}
    </div>
  );
}
