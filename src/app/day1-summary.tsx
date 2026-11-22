import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign } from "../context/DesignContext";
import { useLessonProgress } from "../context/LessonProgressContext";

export default function Day1Summary() {
  const { colors } = useDesign();
  const { day1PracticePassed, isDayCompleted, completeDay1, progressLoaded } = useLessonProgress();
  const completed = isDayCompleted(1);
  function finish() {
    if (!day1PracticePassed || !progressLoaded) return;
    completeDay1();
    router.replace("/course");
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>DAY 1 / 30 · まとめ</Text>
        {!day1PracticePassed ? (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>まずは練習を終えましょう</Text>
            <Text style={[styles.body, { color: colors.ink }]}>3問に正解するとDay 1を完了できます。</Text>
            <Pressable accessibilityRole="button" onPress={() => router.replace("/day1-practice")} style={[styles.action, { backgroundColor: colors.primary }]}><Text style={styles.actionText}>練習問題へ</Text></Pressable>
          </View>
        ) : (
          <>
            <View style={[styles.card, { backgroundColor: colors.paleGreen }]}>
              <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>今日も一歩、前進！ ✨</Text>
              <Text style={[styles.body, { color: colors.ink }]}>英語の基本の語順「主語 → 動詞」を学びました。</Text>
            </View>
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text style={[styles.heading, { color: colors.ink }]}>今日できるようになったこと</Text>
              <Text style={[styles.english, { color: colors.primary }]}>I work.</Text>
              <Text style={[styles.body, { color: colors.ink }]}>私は働きます。</Text>
              <Text style={[styles.english, { color: colors.primary }]}>You study.</Text>
              <Text style={[styles.body, { color: colors.ink }]}>あなたは勉強します。</Text>
              <Text style={[styles.body, { color: colors.muted }]}>「だれが」「どうする」の順番を意識して英文を作りましょう。</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={completed ? "レッスン一覧に戻る" : "Day 1を完了する"} disabled={!progressLoaded} onPress={finish} style={[styles.action, { backgroundColor: colors.primary, opacity: progressLoaded ? 1 : 0.5 }]}>
              <Text style={styles.actionText}>{completed ? "レッスン一覧に戻る" : "Day 1を完了する"}</Text>
            </Pressable>
            <Text style={[styles.note, { color: colors.muted }]}>完了記録はこのブラウザに保存されます。別の端末には同期されません。</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 560, alignSelf: "center", padding: 22, paddingBottom: 44, gap: 18 },
  eyebrow: { fontSize: 13, fontWeight: "800" },
  title: { fontSize: 27, lineHeight: 38, fontWeight: "800" },
  heading: { fontSize: 19, lineHeight: 28, fontWeight: "800" },
  english: { fontSize: 22, fontWeight: "800" },
  body: { fontSize: 16, lineHeight: 26 },
  card: { borderRadius: 22, padding: 22, gap: 14 },
  action: { borderRadius: 18, minHeight: 56, justifyContent: "center", alignItems: "center", padding: 12 },
  actionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  note: { fontSize: 12, lineHeight: 20 },
});
