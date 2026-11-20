import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Lightbox from "@/components/Lightbox";

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    photos: [],
    index: 0,
  });

  const openLightbox = useCallback((photos, index = 0) => {
    setState({ open: true, photos, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setState((current) => ({ ...current, open: false }));
  }, []);

  const setIndex = useCallback((index) => {
    setState((current) => ({ ...current, index }));
  }, []);

  const value = useMemo(() => ({ openLightbox }), [openLightbox]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox
        open={state.open}
        photos={state.photos}
        index={state.index}
        onIndexChange={setIndex}
        onClose={closeLightbox}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within LightboxProvider");
  }
  return context;
}
