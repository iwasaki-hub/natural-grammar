import { Stack } from "expo-router";
import { DesignProvider } from "../context/DesignContext";
import { LessonProgressProvider } from "../context/LessonProgressContext";

export default function RootLayout() {
  return (
    <DesignProvider>
      <LessonProgressProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LessonProgressProvider>
    </DesignProvider>
  );
}
