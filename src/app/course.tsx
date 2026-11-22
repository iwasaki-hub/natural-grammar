import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign, palettes } from "../context/DesignContext";
import { useLessonProgress } from "../context/LessonProgressContext";
import { getGrammarLesson } from "../data/grammarLessons";

const days = Array.from({ length: 30 }, (_, index) => index + 1);

export default function CourseScreen() {
  const { colors, design } = useDesign();
  const { isDayCompleted, progressLoaded } = useLessonProgress();
  const styles = useMemo(() => createStyles(colors, design), [colors, design]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← 戻る</Text>
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>NATURAL GRAMMAR</Text>
          <Text accessibilityRole="header" style={styles.title}>30日間のレッスン</Text>
          <Text style={styles.description}>一歩ずつ、英語の基礎を積み重ねよう。</Text>
        </View>
        <View style={styles.legend}>
          <Text style={styles.hint}>✓ 完了済み</Text>
          <Text style={styles.hint}>● 学習できる</Text>
          <Text style={styles.hint}>○ 準備中</Text>
        </View>
        {days.map((day) => {
          const available = true;
          const completed = progressLoaded && isDayCompleted(day);
          const label = day === 1 ? "主語と動詞の基本" : day === 4 ? "一般動詞の現在形" : getGrammarLesson(day)?.title ?? "レッスン準備中";
          return (
            <Pressable
              key={day}
              accessibilityRole="button"
              accessibilityLabel={`Day ${day}、${label}、${completed ? "完了済み" : available ? "学習できる" : "準備中"}`}
              accessibilityState={{ disabled: !available }}
              disabled={!available}
              onPress={() => day === 1 ? router.push("/day1-lesson") : day === 4 ? router.push("/lesson") : router.push({ pathname: "/grammar", params: { day: String(day), stage: "lesson" } })}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={[styles.dayIcon, completed && styles.completedIcon, available && !completed && styles.availableIcon]}>
                <Text style={[styles.dayNumber, completed && styles.activeNumber, available && !completed && styles.availableNumber]}>{day}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.dayLabel}>DAY {day}</Text>
                <Text style={styles.lessonTitle}>{label}</Text>
                <Text style={styles.status}>{completed ? "✓ 完了済み・もう一度学ぶ" : available ? "● 学習できる" : "○ 準備中"}</Text>
              </View>
              {available && <Text style={styles.chevron}>›</Text>}
            </Pressable>
          );
        })}
        <Text style={styles.footnote}>完了表示は、このブラウザに実際に保存された記録に基づきます。</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: (typeof palettes)["pop"] | (typeof palettes)["simple"], design: "pop" | "simple") {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    content: { width: "100%", maxWidth: 560, alignSelf: "center", paddingHorizontal: 22, paddingTop: 18, paddingBottom: 40, gap: 14 },
    back: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" },
    backText: { color: colors.primary, fontSize: 15, fontWeight: "700" },
    header: { gap: 9, paddingVertical: 8 },
    eyebrow: { color: colors.primary, fontSize: 12, fontWeight: "800", letterSpacing: 1.5 },
    title: { color: colors.ink, fontSize: 30, lineHeight: 40, fontWeight: "800" },
    description: { color: colors.muted, fontSize: 15, lineHeight: 24 },
    legend: { flexDirection: "row", flexWrap: "wrap", gap: 14, paddingVertical: 10 },
    hint: { color: colors.muted, fontSize: 12, fontWeight: "600" },
    card: { backgroundColor: colors.surface, borderRadius: design === "simple" ? 16 : 22, padding: 16, flexDirection: "row", alignItems: "center", gap: 14, minHeight: 86, borderWidth: 1, borderColor: colors.border },
    pressed: { opacity: 0.75 },
    dayIcon: { width: 46, height: 46, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: colors.track },
    completedIcon: { backgroundColor: colors.paleGreen },
    availableIcon: { backgroundColor: colors.primary },
    dayNumber: { color: colors.muted, fontSize: 17, fontWeight: "800" },
    activeNumber: { color: colors.ink },
    availableNumber: { color: colors.surface },
    cardBody: { flex: 1, gap: 4 },
    dayLabel: { color: colors.primary, fontSize: 11, fontWeight: "800", letterSpacing: 1 },
    lessonTitle: { color: colors.ink, fontSize: 16, fontWeight: "800" },
    status: { color: colors.muted, fontSize: 12 },
    chevron: { color: colors.primary, fontSize: 28 },
    footnote: { color: colors.muted, fontSize: 12, lineHeight: 20, paddingVertical: 10 },
  });
}
