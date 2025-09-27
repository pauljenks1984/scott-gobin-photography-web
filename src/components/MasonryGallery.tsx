import React from "react";

type CloudinaryImage = {
  public_id: string;
  secure_url: string;
  [key: string]: any;
};

type MasonryGalleryProps = {
  images: CloudinaryImage[];
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((img) => (
        <img
          key={img.public_id}
          src={img.secure_url}
          alt={img.public_id}
          className="w-full mb-4 rounded-lg"
        />
      ))}
    </div>
  );
}
