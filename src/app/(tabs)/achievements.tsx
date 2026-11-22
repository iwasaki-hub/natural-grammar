import { useMemo } from "react";
import { useDesign, palettes } from "../../context/DesignContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabCard, TabPage } from "../../components/TabPage";
import { useLessonProgress } from "../../context/LessonProgressContext";

export default function AchievementsScreen() {
  const { colors } = useDesign();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { day4Completed, progressLoaded } = useLessonProgress();
  const completedDays = progressLoaded && day4Completed ? 4 : 3;
  return (
    <TabPage title="成長記録" subtitle="積み重ねた一歩を、言葉にして振り返ろう。">
      <TabCard pale>
        <Text style={styles.label}>30日間のコース</Text>
        <Text style={styles.large} accessibilityRole="header">{completedDays} / 30 日</Text>
        <View style={styles.track} accessibilityRole="progressbar" accessibilityLabel="サンプルコース進捗" accessibilityValue={{ min: 0, max: 30, now: completedDays }}>
          <View style={[styles.fill, { width: `${(completedDays / 30) * 100}%` }]} />
        </View>
        <Text style={styles.note}>サンプル進捗です。Day 4完了後はこのブラウザに保存されます。</Text>
      </TabCard>
      <TabCard>
        <Text style={styles.label}>できるようになったこと</Text>
        {day4Completed ? (
          <>
            <View style={styles.row}>
              <Text style={styles.tag}>DAY 4 完了</Text>
              <Text style={styles.sparkle} accessibilityElementsHidden>✨</Text>
            </View>
            <Text style={styles.heading} accessibilityRole="header">毎日の習慣を英語で言える</Text>
            <Text style={styles.english}>I drink coffee every morning.</Text>
            <Text style={styles.note}>私は毎朝コーヒーを飲みます。</Text>
          </>
        ) : (
          <>
            <Text style={styles.heading} accessibilityRole="header">今日の一歩から始めよう</Text>
            <Text style={styles.body}>
              Day 4のレッスンを完了すると、学んだことがここに表示されます。
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Day 4のレッスンを始める"
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
              onPress={() => router.push("/lesson")}
            >
              <Text style={styles.buttonText}>レッスンを始める</Text>
            </Pressable>
          </>
        )}
      </TabCard>
      <Text style={styles.note}>
        ※ 現在はDay 4の完了のみ、このブラウザに保存されます。ほかの端末とは同期されません。
      </Text>
    </TabPage>
  );
}

function createStyles(colors: (typeof palettes)["pop"] | (typeof palettes)["simple"]) {
  return StyleSheet.create({
  label: { color: colors.primary, fontSize: 14, fontWeight: "800" },
  large: { color: colors.ink, fontSize: 32, lineHeight: 42, fontWeight: "800" },
  track: { height: 12, backgroundColor: colors.border, borderRadius: 20, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: colors.primary, borderRadius: 20 },
  note: { color: colors.muted, fontSize: 12, lineHeight: 20 },
  heading: { color: colors.ink, fontSize: 20, lineHeight: 30, fontWeight: "800" },
  body: { color: colors.ink, fontSize: 15, lineHeight: 25 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tag: { backgroundColor: colors.paleGreen, color: colors.primary, fontSize: 13, fontWeight: "800", padding: 10, borderRadius: 14, overflow: "hidden" },
  sparkle: { fontSize: 24 },
  english: { color: colors.ink, fontSize: 18, lineHeight: 28, fontWeight: "700" },
  button: { backgroundColor: colors.primary, borderRadius: 18, minHeight: 54, padding: 14, alignItems: "center", justifyContent: "center" },
  buttonText: { color: colors.surface, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.8 },
});
}
