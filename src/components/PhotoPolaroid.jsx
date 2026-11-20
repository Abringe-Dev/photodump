import { Maximize2 } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { cn } from "@/lib/utils";

const tapes = ["", "washi-lavender", "washi-gold"];

export default function PhotoPolaroid({ memory, photo, index, onOpen }) {
  const tilt = ((memory.id * 3 + index * 5) % 5) - 2;

  return (
    <div
      className="polaroid mx-auto w-full max-w-sm"
      style={{ "--tilt": `${tilt}deg` }}
    >
      <span
        aria-hidden="true"
        className={cn("washi -top-2 -left-3 -rotate-6", tapes[index % tapes.length])}
      />
      <span
        aria-hidden="true"
        className={cn(
          "washi -right-3 -bottom-2 rotate-3 scale-75",
          tapes[(index + 1) % tapes.length],
        )}
      />

      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open photo: ${photo.caption}`}
        className="group/photo relative block w-full overflow-hidden rounded-[3px] focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <SmartImage
          src={photo.src}
          alt={photo.alt || photo.caption}
          width={photo.width}
          height={photo.height}
          wrapperClassName="aspect-[4/5] w-full"
          className="transition-transform duration-700 group-hover/photo:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0630]/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100" />
        <span className="pointer-events-none absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-white/18 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100">
          <Maximize2 className="size-3.5" aria-hidden="true" />
        </span>
      </button>

      <span className="polaroid-caption line-clamp-2">{photo.caption}</span>
    </div>
  );
}
