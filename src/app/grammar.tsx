import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign } from "../context/DesignContext";
import { useLessonProgress } from "../context/LessonProgressContext";
import { getGrammarLesson, grammarLessons } from "../data/grammarLessons";

type Stage = "lesson" | "practice" | "summary";
type Question = { prompt: string; choices: readonly string[]; correct: number; explanation: string };
function makeQuestions(day: number): Question[] {
  const lesson = getGrammarLesson(day);
  if (!lesson) return [];
  const others = grammarLessons.filter((item) => item.day !== day);
  const a = others[(day * 3) % others.length];
  const b = others[(day * 3 + 1) % others.length];
  return [
    { prompt: lesson.question, choices: [lesson.distractors[0], lesson.answer, lesson.distractors[1]], correct: 1, explanation: lesson.rule },
    { prompt: `「${lesson.example}」の日本語訳は？`, choices: [lesson.translation, a.translation, b.translation], correct: 0, explanation: `${lesson.example} = ${lesson.translation}` },
    { prompt: `「${lesson.title}」について正しい説明は？`, choices: [a.rule, b.rule, lesson.rule], correct: 2, explanation: lesson.rule },
  ];
}
export default function GrammarScreen() {
  const params = useLocalSearchParams<{ day?: string; stage?: string }>();
  const day = Number(params.day);
  const lesson = getGrammarLesson(day);
  const stage: Stage = params.stage === "practice" || params.stage === "summary" ? params.stage : "lesson";
  const { colors } = useDesign();
  const { isPracticePassed, markDayPracticePassed, completeDay, isDayCompleted, progressLoaded } = useLessonProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const questions = lesson ? makeQuestions(day) : [];
  const question = questions[index];
  const correct = selected === question?.correct;
  // Switching lessons must never carry over a previously passed quiz.
  useEffect(() => { setIndex(0); setSelected(null); setFinished(false); }, [day, stage]);
  function go(next: Stage) {
    router.replace({ pathname: "/grammar", params: { day: String(day), stage: next } });
  }
  function next() {
    if (!correct) return;
    if (index === questions.length - 1) {
      markDayPracticePassed(day);
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }
  function finish() {
    if (!isPracticePassed(day) || !progressLoaded) return;
    completeDay(day);
    router.replace("/course");
  }
  if (!lesson) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}><View style={styles.content}><Text style={{ color: colors.ink }}>このレッスンは見つかりません。</Text><Pressable accessibilityRole="button" onPress={() => router.replace("/course")}><Text style={{ color: colors.primary }}>一覧へ戻る</Text></Pressable></View></SafeAreaView>;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" style={styles.back} onPress={() => stage === "lesson" ? router.replace("/course") : go(stage === "summary" ? "practice" : "lesson")}>
          <Text style={{ color: colors.primary, fontWeight: "700" }}>← {stage === "lesson" ? "レッスン一覧へ" : "前のステップへ"}</Text>
        </Pressable>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>DAY {day} / 30 · {stage === "lesson" ? "解説" : stage === "practice" ? "練習" : "まとめ"}</Text>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>{lesson.title}</Text>
        <View style={[styles.card, { backgroundColor: colors.paleGreen }]}>
          <Text style={[styles.body, { color: colors.ink }]}>① 解説 → ② 練習 → ③ まとめ</Text>
        </View>
        {stage === "lesson" && <>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.heading, { color: colors.ink }]}>まずはこの英文から</Text>
            <Text style={[styles.english, { color: colors.primary }]}>{lesson.example}</Text>
            <Text style={[styles.body, { color: colors.muted }]}>{lesson.translation}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.heading, { color: colors.ink }]}>今日の文法ポイント</Text>
            <Text style={[styles.body, { color: colors.ink }]}>{lesson.rule}</Text>
          </View>
          <Pressable accessibilityRole="button" style={[styles.action, { backgroundColor: colors.primary }]} onPress={() => go("practice")}><Text style={styles.actionText}>3問の練習へ進む</Text></Pressable>
        </>}
        {stage === "practice" && (finished ? (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.heading, { color: colors.ink }]}>3問すべて正解！ ✨</Text>
            <Text style={[styles.body, { color: colors.ink }]}>今日の文法をまとめで振り返りましょう。</Text>
            <Pressable accessibilityRole="button" style={[styles.action, { backgroundColor: colors.primary }]} onPress={() => go("summary")}><Text style={styles.actionText}>まとめへ進む</Text></Pressable>
          </View>
        ) : <>
          <Text style={[styles.body, { color: colors.muted }]}>問題 {index + 1} / {questions.length}</Text>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text accessibilityRole="header" style={[styles.heading, { color: colors.ink }]}>{question.prompt}</Text>
            {question.choices.map((choice, i) => <Pressable key={i} accessibilityRole="button" accessibilityLabel={choice} accessibilityState={{ selected: selected === i, disabled: correct }} disabled={correct} onPress={() => setSelected(i)} style={[styles.choice, { borderColor: selected === i ? colors.primary : colors.border, backgroundColor: selected === i && correct ? colors.paleGreen : colors.surface }]}>
              <Text style={[styles.body, { color: colors.ink }]}>{choice}</Text>
            </Pressable>)}
          </View>
          {selected !== null && <View accessibilityLiveRegion="polite" style={[styles.card, { backgroundColor: correct ? colors.paleGreen : colors.peach }]}>
            <Text style={[styles.heading, { color: colors.ink }]}>{correct ? "正解です！" : "もう一度考えてみましょう"}</Text>
            <Text style={[styles.body, { color: colors.ink }]}>{correct ? question.explanation : "解説の文法ポイントを思い出して、別の選択肢を試しましょう。"}</Text>
          </View>}
          {correct && <Pressable accessibilityRole="button" style={[styles.action, { backgroundColor: colors.primary }]} onPress={next}><Text style={styles.actionText}>{index === 2 ? "練習結果を見る" : "次の問題へ"}</Text></Pressable>}
        </>)}
        {stage === "summary" && (!isPracticePassed(day) ? (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.heading, { color: colors.ink }]}>まずは3問の練習を終えましょう</Text>
            <Pressable accessibilityRole="button" style={[styles.action, { backgroundColor: colors.primary }]} onPress={() => go("practice")}><Text style={styles.actionText}>練習へ進む</Text></Pressable>
          </View>
        ) : <>
          <View style={[styles.card, { backgroundColor: colors.paleGreen }]}>
            <Text accessibilityRole="header" style={[styles.heading, { color: colors.ink }]}>今日も一歩、前進！ ✨</Text>
            <Text style={[styles.body, { color: colors.ink }]}>{lesson.rule}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.english, { color: colors.primary }]}>{lesson.example}</Text>
            <Text style={[styles.body, { color: colors.muted }]}>{lesson.translation}</Text>
          </View>
          <Pressable accessibilityRole="button" disabled={!progressLoaded} style={[styles.action, { backgroundColor: colors.primary, opacity: progressLoaded ? 1 : 0.5 }]} onPress={finish}>
            <Text style={styles.actionText}>{isDayCompleted(day) ? "レッスン一覧に戻る" : `Day ${day}を完了する`}</Text>
          </Pressable>
        </>)}
        <Text style={[styles.note, { color: colors.muted }]}>完了状態はこのブラウザに保存します。練習途中の状態は保存されず、端末間同期はありません。</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 560, alignSelf: "center", padding: 22, paddingBottom: 44, gap: 16 },
  back: { minHeight: 44, justifyContent: "center" },
  eyebrow: { fontSize: 13, fontWeight: "800" },
  title: { fontSize: 29, lineHeight: 40, fontWeight: "800" },
  heading: { fontSize: 19, lineHeight: 28, fontWeight: "800" },
  english: { fontSize: 23, lineHeight: 33, fontWeight: "800" },
  body: { fontSize: 15, lineHeight: 26 },
  card: { borderRadius: 22, padding: 20, gap: 14 },
  choice: { borderWidth: 2, borderRadius: 15, padding: 14, minHeight: 54, justifyContent: "center" },
  action: { borderRadius: 18, minHeight: 56, justifyContent: "center", alignItems: "center", padding: 12 },
  actionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  note: { fontSize: 12, lineHeight: 20 },
});
