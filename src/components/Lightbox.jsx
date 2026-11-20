import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SmartImage from "@/components/SmartImage";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export default function Lightbox({
  open,
  photos = [],
  index = 0,
  onIndexChange,
  onClose,
}) {
  const reduce = useReducedMotion() ?? false;
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(null);
  const count = photos.length;
  const photo = photos[index];

  const go = useCallback(
    (delta) => {
      if (!count) return;
      setDirection(delta);
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, go]);

  useEffect(() => {
    if (!open || !count) return;

    [index - 1, index + 1].forEach((nextIndex) => {
      const next = photos[(nextIndex + count) % count];
      if (!next) return;
      const image = new Image();
      image.src = next.src;
    });
  }, [open, index, count, photos]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    touchStart.current = null;

    if (Math.abs(distance) > 48) go(distance > 0 ? -1 : 1);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-[#0d0318]/[0.96] p-0 text-foreground ring-0 backdrop-blur-2xl sm:top-1/2 sm:left-1/2 sm:h-[min(92dvh,920px)] sm:w-[min(96vw,1120px)] sm:max-w-[1120px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:ring-1 sm:ring-pink-soft/20"
      >
        <DialogTitle className="sr-only">
          {photo ? `${photo.memoryTitle} photo viewer` : "Photo viewer"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Use the previous and next buttons, arrow keys, or swipe to move
          between photos.
        </DialogDescription>

        {photo && (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <Badge
                variant="outline"
                className="border-pink-soft/25 bg-white/5 px-2.5 py-1 text-pink-soft"
              >
                {index + 1} / {count}
              </Badge>
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white/85">
                {photo.memoryTitle}
              </p>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-11 shrink-0 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/15"
                  aria-label="Close photo viewer"
                >
                  <X className="size-5" />
                </Button>
              </DialogClose>
            </div>

            <div
              className="relative min-h-0 flex-1 touch-pan-y overflow-hidden bg-black/20"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={photo.src}
                  custom={direction}
                  initial={
                    reduce ? { opacity: 0 } : { opacity: 0, x: direction * 38 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduce ? { opacity: 0 } : { opacity: 0, x: direction * -38 }
                  }
                  transition={{ duration: reduce ? 0.01 : 0.28, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
                >
                  <SmartImage
                    src={photo.src}
                    alt={photo.alt || photo.caption}
                    width={photo.width}
                    height={photo.height}
                    fit="contain"
                    eager
                    wrapperClassName="h-full w-full bg-transparent"
                    className="max-h-full rounded-xl"
                  />
                </motion.div>
              </AnimatePresence>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute top-1/2 left-2 z-10 size-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md hover:bg-black/60 sm:left-4 sm:size-12"
                  >
                    <ChevronLeft className="size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden sm:block">
                  Previous · ←
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute top-1/2 right-2 z-10 size-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md hover:bg-black/60 sm:right-4 sm:size-12"
                  >
                    <ChevronRight className="size-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="hidden sm:block">
                  Next · →
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="shrink-0 border-t border-white/10 bg-[#160629]/[0.88] px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="min-w-0 flex-1 text-sm font-medium text-pink-soft sm:text-base">
                  {photo.caption}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(photo.memoryDate)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {photo.memoryLocation}
                  </span>
                </div>
              </div>

              <div className="no-scrollbar mt-3 hidden gap-2 overflow-x-auto pb-1 sm:flex">
                {photos.map((item, itemIndex) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => {
                      setDirection(itemIndex > index ? 1 : -1);
                      onIndexChange(itemIndex);
                    }}
                    aria-label={`View photo ${itemIndex + 1}: ${item.caption}`}
                    aria-current={itemIndex === index ? "true" : undefined}
                    className={cn(
                      "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all focus-visible:ring-2 focus-visible:ring-pink-soft",
                      itemIndex === index
                        ? "scale-105 border-pink opacity-100"
                        : "border-white/10 opacity-55 hover:opacity-90",
                    )}
                  >
                    <SmartImage
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      wrapperClassName="h-full w-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

