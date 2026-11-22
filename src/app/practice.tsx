import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLessonProgress } from "../context/LessonProgressContext";

type Question = {
  sentence: string;
  translation: string;
  choices: readonly string[];
  answer: string;
  hint: string;
  explanation: string;
};

const questions: readonly Question[] = [
  {
    sentence: "I ___ coffee every morning.",
    translation: "私は毎朝コーヒーを飲みます。",
    choices: ["drink", "drinks", "drinking"],
    answer: "drink",
    hint: "主語の I に注目してみましょう。",
    explanation: "I が主語の現在形では、一般動詞は原形の drink を使います。",
  },
  {
    sentence: "She ___ English every day.",
    translation: "彼女は毎日英語を勉強します。",
    choices: ["study", "studies", "studying"],
    answer: "studies",
    hint: "主語が she のとき、動詞の形はどう変わるでしょう？",
    explanation: "she は三人称単数なので、study の y を i に変えて -es を付け、studies にします。",
  },
  {
    sentence: "They ___ soccer on Sundays.",
    translation: "彼らは日曜日にサッカーをします。",
    choices: ["plays", "playing", "play"],
    answer: "play",
    hint: "主語の they は三人称単数でしょうか？",
    explanation: "they が主語の現在形では、動詞は原形の play を使います。",
  },
];

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  ink: "#243B38",
  muted: "#61736D",
  primary: "#237A6D",
  paleGreen: "#E4F3E9",
  peach: "#FFE7D4",
  border: "#D9E4DE",
  warning: "#A34C36",
} as const;

