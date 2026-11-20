import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const ConfettiContext = createContext(null);
const COLORS = ["#FF8FB8", "#FFC2D9", "#FF5FA2", "#FFE4EF", "#1B2B6B", "#FFFFFF"];

export function ConfettiProvider({ children }) {
  const canvasRef = useRef(null);
  const burstRef = useRef(null);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    let particles = [];
    let frame = 0;
    let running = false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawHeart = (particle) => {
      const size = particle.size;
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.scale(size, size);
      context.beginPath();
      context.moveTo(0, 0.35);
      context.bezierCurveTo(-0.55, -0.15, -0.55, -0.8, 0, -0.5);
      context.bezierCurveTo(0.55, -0.8, 0.55, -0.15, 0, 0.35);
      context.closePath();
      context.globalAlpha = Math.max(0, particle.life / particle.maxLife);
      context.fillStyle = particle.color;
      context.fill();
      context.restore();
    };

    const tick = () => {
      context.clearRect(0, 0, width, height);
      particles = particles.filter((particle) => particle.life > 0);

      particles.forEach((particle) => {
        particle.vy += 0.16;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;
        particle.life -= 1;
        drawHeart(particle);
      });

      if (particles.length) {
        frame = window.requestAnimationFrame(tick);
      } else {
        running = false;
        context.clearRect(0, 0, width, height);
      }
    };

    const burst = (x, y) => {
      if (reduce) return;
      if (!width || !height) resize();

      const originX = x ?? width / 2;
      const originY = y ?? height * 0.3;

      for (let index = 0; index < 34; index += 1) {
        const maxLife = 90 + Math.random() * 60;
        particles.push({
          x: originX + (Math.random() - 0.5) * 60,
          y: originY + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 8,
          vy: -(Math.random() * 7 + 3),
          size: 7 + Math.random() * 8,
          rotation: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.14,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: maxLife,
          maxLife,
        });
      }

      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
      }
    };

    burstRef.current = burst;
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
      burstRef.current = null;
      particles = [];
    };
  }, [reduce]);

  const trigger = useCallback((x, y) => {
    burstRef.current?.(x, y);
  }, []);

  return (
    <ConfettiContext.Provider value={{ trigger }}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80]"
      />
    </ConfettiContext.Provider>
  );
}

export function useHeartConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error("useHeartConfetti must be used within ConfettiProvider");
  }
  return context;
}
