import { Heart, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import MemoryCard from "@/components/MemoryCard";
import FadeContent from "@/components/reactbits/FadeContent";
import { memories, site } from "@/data/memories";
import { cn } from "@/lib/utils";

const sortedMemories = [...memories].sort((a, b) => a.date.localeCompare(b.date));

export default function Timeline() {
  return (
    <section id="memories" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Our timeline"
          title="Little moments, big feelings"
          subtitle="The dates I replay in my head, in the order they happened. Every one of them is a favorite for a different reason."
        />

        <div className="timeline-line relative mx-auto max-w-5xl">
          {sortedMemories.map((memory, index) => (
            <div
              key={memory.id}
              className={cn(
                "relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0",
                index !== sortedMemories.length - 1 && "md:pb-20",
              )}
            >
              <span
                aria-hidden="true"
                className="absolute top-6 left-5 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-pink/30 bg-[#0A1534] text-pink shadow-[0_0_0_6px_rgba(5,11,31,0.95),0_0_30px_-6px_rgba(255,143,184,0.7)] md:left-1/2"
              >
                <Heart className="size-4 fill-current" />
              </span>

              <div
                className={cn(
                  "relative",
                  index % 2 === 0
                    ? "md:col-start-2 md:pl-2"
                    : "md:col-start-1 md:row-start-1 md:pr-2",
                )}
              >
                <FadeContent
                  effect="focus"
                  blur={3}
                  duration={0.9}
                  threshold={0.08}
                  className="h-full"
                >
                  <MemoryCard memory={memory} index={index} />
                </FadeContent>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-md text-center">
          <div className="hairline mx-auto mb-7 w-40" />
          <p className="inline-flex items-center gap-2 font-display text-xl text-pink-soft/90">
            <Sparkles className="size-4 text-pink" aria-hidden="true" />
            The best chapters are still blank
          </p>
          <p className="mt-2 text-sm text-white/50">
            Next up: {site.nextDate}. I already can't wait.
          </p>
        </div>
      </div>
    </section>
  );
}
