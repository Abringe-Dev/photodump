import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function useCapabilities() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTouch = useMediaQuery("(pointer: coarse)");
  const reduce = useReducedMotion() ?? false;
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigator.deviceMemory ?? 8;
    setLowPower(cores <= 4 || memory <= 4);
  }, []);

  return {
    isDesktop,
    isTouch,
    reduce,
    lowPower,
    allowHover: !isTouch && !reduce,
    heavyEffects: isDesktop && !isTouch && !reduce && !lowPower,
  };
}
