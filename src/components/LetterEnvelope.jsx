import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Mail, MailOpen, Quote } from "lucide-react";
import FadeContent from "@/components/reactbits/FadeContent";
import TextType from "@/components/reactbits/TextType";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHeartConfetti } from "@/context/ConfettiContext";

const letterClassName =
  "font-sans text-[0.95rem] leading-[1.9] text-[#0A1534] font-medium sm:text-base";

function formatLetterDate(date) {
  if (!date) return null;
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function LetterEnvelope({ letter }) {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger } = useHeartConfetti();
  const { envelopeTitle, heading, signoff, body } = letter;
  const dateLabel = formatLetterDate(letter.date);
  // Long letters type faster so they finish in a reasonable time.
  const typingSpeed = body.length > 1200 ? 6 : 12;

  const handleOpen = (e) => {
    if (!isOpen) {
      const rect = e?.currentTarget?.getBoundingClientRect();
      if (rect) {
        trigger(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      setIsOpen(true);
    }
  };

  return (
    <FadeContent effect="focus" blur={4} duration={1} threshold={0.05}>
      <div className="relative mx-auto max-w-3xl">
        {/* Washi tapes */}
        <span
          aria-hidden="true"
          className="washi -top-2 left-1/2 h-5 w-28 -translate-x-1/2 -rotate-2"
        />
        <span
          aria-hidden="true"
          className="washi washi-lavender -top-1 right-8 h-4 w-16 rotate-6"
        />

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope view */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4 }}
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(e);
                }
              }}
              aria-label={`Click to open letter: ${envelopeTitle}`}
              className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-pink/30 bg-[linear-gradient(145deg,#101F4D_0%,#050B1F_100%)] p-8 text-center shadow-[0_35px_90px_-30px_rgba(2,5,15,0.95),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform hover:scale-[1.01] sm:p-12"
            >
              {/* Decorative envelope flap background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(255,143,184,0.22),transparent_70%)]"
              />

              {/* Stamp */}
              <div className="absolute top-6 right-6 hidden flex-col items-center rounded-lg border-2 border-dashed border-pink/40 bg-pink/10 p-2 sm:flex">
                <Heart className="size-5 fill-pink text-pink" />
                <span className="mt-1 text-[0.6rem] font-bold tracking-widest text-pink-soft uppercase">
                  Love Mail
                </span>
              </div>

              <div className="relative flex flex-col items-center">
                {/* Wax seal */}
                <div className="relative mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5FA2] via-[#FF8FB8] to-[#101F4D] text-white shadow-[0_10px_25px_-5px_rgba(255,95,162,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-110">
                  <Heart className="size-9 fill-current text-white/95" />
                  <span className="absolute inset-0 animate-ping rounded-full border border-pink/40 [animation-duration:3s]" />
                </div>

                <p className="text-[0.7rem] font-bold tracking-[0.2em] text-pink/90 uppercase">
                  {dateLabel ? `${dateLabel} · Just for you 🌸` : "Special Delivery · Just for you 🌸"}
                </p>

                <h3 className="mt-2 font-display text-3xl text-pink-soft sm:text-4xl">
                  {envelopeTitle}
                </h3>

                <p className="mt-3 max-w-md text-sm text-white/70">
                  I poured my heart into this letter. Whenever you're ready, tap to break the seal and read it.
                </p>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink via-[#ff75ab] to-[#ff5fa2] px-6 py-3 text-sm font-bold text-ink shadow-[0_12px_30px_-8px_rgba(255,95,162,0.8)] transition-all group-hover:shadow-[0_16px_36px_-6px_rgba(255,95,162,1)]">
                  <MailOpen className="size-4" />
                  Open My Letter 💕
                </div>
              </div>

              {/* Hidden full text for screen readers while closed */}
              <article aria-label={envelopeTitle} className="sr-only">
                <p>{body}</p>
              </article>
            </motion.div>
          ) : (
            /* Opened Letter Stationery */
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <article
                aria-label={envelopeTitle}
                className="relative overflow-hidden rounded-[2rem] border border-pink/30 bg-[linear-gradient(150deg,#FFFFFF_0%,#FFF5F9_45%,#FFE4EF_100%)] px-5 py-7 text-[#0A1534] shadow-[0_40px_100px_-38px_rgba(2,5,15,0.95),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-10 sm:py-10 lg:px-12 lg:py-12"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full bg-[radial-gradient(circle,rgba(255,143,184,0.18),transparent_68%)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -left-12 size-52 rounded-full bg-[radial-gradient(circle,rgba(255,95,162,0.14),transparent_68%)]"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FFE4EF] text-[#FF5FA2] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <Quote className="size-4 fill-current" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-bold tracking-[0.18em] text-[#0A1534]/70 uppercase">
                          {dateLabel ? `A letter just for you · ${dateLabel}` : "A letter just for you"}
                        </p>
                        <p className="mt-1 font-display text-2xl leading-tight text-[#0A1534] sm:text-3xl">
                          {heading}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 rounded-full border border-[#0A1534]/20 text-xs font-semibold text-[#0A1534] hover:bg-[#FFE4EF]"
                      aria-label="Re-seal letter into envelope"
                    >
                      <Mail className="mr-1 size-3.5" />
                      Re-seal
                    </Button>
                  </div>

                  <Separator className="my-5 bg-[#0A1534]/15" />

                  <div className="relative">
                    <p
                      aria-hidden="true"
                      className={`invisible whitespace-pre-wrap ${letterClassName}`}
                    >
                      {body}
                    </p>
                    <div className="absolute inset-0">
                      <TextType
                        as="div"
                        text={body}
                        typingSpeed={typingSpeed}
                        initialDelay={200}
                        startOnVisible={false}
                        loop={false}
                        showCursor
                        cursorCharacter="❤"
                        cursorColor="#FF5FA2"
                        cursorClassName="text-sm"
                        className={`${letterClassName} w-full`}
                      />
                    </div>
                  </div>

                  <Separator className="my-6 bg-[#0A1534]/15" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-xl text-[#0A1534]">{signoff}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8FB8]/40 bg-white/70 px-3 py-1 text-[0.68rem] font-semibold text-[#0A1534]">
                      <Heart className="size-3 fill-pink text-pink" aria-hidden="true" />
                      sealed with a kiss
                    </span>
                  </div>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeContent>
  );
}
