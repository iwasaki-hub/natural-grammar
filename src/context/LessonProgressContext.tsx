import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type LessonProgress = {
  day4Completed: boolean;
  completeDay4: () => void;
};

const LessonProgressContext = createContext<LessonProgress | null>(null);

export function LessonProgressProvider({ children }: { children: ReactNode }) {
  const [day4Completed, setDay4Completed] = useState(false);
  const value = useMemo(
    () => ({ day4Completed, completeDay4: () => setDay4Completed(true) }),
    [day4Completed],
  );
  return <LessonProgressContext.Provider value={value}>{children}</LessonProgressContext.Provider>;
}

export function useLessonProgress() {
  const value = useContext(LessonProgressContext);
  if (!value) throw new Error("useLessonProgress must be used within LessonProgressProvider");
  return value;
}
