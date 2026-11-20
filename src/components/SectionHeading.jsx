import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}) {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-2xl sm:mb-14",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <span className="eyebrow">
        <Sparkles className="size-3.5 text-pink" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-gradient mt-5 font-display text-3xl leading-tight text-glow sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed text-white/62 sm:text-base",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
