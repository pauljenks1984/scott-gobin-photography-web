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
      {images.map((img, index) => {
        const readableAlt = img.public_id.split("/").pop()?.replace(/[-_]/g, " ") ?? img.public_id;
        return (
          <div
            key={img.public_id}
            role="button"
            tabIndex={0}
            aria-label={`View photo: ${readableAlt}`}
            className="relative w-full cursor-pointer overflow-hidden rounded"
            style={{ breakInside: "avoid" }}
            onClick={() => onClick?.(index)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick?.(index); } }}
          >
            <img
              src={img.secure_url}
              alt={readableAlt}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        );
      })}
    </Masonry>
  );
}
