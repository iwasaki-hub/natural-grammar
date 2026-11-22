import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  ink: "#243B38",
  muted: "#61736D",
  primary: "#237A6D",
  paleGreen: "#E4F3E9",
  peach: "#FFE7D4",
} as const;

// Foundation 2: sample Day 4 lesson, without completion or persistence.
export default function LessonScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="ホームに戻る"
        >
          <Text style={styles.backText}>← ホームに戻る</Text>
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DAY 4 / 30 · 解説</Text>
          <Text style={styles.title} accessibilityRole="header">一般動詞の現在形</Text>
          <Text style={styles.subtitle}>毎日の習慣を英語で表現してみよう。</Text>
        </View>
        <View style={styles.stageCard}>
          <Text style={styles.stageLabel}>今日の学習ステップ</Text>
          <Text style={styles.stageText}>① 解説（いまここ）　→　② 練習　→　③ まとめ</Text>
          <Text style={styles.smallText}>練習の3問に正解したら、まとめで学びを振り返れます。</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle} accessibilityRole="header">まずは、この英文から</Text>
          <Text style={styles.english}>I drink coffee every morning.</Text>
          <Text style={styles.translation}>私は毎朝コーヒーを飲みます。</Text>
          <View style={styles.rulePanel}>
            <Text style={styles.ruleTitle}>今日のポイント</Text>
            <Text style={styles.body}>「毎朝」「毎日」など、いつもの習慣を話すときは現在形を使います。</Text>
            <Text style={styles.body}>主語が I / you / we / they のとき、一般動詞は通常そのままの形です。</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle} accessibilityRole="header">主語によって形が変わる</Text>
          <Text style={styles.english}>I drink coffee.</Text>
          <Text style={styles.translation}>私はコーヒーを飲みます。</Text>
          <View style={styles.divider} />
          <Text style={styles.english}>She drinks coffee.</Text>
          <Text style={styles.translation}>彼女はコーヒーを飲みます。</Text>
          <Text style={styles.body}>he / she / it などの三人称単数が主語のとき、一般動詞には通常 -s や -es を付けます。</Text>
        </View>
        <View style={styles.note}>
          <Text style={styles.sectionTitle}>覚えておこう ✨</Text>
          <Text style={styles.body}>I drink / She drinks。まずは主語と動詞の組み合わせを声に出して読んでみましょう。</Text>
        </View>
        <Pressable
          onPress={() => router.push("/practice")}
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          accessibilityLabel="英文法の練習問題へ進む"
        >
          <Text style={styles.actionText}>練習問題へ進む</Text>
        </Pressable>
        <Text style={styles.smallText}>※ サンプル教材です。進捗はアプリ起動中のみ反映されます。</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 560, alignSelf: "center", paddingHorizontal: 22, paddingTop: 18, paddingBottom: 40, gap: 18 },
  backButton: { minHeight: 48, justifyContent: "center", alignSelf: "flex-start", paddingRight: 16 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: "700" },
  header: { gap: 10, paddingVertical: 8 },
  eyebrow: { color: colors.primary, fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  title: { color: colors.ink, fontSize: 30, lineHeight: 40, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  stageCard: { backgroundColor: colors.paleGreen, borderRadius: 20, padding: 18, gap: 10 },
  stageLabel: { color: colors.primary, fontSize: 13, fontWeight: "800" },
  stageText: { color: colors.ink, fontSize: 14, lineHeight: 24, fontWeight: "700" },
  card: { backgroundColor: colors.surface, borderRadius: 24, padding: 22, gap: 14 },
  sectionTitle: { color: colors.ink, fontSize: 19, lineHeight: 28, fontWeight: "800" },
  english: { color: colors.ink, fontSize: 21, lineHeight: 31, fontWeight: "800" },
  translation: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  rulePanel: { backgroundColor: colors.peach, borderRadius: 18, padding: 18, gap: 10, marginTop: 4 },
  ruleTitle: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  body: { color: colors.ink, fontSize: 15, lineHeight: 26 },
  divider: { height: 1, backgroundColor: "#E8ECE7" },
  note: { backgroundColor: colors.paleGreen, borderRadius: 20, padding: 20, gap: 10 },
  action: { backgroundColor: colors.primary, borderRadius: 18, minHeight: 52, paddingHorizontal: 16, paddingVertical: 12, alignItems: "center", justifyContent: "center" },
  actionText: { color: colors.surface, fontSize: 16, fontWeight: "800" },
  smallText: { color: colors.muted, fontSize: 12, lineHeight: 20, textAlign: "center" },
});
