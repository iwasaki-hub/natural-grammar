import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLessonProgress } from "../../context/LessonProgressContext";

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  ink: "#243B38",
  muted: "#61736D",
  primary: "#237A6D",
  paleGreen: "#E4F3E9",
  peach: "#FFE7D4",
  track: "#E8ECE7",
} as const;

export default function SummaryScreen() {
  const { practicePassed, day4Completed, completeDay4, completedDays } = useLessonProgress();

  function finish() {
    if (!practicePassed) return;
    completeDay4();
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>DAY 4 / 30 · まとめ</Text>
        <View style={styles.stageCard}>
          <Text style={styles.stageLabel}>今日の学習ステップ</Text>
          <Text style={styles.stageText}>① 解説　→　② 練習　→　③ まとめ（いまここ）</Text>
        </View>
        {!practicePassed ? (
          <View style={styles.card}>
            <Text style={styles.title} accessibilityRole="header">まずは練習を終えましょう</Text>
            <Text style={styles.body}>3問に正解すると、今日の学びを振り返ってレッスンを完了できます。</Text>
            <Pressable
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              accessibilityRole="button"
              onPress={() => router.replace("/practice")}
            >
              <Text style={styles.actionText}>練習問題へ進む</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.hero}>
              <Text style={styles.celebration} accessibilityElementsHidden>✨</Text>
              <Text style={styles.title} accessibilityRole="header">{day4Completed ? "今日の一歩、完了！" : "今日も一歩、前進！"}</Text>
              <Text style={styles.body}>3問の練習、おつかれさまでした。今日学んだことを振り返りましょう。</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle} accessibilityRole="header">今日できるようになったこと</Text>
              <Text style={styles.achievement}>毎日の習慣を英語で言える</Text>
              <Text style={styles.body}>一般動詞の現在形では、主語に合わせて動詞の形を選びます。</Text>
              <View style={styles.example}>
                <Text style={styles.english}>I drink coffee.</Text>
                <Text style={styles.translation}>私はコーヒーを飲みます。</Text>
                <View style={styles.divider} />
                <Text style={styles.english}>She drinks coffee.</Text>
                <Text style={styles.translation}>彼女はコーヒーを飲みます。</Text>
              </View>
              <Text style={styles.body}>I / you / we / they は通常動詞の原形。he / she / it は通常 -s や -es を付けます。</Text>
            </View>
            <View style={styles.progressCard}>
              <Text style={styles.sectionTitle}>30日間のコース</Text>
              <Text style={styles.progressCount}>{completedDays.length} / 30 日</Text>
              <View style={styles.track} accessibilityRole="progressbar" accessibilityLabel="コースの進捗" accessibilityValue={{ min: 0, max: 30, now: completedDays.length }}>
                <View style={[styles.fill, { width: `${(completedDays.length / 30) * 100}%` }]} />
              </View>
              <Text style={styles.smallText}>レッスン完了ボタンで進捗を更新し、このブラウザに保存します。</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={day4Completed ? "ホームに戻る" : "Day 4のレッスンを完了する"}
              onPress={finish}
            >
              <Text style={styles.actionText}>{day4Completed ? "ホームに戻る" : "レッスンを完了する"}</Text>
            </Pressable>
            <Text style={styles.smallText}>※ Day 4の完了状態はこのブラウザに保存します。別の端末への同期やサーバー保存はありません。</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 560, alignSelf: "center", paddingHorizontal: 22, paddingTop: 24, paddingBottom: 40, gap: 18 },
  eyebrow: { color: colors.primary, fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  stageCard: { backgroundColor: colors.paleGreen, borderRadius: 20, padding: 18, gap: 10 },
  stageLabel: { color: colors.primary, fontSize: 13, fontWeight: "800" },
  stageText: { color: colors.ink, fontSize: 14, lineHeight: 24, fontWeight: "700" },
  hero: { backgroundColor: colors.peach, borderRadius: 28, padding: 24, gap: 12, alignItems: "center" },
  celebration: { fontSize: 42 },
  title: { color: colors.ink, fontSize: 28, lineHeight: 39, fontWeight: "800", textAlign: "center" },
  body: { color: colors.ink, fontSize: 15, lineHeight: 25 },
  card: { backgroundColor: colors.surface, borderRadius: 24, padding: 22, gap: 15 },
  sectionTitle: { color: colors.ink, fontSize: 18, lineHeight: 27, fontWeight: "800" },
  achievement: { color: colors.primary, fontSize: 22, lineHeight: 32, fontWeight: "800" },
  example: { backgroundColor: colors.paleGreen, borderRadius: 18, padding: 17, gap: 8 },
  english: { color: colors.ink, fontSize: 18, fontWeight: "800", lineHeight: 27 },
  translation: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  divider: { height: 1, backgroundColor: colors.track, marginVertical: 4 },
  progressCard: { backgroundColor: colors.surface, borderRadius: 24, padding: 22, gap: 14 },
  progressCount: { color: colors.primary, fontSize: 20, fontWeight: "800" },
  track: { height: 12, backgroundColor: colors.track, borderRadius: 20, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 20, backgroundColor: colors.primary },
  action: { backgroundColor: colors.primary, borderRadius: 18, minHeight: 56, padding: 14, alignItems: "center", justifyContent: "center" },
  actionText: { color: colors.surface, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.8 },
  smallText: { color: colors.muted, fontSize: 12, lineHeight: 20 },
});
