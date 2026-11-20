import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  eager = false,
  fit = "cover",
  sizes,
}) {
  const fallback = "/photos/_placeholder.svg";
  const [image, setImage] = useState({ src, loaded: false, failed: false });

  useEffect(() => {
    setImage({ src, loaded: false, failed: false });
  }, [src]);

  const handleError = () => {
    if (image.src !== fallback) {
      setImage({ src: fallback, loaded: false, failed: false });
      return;
    }
    setImage((current) => ({ ...current, failed: true }));
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[#3a1157] via-[#7a2d87] to-[#ff7eb6]",
        wrapperClassName,
      )}
    >
      {!image.failed && (
        <img
          src={image.src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          onLoad={() => setImage((current) => ({ ...current, loaded: true }))}
          onError={handleError}
          className={cn(
            "image-blur-up h-full w-full",
            fit === "contain" ? "object-contain" : "object-cover",
            image.loaded && "is-loaded",
            className,
          )}
        />
      )}

      {image.failed && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#2a0b45] text-pink-soft">
          <Heart className="size-8" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide">
            A photo goes here
          </span>
        </div>
      )}

      {!image.loaded && !image.failed && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_55%)]"
        />
      )}
    </div>
  );
}
