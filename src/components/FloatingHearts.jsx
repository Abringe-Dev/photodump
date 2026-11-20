import { useMemo } from "react";
import { Heart } from "lucide-react";
import { useCapabilities } from "@/hooks/useCapabilities";

const colors = ["#FF8FB8", "#FFC2D9", "#FF5FA2", "#FFE4EF"];

export default function FloatingHearts() {
  const { isDesktop } = useCapabilities();
  const count = isDesktop ? 9 : 5;

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const size = 10 + ((index * 5) % 15);
        const duration = 18 + (index % 7) * 2.6;
        return {
          id: index,
          left: `${(index * 19 + 7) % 94}%`,
          size,
          color: colors[index % colors.length],
          duration,
          delay: -(index * 2.9),
          drift: `${index % 2 === 0 ? 28 : -28}px`,
          spin: `${index % 2 === 0 ? 22 : -18}deg`,
          opacity: 0.16 + (index % 4) * 0.045,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-10vh] animate-[float-up_linear_infinite] will-change-transform"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            color: heart.color,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            "--drift": heart.drift,
            "--spin": heart.spin,
            "--heart-opacity": heart.opacity,
          }}
        >
          <Heart className="size-full" fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
