import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Platform } from "react-native";

const progressKey = "natural-grammar:lesson-progress:v1";
const totalDays = 30;

type SavedProgress = { version: 1; completedDays: number[] };

function validDay(day: number): boolean {
  return Number.isInteger(day) && day >= 1 && day <= totalDays;
}

function normalizeDays(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((day): day is number => typeof day === "number" && validDay(day)))].sort((a, b) => a - b);
}

function readCompletedDays(): number[] {
  if (Platform.OS !== "web") return [];
  try {
    const raw = window.localStorage.getItem(progressKey);
    if (!raw) return [];
    const saved: unknown = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || !("version" in saved) || saved.version !== 1 ||
        !("completedDays" in saved)) return [];
    return normalizeDays(saved.completedDays);
  } catch {
    return [];
  }
}

function writeCompletedDays(days: number[]) {
  if (Platform.OS !== "web") return;
  try {
    const saved: SavedProgress = { version: 1, completedDays: normalizeDays(days) };
    window.localStorage.setItem(progressKey, JSON.stringify(saved));
  } catch {
    // Browsers can disable local storage; keep the current session functional.
  }
}

type LessonProgress = {
  completedDays: readonly number[];
  isPracticePassed: (day: number) => boolean;
  markDayPracticePassed: (day: number) => void;
  completeDay: (day: number) => void;
  isDayCompleted: (day: number) => boolean;
  day4Completed: boolean;
  practicePassed: boolean;
  day1PracticePassed: boolean;
  progressLoaded: boolean;
  markPracticePassed: () => void;
  markDay1PracticePassed: () => void;
  completeDay1: () => void;
  completeDay4: () => void;
};

const LessonProgressContext = createContext<LessonProgress | null>(null);

export function LessonProgressProvider({ children }: { children: ReactNode }) {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [passedDays, setPassedDays] = useState<number[]>([]);
  const [practicePassed, setPracticePassed] = useState(false);
  const [day1PracticePassed, setDay1PracticePassed] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(Platform.OS !== "web");

  useEffect(() => {
    if (Platform.OS !== "web") return;
    let active = true;
    // Keep server rendering and the first client render identical.
    Promise.resolve().then(() => {
      if (!active) return;
      setCompletedDays(readCompletedDays());
      setProgressLoaded(true);
    });
    return () => { active = false; };
  }, []);

  const value = useMemo(
    () => ({
      completedDays,
      isPracticePassed: (day: number) => passedDays.includes(day),
      markDayPracticePassed: (day: number) => {
        if (validDay(day) && day !== 1 && day !== 4) setPassedDays((days) => days.includes(day) ? days : [...days, day]);
      },
      completeDay: (day: number) => {
        if (!validDay(day) || day === 1 || day === 4 || !passedDays.includes(day) || !progressLoaded || completedDays.includes(day)) return;
        const next = normalizeDays([...completedDays, ...readCompletedDays(), day]);
        writeCompletedDays(next);
        setCompletedDays(next);
      },
      isDayCompleted: (day: number) => validDay(day) && completedDays.includes(day),
      day4Completed: completedDays.includes(4),
      practicePassed,
      day1PracticePassed,
      progressLoaded,
      markDay1PracticePassed: () => setDay1PracticePassed(true),
      completeDay1: () => {
        if (!day1PracticePassed || !progressLoaded || completedDays.includes(1)) return;
        const next = normalizeDays([...completedDays, ...readCompletedDays(), 1]);
        writeCompletedDays(next);
        setCompletedDays(next);
      },
      markPracticePassed: () => setPracticePassed(true),
      completeDay4: () => {
        if (!practicePassed || !progressLoaded) return;
        if (completedDays.includes(4)) return;
        const next = normalizeDays([...completedDays, ...readCompletedDays(), 4]);
        writeCompletedDays(next);
        setCompletedDays(next);
      },
    }),
    [completedDays, passedDays, practicePassed, day1PracticePassed, progressLoaded],
  );
  return <LessonProgressContext.Provider value={value}>{children}</LessonProgressContext.Provider>;
}

export function useLessonProgress() {
  const value = useContext(LessonProgressContext);
  if (!value) throw new Error("useLessonProgress must be used within LessonProgressProvider");
  return value;
}
