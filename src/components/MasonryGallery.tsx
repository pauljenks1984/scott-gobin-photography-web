import React from "react";
import Image from "next/image";
import { CloudinaryImage } from "@/lib/cloudinary";

type MasonryGalleryProps = {
  images: CloudinaryImage[];
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images found.</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
      {images.map((img) => (
        <div key={img.asset_id} className="mb-4">
          <Image
            src={img.secure_url}
            alt={img.public_id}
            width={img.width}
            height={img.height}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}