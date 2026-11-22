import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Platform } from "react-native";

export type DesignTheme = "pop" | "simple";

export const palettes = {
  pop: {
    background: "#FFF9F1", surface: "#FFFFFF", ink: "#243B38", muted: "#61736D",
    primary: "#237A6D", paleGreen: "#E4F3E9", peach: "#FFE7D4", border: "#D9E4DE", track: "#E8ECE7",
  },
  simple: {
    background: "#F7F8F7", surface: "#FFFFFF", ink: "#263431", muted: "#61706B",
    primary: "#37665D", paleGreen: "#EDF3F0", peach: "#F0F2EF", border: "#DCE5E0", track: "#E5EBE7",
  },
} as const;

type DesignContextValue = { design: DesignTheme; setDesign: (next: DesignTheme) => void };
const DesignContext = createContext<DesignContextValue | null>(null);
const storageKey = "natural-grammar-design";

export function DesignProvider({ children }: { children: ReactNode }) {
  const [design, setDesign] = useState<DesignTheme>("pop");
  useEffect(() => {
    if (Platform.OS !== "web") return;
    let active = true;
    // Defer restoring the browser preference until after the initial render.
    // This keeps SSR hydration stable and avoids synchronous effect updates.
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored === "pop" || stored === "simple") setDesign(stored);
      } catch { /* Private browsing may block storage. */ }
    });
    return () => { active = false; };
  }, []);
  const choose = (next: DesignTheme) => {
    setDesign(next);
    if (Platform.OS === "web") {
      try { window.localStorage.setItem(storageKey, next); } catch { /* Keep in-memory choice. */ }
    }
  };
  return <DesignContext.Provider value={{ design, setDesign: choose }}>{children}</DesignContext.Provider>;
}

export function useDesign() {
  const value = useContext(DesignContext);
  if (!value) throw new Error("useDesign requires DesignProvider");
  return { ...value, colors: palettes[value.design] };
}
