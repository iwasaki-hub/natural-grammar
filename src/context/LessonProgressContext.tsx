import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Platform } from "react-native";

const progressKey = "natural-grammar:lesson-progress:v1";

type LessonProgress = {
  day4Completed: boolean;
  practicePassed: boolean;
  progressLoaded: boolean;
  markPracticePassed: () => void;
  completeDay4: () => void;
};

const LessonProgressContext = createContext<LessonProgress | null>(null);

export function LessonProgressProvider({ children }: { children: ReactNode }) {
  const [day4Completed, setDay4Completed] = useState(false);
  const [practicePassed, setPracticePassed] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(Platform.OS !== "web");

  useEffect(() => {
    if (Platform.OS !== "web") return;
    let active = true;
    // Restore after hydration so the server and first client render agree.
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const raw = window.localStorage.getItem(progressKey);
        if (raw) {
          const saved: unknown = JSON.parse(raw);
          if (saved && typeof saved === "object" && "version" in saved && saved.version === 1 &&
              "completedDays" in saved && Array.isArray(saved.completedDays) &&
              saved.completedDays.includes(4)) {
            setDay4Completed(true);
          }
        }
      } catch {
        // Storage can be unavailable or contain invalid data; continue in memory.
      } finally {
        if (active) setProgressLoaded(true);
      }
    });
    return () => { active = false; };
  }, []);

  const value = useMemo(
    () => ({
      day4Completed,
      practicePassed,
      progressLoaded,
      markPracticePassed: () => setPracticePassed(true),
      completeDay4: () => {
        if (!practicePassed) return;
        setDay4Completed(true);
        if (Platform.OS === "web") {
          try {
            window.localStorage.setItem(progressKey, JSON.stringify({ version: 1, completedDays: [4] }));
          } catch {
            // Keep completion visible even if the browser refuses storage.
          }
        }
      },
    }),
    [day4Completed, practicePassed, progressLoaded],
  );
  return <LessonProgressContext.Provider value={value}>{children}</LessonProgressContext.Provider>;
}

export function useLessonProgress() {
  const value = useContext(LessonProgressContext);
  if (!value) throw new Error("useLessonProgress must be used within LessonProgressProvider");
  return value;
}
