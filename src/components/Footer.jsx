import { ArrowUp, CalendarHeart, Heart, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { site } from "@/data/memories";

export default function Footer() {
  return (
    <footer className="relative z-10 pb-10">
      <div className="shell">
        <Separator className="bg-gradient-to-r from-transparent via-pink/25 to-transparent" />

        <div className="flex flex-col items-center gap-6 pt-10 text-center">
          <span className="relative flex size-14 items-center justify-center rounded-full border border-pink/30 bg-pink/10 text-pink">
            <Heart className="size-6 animate-[heartbeat_2.8s_ease-in-out_infinite] fill-current" aria-hidden="true" />
            <span className="absolute inset-0 animate-ping rounded-full border border-pink/25 [animation-duration:4s]" />
          </span>

          <div>
            <p className="font-display text-2xl text-pink-soft sm:text-3xl">
              Our Story
            </p>
            <p className="mt-2 text-sm text-white/50">
              A tiny corner of the internet that belongs to us.
            </p>
          </div>

          {/* Next date teaser */}
          {site.nextDate && (
            <div className="inline-flex items-center gap-2 rounded-full border border-pink/25 bg-gradient-to-r from-pink/15 via-[#101F4D]/70 to-[#1B2B6B]/40 px-5 py-2 text-xs font-semibold text-pink-soft shadow-[0_0_20px_-5px_rgba(255,143,184,0.4)] backdrop-blur-sm">
              <CalendarHeart className="size-3.5 text-pink" aria-hidden="true" />
              <span>Next date:</span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 font-bold text-white tracking-wider">
                {site.nextDate}
              </span>
              <span className="text-white/30">·</span>
              <span className="text-pink/80">Can't wait 🤫</span>
            </div>
          )}

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-white/55">
              <li>
                <a href="#home" className="transition-colors hover:text-pink-soft">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#memories"
                  className="transition-colors hover:text-pink-soft"
                >
                  Memories
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="transition-colors hover:text-pink-soft"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#letter"
                  className="transition-colors hover:text-pink-soft"
                >
                  Message
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-1.5">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-soft">
              Made with 💗 just for you
            </p>
            <p className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.12em] text-white/35 uppercase">
              <Sparkles className="size-3 text-pink" aria-hidden="true" />
              Every moment with you is my favorite
            </p>
            <p className="text-[0.68rem] text-white/30">
              Forever &amp; always 💗
            </p>
          </div>

          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full border border-pink/20 bg-[#101F4D]/40 px-4 py-2 text-xs font-semibold text-white/65 transition-colors hover:bg-[#101F4D]/70 hover:text-pink-soft"
          >
            <ArrowUp className="size-3.5" aria-hidden="true" />
            Back to the beginning
          </a>
        </div>
      </div>
    </footer>
  );
}
