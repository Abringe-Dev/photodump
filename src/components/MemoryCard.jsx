import { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import PhotoPolaroid from "@/components/PhotoPolaroid";
import { useLightbox } from "@/context/LightboxContext";
import { formatDate } from "@/lib/date";
import { getMemoryPhotos } from "@/lib/photos";
import { cn } from "@/lib/utils";

export default function MemoryCard({ memory }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const { openLightbox } = useLightbox();
  const photos = useMemo(() => getMemoryPhotos(memory), [memory]);

  useEffect(() => {
    if (!api) return undefined;

    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <SpotlightCard
      spotlightColor={memory.accent}
      intensity={0.28}
      borderGlow={0.85}
      spotlightSize={280}
      className="group/memory"
      style={{
        padding: 0,
        borderRadius: "1.9rem",
        "--spotlight-card-surface": "rgba(10, 21, 52, 0.72)",
        "--spotlight-card-border":
          "linear-gradient(135deg, rgba(255, 143, 184, 0.28), rgba(27, 43, 107, 0.25) 45%, rgba(255, 194, 217, 0.22))",
        "--spotlight-card-shadow":
          "0 34px 80px -42px rgba(2, 5, 15, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="relative z-[2] p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink/20 bg-[#101F4D]/50 px-2.5 py-1 text-[0.68rem] font-bold tracking-wide text-white/75">
            <CalendarDays className="size-3.5 text-pink/80" aria-hidden="true" />
            {formatDate(memory.date, { year: undefined })}
          </span>
          <span className="rounded-full border border-pink/25 bg-pink/15 px-2.5 py-1 text-[0.68rem] font-semibold text-pink-soft">
            {memory.mood} {memory.moodLabel}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl leading-tight text-white sm:text-3xl">
          {memory.title}
        </h3>

        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-pink-soft/85">
          <MapPin className="size-3.5 text-pink" aria-hidden="true" />
          {memory.location}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {memory.description}
        </p>

        <div className="mt-6">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {photos.map((photo, photoIndex) => (
                <CarouselItem key={photo.src}>
                  <PhotoPolaroid
                    memory={memory}
                    photo={photo}
                    index={photoIndex}
                    onOpen={(photoIndex) => openLightbox(photos, photoIndex)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="top-1/2 left-2 size-10 border-pink/25 bg-[#050B1F]/65 text-white backdrop-blur-md hover:bg-[#050B1F]/90 hover:text-pink-soft" />
            <CarouselNext className="top-1/2 right-2 size-10 border-pink/25 bg-[#050B1F]/65 text-white backdrop-blur-md hover:bg-[#050B1F]/90 hover:text-pink-soft" />
          </Carousel>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {photos.map((photo, photoIndex) => (
                <span
                  key={photo.src}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    photoIndex === current
                      ? "w-6 bg-pink"
                      : "w-1.5 bg-white/25",
                  )}
                />
              ))}
            </div>

            <p className="text-xs font-medium text-white/45">
              Photo {current + 1} of {photos.length}
            </p>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
