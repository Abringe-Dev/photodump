import { useRef, useState } from "react";
import { Music2, Pause, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { site } from "@/data/memories";
import { cn } from "@/lib/utils";

export default function MusicToggle({ className }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.volume = 0.3;
      setError(false);
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setError(true);
    }
  };

  const label = error
    ? "Music unavailable — add /public/music/our-song.mp3"
    : playing
      ? "Pause music"
      : "Play music";

  return (
    <>
      <audio
        ref={audioRef}
        src={site.musicSrc}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setError(true)}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={label}
            aria-pressed={playing}
            className={cn(
              "relative size-11 rounded-full border border-pink-soft/20 bg-white/5 text-pink-soft hover:bg-white/12 hover:text-white",
              playing && "border-pink/40 bg-pink/15 text-pink shadow-[0_0_24px_-8px_rgba(255,126,182,0.8)]",
              className,
            )}
          >
            {error ? (
              <VolumeX className="size-5" />
            ) : playing ? (
              <Pause className="size-5" />
            ) : (
              <Music2 className="size-5" />
            )}
            {playing && (
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-pink shadow-[0_0_10px_rgba(255,126,182,0.9)]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-64 text-center">
          {label}
        </TooltipContent>
      </Tooltip>

      <span className="sr-only" role="status" aria-live="polite">
        {error ? "The music file could not be loaded." : playing ? "Music playing." : ""}
      </span>
    </>
  );
}
