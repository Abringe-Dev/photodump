import { useMemo, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Masonry from "@/components/reactbits/Masonry";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLightbox } from "@/context/LightboxContext";
import { useCapabilities } from "@/hooks/useCapabilities";
import { memories } from "@/data/memories";
import { formatDate } from "@/lib/date";
import { getAllPhotos, getPhotoId } from "@/lib/photos";
import { cn } from "@/lib/utils";

const allPhotos = getAllPhotos(memories);

const filters = [
  { value: "all", label: "All moments" },
  ...memories.map((memory) => ({
    value: String(memory.id),
    label: memory.title,
  })),
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const { openLightbox } = useLightbox();
  const { isTouch, reduce } = useCapabilities();

  const photos = useMemo(
    () =>
      filter === "all"
        ? allPhotos
        : allPhotos.filter((photo) => String(photo.memoryId) === filter),
    [filter],
  );

  const items = useMemo(
    () =>
      photos.map((photo) => ({
        id: getPhotoId(photo),
        img: photo.src,
        alt: photo.alt,
        width: photo.width,
        height: photo.height,
        title: photo.caption,
        description: `${photo.memoryTitle} · ${formatDate(photo.memoryDate)}`,
      })),
    [photos],
  );

  return (
    <section id="gallery" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="The photo wall"
          title="Our favorite frames"
          subtitle="A messy, happy little collection of us. Tap any photo to see it bigger — I promise the captions are worth it."
        />

        <div className="no-scrollbar -mx-2 overflow-x-auto px-2 pb-2">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(value) => value && setFilter(value)}
            aria-label="Filter gallery by memory"
            className="mx-auto w-max gap-1 rounded-full border border-pink/20 bg-[#101F4D]/50 p-1 backdrop-blur-md"
          >
            {filters.map((item) => (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                aria-label={`Show ${item.label}`}
                className={cn(
                  "h-10 rounded-full px-3 text-xs font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm",
                  "data-[state=on]:bg-pink data-[state=on]:text-ink data-[state=on]:font-bold data-[state=on]:shadow-[0_0_24px_-8px_rgba(255,143,184,0.9)]",
                )}
              >
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {photos.length} photos.
        </p>

        <div className="mt-8 sm:mt-10">
          <Masonry
            key={filter}
            items={items}
            columns="auto"
            columnWidth={286}
            gap={14}
            radius={18}
            animateFrom={reduce ? "none" : "bottom"}
            stagger={0.045}
            duration={0.65}
            bounce={0.12}
            blurToFocus={!reduce}
            revealOnScroll={!reduce}
            hoverEffect={isTouch ? "none" : "tilt"}
            focusOnHover={!isTouch}
            captions={isTouch ? "none" : "hover"}
            parallax={isTouch || reduce ? 0 : 0.16}
            lightbox={false}
            draggable={false}
            onItemClick={(item, index) => openLightbox(photos, index)}
            className="w-full"
          />
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-white/35">
          <ImageIcon className="size-3.5" aria-hidden="true" />
          {photos.length} little pieces of us
        </p>
      </div>
    </section>
  );
}
