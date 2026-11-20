import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfettiProvider } from "@/context/ConfettiContext";
import { LightboxProvider } from "@/context/LightboxContext";
import { useCapabilities } from "@/hooks/useCapabilities";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import LoveLetter from "@/components/LoveLetter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingHearts from "@/components/FloatingHearts";
import ClickSpark from "@/components/reactbits/ClickSpark";
import SplashCursor from "@/components/reactbits/SplashCursor";

function App() {
  const { heavyEffects } = useCapabilities();

  return (
    <TooltipProvider delayDuration={120}>
      <ConfettiProvider>
        <LightboxProvider>
          <a
            href="#memories"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-pink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
          >
            Skip to our memories
          </a>

          <FloatingHearts />

          {heavyEffects && (
            <SplashCursor
              colors={["#FF8FB8", "#1B2B6B", "#FFC2D9", "#FF5FA2"]}
              rainbow={false}
              colorSpeed={0.3}
              intensity={0.62}
              size={0.8}
              force={0.7}
              swirl={2.4}
              trail={0.72}
              momentum={0.9}
              shading={0.75}
              glow={0.12}
              quality="medium"
              clickSplash
              intro
              zIndex={2}
              className="opacity-70"
            />
          )}

          <Navbar />

          <ClickSpark
            sparkColor={["#FFC2D9", "#FF8FB8", "#FF5FA2"]}
            sparkSize={10}
            sparkRadius={30}
            sparkCount={8}
            sparkWidth={1.6}
            duration={520}
            easing="ease-out"
            shape="star"
            randomness={0.3}
            glow={0.4}
            style={{ height: "auto" }}
          >
            <main id="main" className="relative z-10">
              <Hero />
              <Timeline />
              <Gallery />
              <LoveLetter />
            </main>
            <Footer />
          </ClickSpark>

          <BackToTop />
        </LightboxProvider>
      </ConfettiProvider>
    </TooltipProvider>
  );
}

export default App;