export default function PracticeScreen() {
  const { markPracticePassed } = useLessonProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [mistake, setMistake] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const correct = selected === question.answer;
  const canContinue = correct;

  function choose(choice: string) {
    if (correct) return;
    setSelected(choice);
    if (choice !== question.answer) setMistake(true);
  }

  function next() {
    if (!canContinue) return;
    if (index === questions.length - 1) {
      markPracticePassed();
      setFinished(true);
    } else {
      setIndex((current) => current + 1);
      setSelected(null);
      setMistake(false);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setMistake(false);
    setFinished(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="レッスン解説に戻る"
          onPress={() => router.replace("/lesson")}
        >
          <Text style={styles.backText}>← 解説に戻る</Text>
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DAY 4 / 30 · 練習</Text>
          <Text style={styles.title} accessibilityRole="header">一般動詞の現在形</Text>
          <Text style={styles.subtitle}>一問ずつ、ゆっくり確かめていきましょう。</Text>
        </View>
        <View style={styles.stageCard}>
          <Text style={styles.stageLabel}>今日の学習ステップ</Text>
          <Text style={styles.stageText}>① 解説　→　② 練習（いまここ）　→　③ まとめ</Text>
          <Text style={styles.smallText}>3問正解したら、まとめに進めます。</Text>
        </View>
        {finished ? (
          <View style={styles.card}>
            <Text style={styles.title} accessibilityRole="header">3問すべて正解！ ✨</Text>
            <Text style={styles.body}>I / she / they に合わせて動詞の形を選べました。</Text>
            <Text style={styles.body}>続いて今日の学びを振り返り、レッスンを完了しましょう。</Text>
            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={() => router.replace("/summary")}
              accessibilityRole="button"
            >
              <Text style={styles.primaryText}>今日のまとめへ進む</Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={restart}
              accessibilityRole="button"
            >
              <Text style={styles.secondaryText}>もう一度練習する</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View style={styles.questionHeader}>
              <Text style={styles.counter}>問題 {index + 1} / {questions.length}</Text>
              <Text style={styles.smallText}>正解すると次へ進めます</Text>
            </View>
            <View style={styles.progressTrack} accessibilityRole="progressbar" accessibilityLabel="練習問題の進捗" accessibilityValue={{ min: 0, max: questions.length, now: index + (correct ? 1 : 0) }}>
              <View style={[styles.progressFill, { width: `${((index + (correct ? 1 : 0)) / questions.length) * 100}%` }]} />
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionTitle} accessibilityRole="header">空欄に入る言葉は？</Text>
              <Text style={styles.english}>{question.sentence}</Text>
              <Text style={styles.translation}>{question.translation}</Text>
              <View style={styles.options}>
                {question.choices.map((choice) => (
                  <Pressable
                    key={choice}
                    style={({ pressed }) => [
                      styles.option,
                      selected === choice && (correct ? styles.optionCorrect : styles.optionWrong),
                      pressed && !correct && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`選択肢 ${choice}`}
                    accessibilityState={{ selected: selected === choice, disabled: correct }}
                    disabled={correct}
                    onPress={() => choose(choice)}
                  >
                    <Text style={styles.optionText}>{choice}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            {selected !== null && (
              <View
                style={[styles.feedback, correct ? styles.feedbackCorrect : styles.feedbackWrong]}
                accessibilityLiveRegion="polite"
              >
                <Text style={styles.feedbackTitle}>{correct ? "正解です！ ✨" : "もう一度考えてみましょう"}</Text>
                <Text style={styles.body}>{correct ? question.explanation : question.hint}</Text>
                {!correct && mistake && (
                  <Text style={styles.smallText}>同じ問題で、別の選択肢を選んで再挑戦できます。</Text>
                )}
              </View>
            )}
            {canContinue && (
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                onPress={next}
                accessibilityRole="button"
              >
                <Text style={styles.primaryText}>{index === questions.length - 1 ? "練習結果を見る" : "次の問題へ"}</Text>
              </Pressable>
            )}
            <Text style={styles.smallText}>※ サンプル問題です。学習状態はこの起動中だけ保持されます。</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 560, alignSelf: "center", paddingHorizontal: 22, paddingTop: 18, paddingBottom: 40, gap: 18 },
  backButton: { minHeight: 48, justifyContent: "center", alignSelf: "flex-start", paddingRight: 16 },
  backText: { color: colors.primary, fontSize: 15, fontWeight: "700" },
  header: { gap: 9, paddingVertical: 8 },
  eyebrow: { color: colors.primary, fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  title: { color: colors.ink, fontSize: 29, lineHeight: 40, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  stageCard: { backgroundColor: colors.paleGreen, borderRadius: 20, padding: 18, gap: 10 },
  stageLabel: { color: colors.primary, fontSize: 13, fontWeight: "800" },
  stageText: { color: colors.ink, fontSize: 14, lineHeight: 24, fontWeight: "700" },
  questionHeader: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 },
  counter: { color: colors.primary, fontSize: 16, fontWeight: "800" },
  progressTrack: { height: 10, backgroundColor: colors.border, borderRadius: 12, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.primary, borderRadius: 12 },
  card: { backgroundColor: colors.surface, borderRadius: 24, padding: 22, gap: 16 },
  sectionTitle: { color: colors.ink, fontSize: 19, lineHeight: 28, fontWeight: "800" },
  english: { color: colors.ink, fontSize: 24, lineHeight: 35, fontWeight: "800" },
  translation: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  options: { gap: 12, marginTop: 4 },
  option: { minHeight: 56, borderWidth: 2, borderColor: colors.border, borderRadius: 16, justifyContent: "center", paddingHorizontal: 18, paddingVertical: 12 },
  optionCorrect: { backgroundColor: colors.paleGreen, borderColor: colors.primary },
  optionWrong: { backgroundColor: colors.peach, borderColor: colors.warning },
  optionText: { color: colors.ink, fontSize: 18, fontWeight: "700" },
  feedback: { borderRadius: 20, padding: 20, gap: 10 },
  feedbackCorrect: { backgroundColor: colors.paleGreen },
  feedbackWrong: { backgroundColor: colors.peach },
  feedbackTitle: { color: colors.ink, fontSize: 18, fontWeight: "800" },
  body: { color: colors.ink, fontSize: 15, lineHeight: 26 },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 18, minHeight: 52, alignItems: "center", justifyContent: "center", padding: 12 },
  primaryText: { color: colors.surface, fontSize: 16, fontWeight: "800" },
  secondaryButton: { borderRadius: 18, minHeight: 52, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: colors.primary, padding: 12 },
  secondaryText: { color: colors.primary, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.75 },
  smallText: { color: colors.muted, fontSize: 12, lineHeight: 20 },
});
