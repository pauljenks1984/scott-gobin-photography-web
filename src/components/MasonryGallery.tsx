// src/components/MasonryGallery.tsx
import Masonry from "react-masonry-css";
import ImageCard from "./ImageCard";

type ImageResource = {
  public_id: string;
  secure_url: string;
  metadata?: Record<string, any>;
};

export default function MasonryGallery({ images }: { images: ImageResource[] }) {
  return (
    <Masonry
      breakpointCols={{
        default: 3,   // desktop (>= 1024px)
        1024: 2,      // tablet
        640: 1        // mobile
      }}
      className="flex w-full gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {images.map((img) => (
        <ImageCard key={img.public_id} image={img} />
      ))}
    </Masonry>
  );
}
