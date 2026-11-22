import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign } from "../context/DesignContext";

export default function Day1Lesson() {
  const { colors } = useDesign();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.replace("/course")} style={styles.back}><Text style={{ color: colors.primary }}>← 一覧に戻る</Text></Pressable>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>DAY 1 / 30 · 解説</Text>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>英語の文の基本：主語と動詞</Text>
        <Text style={[styles.body, { color: colors.muted }]}>まずは「だれが」「どうする」を英語で伝えましょう。</Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.heading, { color: colors.ink }]}>英語は主語 → 動詞が基本</Text>
          <Text style={[styles.english, { color: colors.primary }]}>I work.</Text>
          <Text style={[styles.body, { color: colors.ink }]}>私は働きます。</Text>
          <Text style={[styles.body, { color: colors.ink }]}>I が主語（だれが）、work が動詞（どうする）です。英語では、ふつう主語を先に置きます。</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.heading, { color: colors.ink }]}>主語が変わると意味も変わる</Text>
          <Text style={[styles.english, { color: colors.primary }]}>You work.</Text>
          <Text style={[styles.body, { color: colors.ink }]}>あなたは働きます。</Text>
          <Text style={[styles.english, { color: colors.primary }]}>We study.</Text>
          <Text style={[styles.body, { color: colors.ink }]}>私たちは勉強します。</Text>
          <Text style={[styles.body, { color: colors.muted }]}>今回は I / You / We と、動詞 work / study の並びを練習します。</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push("/day1-practice")} style={[styles.action, { backgroundColor: colors.primary }]}><Text style={styles.actionText}>3問の練習へ進む</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 560, alignSelf: "center", padding: 22, paddingBottom: 44, gap: 18 },
  back: { minHeight: 44, justifyContent: "center" },
  eyebrow: { fontSize: 13, fontWeight: "800" },
  title: { fontSize: 29, lineHeight: 40, fontWeight: "800" },
  heading: { fontSize: 19, lineHeight: 28, fontWeight: "800" },
  english: { fontSize: 23, fontWeight: "800" },
  body: { fontSize: 15, lineHeight: 26 },
  card: { borderRadius: 22, padding: 22, gap: 12 },
  action: { borderRadius: 18, minHeight: 56, justifyContent: "center", alignItems: "center" },
  actionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
