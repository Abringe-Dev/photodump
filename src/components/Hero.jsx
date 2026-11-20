import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import Stack from "@/components/reactbits/Stack";
import Aurora from "@/components/reactbits/Aurora";
import { useCapabilities } from "@/hooks/useCapabilities";
import { memories, site } from "@/data/memories";
import { getRecentPhotos } from "@/lib/photos";

export default function Hero() {
  const { heavyEffects, reduce } = useCapabilities();
  const stackPhotos = getRecentPhotos(memories, 3);

  const cards = stackPhotos.map((photo) => (
    <div key={photo.src} className="relative h-full w-full overflow-hidden bg-paper">
      <img
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        draggable={false}
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050B1F]/90 to-transparent p-4 pt-12 text-xs font-semibold text-white/90">
        {photo.memoryTitle}
      </span>
    </div>
  ));

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24"
    >
      {heavyEffects && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[75%] opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_52%,transparent_100%)]"
        >
          <Aurora
            colorStops={["#FF8FB8", "#101F4D", "#FFC2D9"]}
            amplitude={0.8}
            blend={0.55}
            height={0.55}
            scale={1.15}
            glow={0.6}
            brightness={0.85}
            layers={2}
            speed={0.55}
            mouseInteraction={false}
            intro={!reduce}
            opacity={0.75}
          />
        </div>
      )}

      {/* Soft pink and navy corner glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,184,0.15),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-24 -z-10 size-96 rounded-full bg-[radial-gradient(circle,rgba(27,43,107,0.4),transparent_65%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 -left-20 -z-10 size-80 rounded-full bg-[radial-gradient(circle,rgba(255,95,162,0.10),transparent_65%)] blur-2xl"
      />

      <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {/* Eyebrow badge */}
          <Badge
            variant="outline"
            className="border-pink/25 bg-[#101F4D]/45 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-pink-soft uppercase shadow-sm backdrop-blur-md"
          >
            <Sparkles className="size-3 text-pink mr-1.5" />
            A little love letter in website form
          </Badge>

          {/* Big "Our Story" title */}
          <div
            role="heading"
            aria-level="1"
            className="mt-6 font-display text-[3.6rem] leading-[1.1] sm:text-6xl lg:text-[5.4rem]"
          >
            <BlurText
              text="Our Story"
              delay={110}
              animateBy="words"
              direction="top"
              className="justify-center font-display text-pink-soft text-glow lg:justify-start"
              color="#FFC2D9"
            />
          </div>

          {/* Softer Subtitle: "Our Memories" with pink gradient & small sparkle/heart */}
          <div className="mt-3 flex items-center justify-center gap-2.5 lg:justify-start">
            <p className="font-display text-2xl text-gradient sm:text-3xl">
              Our Memories
            </p>
            <Heart className="size-5 fill-pink text-pink animate-pulse" aria-hidden="true" />
          </div>

          {/* Tagline */}
          <div className="mt-6 text-base sm:text-lg">
            <ShinyText
              text={site.tagline}
              speed={4.5}
              color="#FFC2D9"
              shineColor="#ffffff"
              className="text-shadow-soft"
            />
          </div>

          {/* Hero note description */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            {site.heroNote}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:items-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-pink via-[#ff75ab] to-[#ff5fa2] px-7 text-sm font-bold text-ink shadow-[0_18px_42px_-18px_rgba(255,95,162,0.85)] transition-all hover:scale-[1.03] hover:shadow-[0_22px_48px_-16px_rgba(255,95,162,1)]"
            >
              <a href="#memories">
                <Heart className="size-4 fill-current" />
                Start Our Journey
              </a>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-full border border-pink/25 bg-[#101F4D]/50 px-6 text-sm font-semibold text-pink-soft backdrop-blur-sm transition-all hover:bg-[#1B2B6B]/60 hover:text-white"
            >
              <a href="#letter">
                <ShinyText text="Read my letter" color="#FFC2D9" shineColor="#ffffff" />
              </a>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 hidden justify-center lg:flex lg:justify-start">
            <a
              href="#memories"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-white/40 uppercase transition-colors hover:text-pink-soft"
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-pink/20 bg-[#101F4D]/40">
                <ArrowDown className="size-3.5 text-pink-soft animate-[bob_2.8s_ease-in-out_infinite]" />
              </span>
              Scroll gently
            </a>
          </div>
        </div>

        {/* Photo Stack previews on the right */}
        <div className="relative mx-auto flex w-full max-w-md flex-col items-center lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(255,143,184,0.2),transparent_68%)] blur-2xl"
          />
          <div className="h-[360px] w-[280px] sm:h-[440px] sm:w-[340px] lg:h-[500px] lg:w-[390px]">
            <Stack
              cards={cards}
              layout="fan"
              visible={3}
              spread={0.9}
              depth={0.45}
              tilt={12}
              radius={22}
              frame={7}
              frameColor="#FFE4EF"
              shadow
              threshold={64}
              sendToBackOnClick={false}
              autoplay={false}
              className="drop-shadow-[0_36px_60px_rgba(2,5,15,0.65)]"
            />
          </div>

          <div className="glass-pill mt-6 flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/60">
            <Heart className="size-3.5 fill-pink/70 text-pink/70" aria-hidden="true" />
            Drag the photos or use the arrow keys
          </div>
        </div>
      </div>
    </section>
  );
}
