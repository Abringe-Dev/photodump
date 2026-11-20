import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MusicToggle from "@/components/MusicToggle";
import { useHeartConfetti } from "@/context/ConfettiContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#memories", label: "Memories" },
  { href: "#gallery", label: "Gallery" },
  { href: "#letter", label: "Message" },
];

const sectionIds = links.map((link) => link.href.slice(1));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [secret, setSecret] = useState(false);
  const clicks = useRef([]);
  const secretTimer = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const active = useScrollSpy(sectionIds);
  const { trigger } = useHeartConfetti();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (secretTimer.current) window.clearTimeout(secretTimer.current);
    },
    [],
  );

  const handleLogoClick = (event) => {
    const now = Date.now();
    clicks.current = clicks.current
      .filter((time) => now - time < 2400)
      .concat(now);

    if (clicks.current.length < 5) return;

    clicks.current = [];
    const rect = event.currentTarget.getBoundingClientRect();
    trigger(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setSecret(true);

    if (secretTimer.current) window.clearTimeout(secretTimer.current);
    secretTimer.current = window.setTimeout(() => setSecret(false), 5200);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex h-16 w-full max-w-6xl items-center gap-3 rounded-full px-3 transition-all duration-500 sm:px-4",
            scrolled || open
              ? "glass-pill shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            onClick={handleLogoClick}
            className="group flex min-w-0 items-center gap-2.5 rounded-full py-2 pr-2 pl-1 focus-visible:ring-2 focus-visible:ring-pink-soft"
            aria-label="Our Story — back to top"
          >
            <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-[#FF5FA2] text-ink shadow-[0_0_28px_-8px_rgba(255,143,184,0.9)]">
              <Heart className="size-4 fill-current transition-transform duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 animate-ping rounded-full bg-pink/25 [animation-duration:3s]" />
            </span>
            <span className="truncate font-display text-lg leading-none text-pink-soft sm:text-xl">
              Our Story
            </span>
          </a>

          <ul className="ml-auto hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex h-10 items-center rounded-full px-3.5 text-sm font-semibold text-white/70 transition-colors hover:text-white",
                      isActive && "text-white font-bold",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-pink to-transparent transition-transform duration-300",
                        isActive && "scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <MusicToggle />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen((current) => !current)}
              className="size-11 rounded-full border border-pink/20 bg-white/5 text-white hover:bg-white/12 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-[#050B1F]/65 backdrop-blur-sm md:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="glass-strong fixed inset-x-3 top-22 z-40 overflow-hidden rounded-[1.75rem] p-2 md:hidden"
            >
              <ul className="grid gap-1">
                {links.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = active === id;

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-semibold text-white/75 transition-colors hover:bg-white/8 hover:text-white",
                          isActive && "bg-pink/15 text-pink-soft font-bold",
                        )}
                      >
                        {link.label}
                        {isActive && <Heart className="size-4 fill-current text-pink" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="px-4 pt-2 pb-3 text-xs text-white/45">
                Made with 💗 just for you.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {secret && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="glass-strong fixed bottom-5 left-1/2 z-[90] flex w-[min(92vw,24rem)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-pink/30 px-4 py-3 text-sm text-pink-soft shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)]"
            role="status"
          >
            <Sparkles className="size-5 shrink-0 text-pink" aria-hidden="true" />
            <span>
              You found the secret. I love you more than all these photos.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
