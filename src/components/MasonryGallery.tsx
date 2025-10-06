// src/components/MasonryGallery.tsx
import Masonry from "react-masonry-css";

type ImageResource = {
  public_id: string;
  secure_url: string;
  metadata?: Record<string, any>;
};

export default function MasonryGallery({
  images,
  onClick,
}: {
  images: ImageResource[];
  onClick?: (index: number) => void;
}) {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        1280: 3,
        1024: 2,
        768: 1,
        640: 1,
      }}
      className="flex w-full gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {images.map((img, index) => (
        <div
          key={img.public_id}
          className="relative w-full cursor-pointer overflow-hidden rounded"
          style={{ breakInside: "avoid" }}
          onClick={() => onClick?.(index)}
        >
          <img
            src={img.secure_url}
            alt={img.public_id}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </Masonry>
  );
}
