import SectionHeading from "@/components/SectionHeading";
import LetterEnvelope from "@/components/LetterEnvelope";
import { letters } from "@/data/memories";

export default function LoveLetter() {
  return (
    <section id="letter" className="section relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-[radial-gradient(ellipse,rgba(255,143,184,0.12),transparent_68%)] blur-2xl"
      />

      <div className="shell">
        <SectionHeading
          eyebrow="A note for you"
          title="Everything I want to say"
          subtitle="Some things are easier to write than to say out loud. Open an envelope to read what's inside."
        />

        <div className="space-y-12">
          {letters.map((letter) => (
            <LetterEnvelope key={letter.id} letter={letter} />
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-xs leading-relaxed text-white/40">
          P.S. I left this here so you can come back to it on the days you need
          a reminder.
        </p>
      </div>
    </section>
  );
}
