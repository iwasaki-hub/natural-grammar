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

// Foundation 2 uses sample data; Day 4 completion is held in memory only.
const lesson = {
  day: 4,
  completedDays: 3,
  totalDays: 30,
  minutes: 10,
  title: "一般動詞の現在形",
  description: "毎日の習慣を英語で表現してみよう",
  achievement: "短い英文で、自分のことを伝える練習をしています。",
};

export default function HomeScreen() {
  const { day4Completed } = useLessonProgress();
  const completedDays = lesson.completedDays + (day4Completed ? 1 : 0);
  const progress = (completedDays / lesson.totalDays) * 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>NATURAL GRAMMAR</Text>
          <Text style={styles.title} accessibilityRole="header">
            今日の一歩
          </Text>
          <Text style={styles.subtitle}>
            今日も少しずつ、英語を身につけよう。
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.cardHeadingRow}>
            <Text style={styles.sectionLabel}>30日間のコース</Text>
            <Text style={styles.progressCount}>
              {completedDays} / {lesson.totalDays} 日
            </Text>
          </View>
          <View
            style={styles.progressTrack}
            accessibilityRole="progressbar"
            accessibilityLabel="コースの進捗"
            accessibilityValue={{
              min: 0,
              max: lesson.totalDays,
              now: completedDays,
            }}
          >
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.supportingText}>
            ここまでの一歩も、ちゃんと力になっています。
          </Text>
        </View>

        <View style={styles.lessonCard}>
          <View style={styles.lessonTopRow}>
            <Text style={styles.dayPill}>DAY {lesson.day}</Text>
            <Text style={styles.duration}>約{lesson.minutes}分</Text>
          </View>
          <Text style={styles.lessonLabel}>今日のレッスン</Text>
          <Text style={styles.lessonTitle} accessibilityRole="header">
            {lesson.title}
          </Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          <View style={styles.examplePanel}>
            <Text style={styles.exampleEnglish}>
              I drink coffee every morning.
            </Text>
            <Text style={styles.exampleJapanese}>
              私は毎朝コーヒーを飲みます。
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.lessonAction, pressed && styles.lessonActionPressed]}
            accessibilityRole="button"
            accessibilityLabel="Day 4のレッスン解説を開く"
            onPress={() => router.push("/lesson")}
          >
            <Text style={styles.disabledActionText}>レッスンを始める</Text>
          </Pressable>
          <Text style={styles.comingSoon}>解説・練習・まとめに進めます。進捗はこの起動中だけ反映されます。</Text>
        </View>

        <View style={styles.achievementCard}>
          <Text style={styles.achievementIcon} accessibilityElementsHidden>
            ✨
          </Text>
          <View style={styles.achievementBody}>
            <Text style={styles.sectionLabel}>できるようになったこと</Text>
            <Text style={styles.achievementText}>{day4Completed ? "毎日の習慣を英語で言える" : lesson.achievement}</Text>
            <Text style={styles.sampleLabel}>{day4Completed ? "Day 4 完了（この起動中のみ）" : "サンプル表示"}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 36,
    gap: 20,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  header: { gap: 8, paddingVertical: 10 },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  title: { color: colors.ink, fontSize: 34, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    gap: 16,
  },
  cardHeadingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  sectionLabel: { color: colors.ink, fontSize: 16, fontWeight: "700" },
  progressCount: { color: colors.primary, fontSize: 16, fontWeight: "800" },
  progressTrack: {
    height: 12,
    backgroundColor: colors.track,
    borderRadius: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  supportingText: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  lessonCard: {
    backgroundColor: colors.peach,
    borderRadius: 28,
    padding: 22,
    gap: 14,
  },
  lessonTopRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  dayPill: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: colors.primary,
    fontWeight: "800",
    fontSize: 13,
    overflow: "hidden",
  },
  duration: { color: colors.ink, fontSize: 14, fontWeight: "600" },
  lessonLabel: { color: colors.muted, fontSize: 14, fontWeight: "700" },
  lessonTitle: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 37,
  },
  lessonDescription: { color: colors.ink, fontSize: 15, lineHeight: 24 },
  examplePanel: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 17,
    gap: 8,
  },
  exampleEnglish: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 26,
  },
  exampleJapanese: { color: colors.muted, fontSize: 13, lineHeight: 21 },
  lessonAction: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lessonActionPressed: { opacity: 0.8 },
  disabledActionText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  comingSoon: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },
  achievementCard: {
    backgroundColor: colors.paleGreen,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    gap: 12,
  },
  achievementIcon: { fontSize: 24 },
  achievementBody: { flex: 1, gap: 9 },
  achievementText: { color: colors.ink, fontSize: 14, lineHeight: 23 },
  sampleLabel: { color: colors.muted, fontSize: 12 },
});
