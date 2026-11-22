import { Stack } from "expo-router";
import { LessonProgressProvider } from "../context/LessonProgressContext";

export default function RootLayout() {
  return <LessonProgressProvider><Stack screenOptions={{ headerShown: false }} /></LessonProgressProvider>;
}
