import type { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const tabColors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  ink: "#243B38",
  muted: "#61736D",
  primary: "#237A6D",
  paleGreen: "#E4F3E9",
  peach: "#FFE7D4",
  border: "#D9E4DE",
} as const;

export function TabPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>NATURAL GRAMMAR</Text>
          <Text style={styles.title} accessibilityRole="header">{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function TabCard({
  children,
  pale = false,
}: {
  children: ReactNode;
  pale?: boolean;
}) {
  return <View style={[styles.card, pale && styles.pale]}>{children}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tabColors.background },
  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 32,
    gap: 20,
  },
  header: { gap: 9, paddingVertical: 10 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.8, color: tabColors.primary },
  title: { fontSize: 32, lineHeight: 42, fontWeight: "800", color: tabColors.ink },
  subtitle: { fontSize: 15, lineHeight: 24, color: tabColors.muted },
  card: { backgroundColor: tabColors.surface, borderRadius: 24, padding: 22, gap: 14 },
  pale: { backgroundColor: tabColors.paleGreen },
});
