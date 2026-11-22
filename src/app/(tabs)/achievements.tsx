import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabCard, TabPage, tabColors } from "../../components/TabPage";
import { useLessonProgress } from "../../context/LessonProgressContext";

export default function AchievementsScreen() {
  const { day4Completed } = useLessonProgress();
  const completedDays = day4Completed ? 4 : 3;
  return (
    <TabPage title="成長記録" subtitle="積み重ねた一歩を、言葉にして振り返ろう。">
      <TabCard pale>
        <Text style={styles.label}>30日間のコース</Text>
        <Text style={styles.large} accessibilityRole="header">{completedDays} / 30 日</Text>
        <View style={styles.track} accessibilityRole="progressbar" accessibilityLabel="サンプルコース進捗" accessibilityValue={{ min: 0, max: 30, now: completedDays }}>
          <View style={[styles.fill, { width: `${(completedDays / 30) * 100}%` }]} />
        </View>
        <Text style={styles.note}>サンプル進捗です。Day 4完了時のみ、この起動中に更新されます。</Text>
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
        ※ 過去の学習履歴はまだ保存されません。ブラウザの再読み込み・アプリ再起動でこの画面の完了状態はリセットされます。
      </Text>
    </TabPage>
  );
}

const styles = StyleSheet.create({
  label: { color: tabColors.primary, fontSize: 14, fontWeight: "800" },
  large: { color: tabColors.ink, fontSize: 32, lineHeight: 42, fontWeight: "800" },
  track: { height: 12, backgroundColor: tabColors.border, borderRadius: 20, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: tabColors.primary, borderRadius: 20 },
  note: { color: tabColors.muted, fontSize: 12, lineHeight: 20 },
  heading: { color: tabColors.ink, fontSize: 20, lineHeight: 30, fontWeight: "800" },
  body: { color: tabColors.ink, fontSize: 15, lineHeight: 25 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tag: { backgroundColor: tabColors.paleGreen, color: tabColors.primary, fontSize: 13, fontWeight: "800", padding: 10, borderRadius: 14, overflow: "hidden" },
  sparkle: { fontSize: 24 },
  english: { color: tabColors.ink, fontSize: 18, lineHeight: 28, fontWeight: "700" },
  button: { backgroundColor: tabColors.primary, borderRadius: 18, minHeight: 54, padding: 14, alignItems: "center", justifyContent: "center" },
  buttonText: { color: tabColors.surface, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.8 },
});
