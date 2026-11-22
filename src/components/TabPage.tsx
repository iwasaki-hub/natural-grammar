import { useDesign, palettes } from "../context/DesignContext";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const tabColors = palettes.pop;

export function TabPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const { colors, design } = useDesign();
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={[styles.content, design === "simple" && { gap: 16 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>NATURAL GRAMMAR</Text>
          <Text style={[styles.title, { color: colors.ink }]} accessibilityRole="header">{title}</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>{subtitle}</Text>
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
  const { colors, design } = useDesign();
  return <View style={[styles.card, pale && styles.pale, { backgroundColor: pale ? colors.paleGreen : colors.surface, borderRadius: design === "simple" ? 16 : 24, borderWidth: design === "simple" ? 1 : 0, borderColor: colors.border }]}>{children}</View>;
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
