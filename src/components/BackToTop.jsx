import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, Heart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="fixed right-4 bottom-4 z-40 safe-bottom sm:right-6 sm:bottom-6"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: reduce ? "auto" : "smooth",
                  })
                }
                aria-label="Back to top"
                className="group relative flex size-12 items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink sm:size-14"
              >
                <Heart
                  className="size-12 fill-pink/90 text-pink-soft drop-shadow-[0_8px_24px_rgba(255,126,182,0.6)] transition-all duration-300 group-hover:fill-pink group-hover:drop-shadow-[0_12px_28px_rgba(255,126,182,0.95)] sm:size-14"
                  aria-hidden="true"
                />
                <span className="absolute flex items-center justify-center -translate-y-0.5 text-ink">
                  <ArrowUp className="size-4 stroke-[3]" aria-hidden="true" />
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">Back to the beginning</TooltipContent>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
