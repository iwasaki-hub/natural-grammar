import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign } from "../context/DesignContext";
import { useLessonProgress } from "../context/LessonProgressContext";

const questions = [
  { prompt: "「私は働きます。」の正しい英文は？", choices: ["Work I.", "I work.", "I working."], answer: 1, hint: "「私は」にあたる主語を文の先頭に置きましょう。", explanation: "I（主語）→ work（動詞）の順番です。" },
  { prompt: "「あなたは勉強します。」の正しい英文は？", choices: ["You study.", "Study you.", "You studying."], answer: 0, hint: "主語は You。動詞 study をその後ろに置きます。", explanation: "You（主語）→ study（動詞）が基本です。" },
  { prompt: "We work. の主語はどれ？", choices: ["work", "We work", "We"], answer: 2, hint: "「だれが」を表す語を選びましょう。", explanation: "We は「私たち」を表す主語で、work が動詞です。" },
] as const;

export default function Day1Practice() {
  const { colors } = useDesign();
  const { markDay1PracticePassed } = useLessonProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const correct = selected === question.answer;
  function next() {
    if (!correct) return;
    if (index === questions.length - 1) {
      markDay1PracticePassed();
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.replace("/day1-lesson")} style={styles.back}><Text style={{ color: colors.primary }}>← 解説に戻る</Text></Pressable>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>DAY 1 / 30 · 練習</Text>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.ink }]}>主語と動詞を練習しよう</Text>
        {finished ? (
          <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.title, { color: colors.ink }]}>3問すべて正解！ ✨</Text>
            <Text style={[styles.body, { color: colors.ink }]}>主語と動詞の並びがわかりました。まとめへ進みましょう。</Text>
            <Pressable accessibilityRole="button" onPress={() => router.replace("/day1-summary")} style={[styles.action, { backgroundColor: colors.primary }]}><Text style={styles.actionText}>まとめへ進む</Text></Pressable>
            <Pressable accessibilityRole="button" onPress={() => { setIndex(0); setSelected(null); setFinished(false); }} style={styles.back}><Text style={{ color: colors.primary }}>もう一度練習する</Text></Pressable>
          </View>
        ) : (
          <>
            <Text style={[styles.body, { color: colors.muted }]}>問題 {index + 1} / 3</Text>
            <View style={[styles.card, { backgroundColor: colors.surface }]}>
              <Text accessibilityRole="header" style={[styles.heading, { color: colors.ink }]}>{question.prompt}</Text>
              {question.choices.map((choice, i) => (
                <Pressable key={choice} accessibilityRole="button" accessibilityLabel={choice} accessibilityState={{ selected: selected === i, disabled: correct }} disabled={correct} onPress={() => setSelected(i)} style={[styles.choice, { borderColor: selected === i ? colors.primary : colors.border, backgroundColor: selected === i && correct ? colors.paleGreen : colors.surface }]}>
                  <Text style={[styles.body, { color: colors.ink }]}>{choice}</Text>
                </Pressable>
              ))}
            </View>
            {selected !== null && <View accessibilityLiveRegion="polite" style={[styles.card, { backgroundColor: correct ? colors.paleGreen : colors.peach }]}>
              <Text style={[styles.heading, { color: colors.ink }]}>{correct ? "正解です！" : "もう一度考えてみましょう"}</Text>
              <Text style={[styles.body, { color: colors.ink }]}>{correct ? question.explanation : question.hint}</Text>
            </View>}
            {correct && <Pressable accessibilityRole="button" onPress={next} style={[styles.action, { backgroundColor: colors.primary }]}><Text style={styles.actionText}>{index === 2 ? "練習結果を見る" : "次の問題へ"}</Text></Pressable>}
          </>
        )}
        <Text style={[styles.note, { color: colors.muted }]}>練習途中の状態は保存されません。3問正解後、まとめから完了を保存できます。</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: { width: "100%", maxWidth: 560, alignSelf: "center", padding: 22, paddingBottom: 44, gap: 16 },
  back: { minHeight: 44, justifyContent: "center" },
  eyebrow: { fontSize: 13, fontWeight: "800" },
  title: { fontSize: 27, lineHeight: 38, fontWeight: "800" },
  heading: { fontSize: 19, lineHeight: 28, fontWeight: "800" },
  body: { fontSize: 16, lineHeight: 26 },
  card: { borderRadius: 22, padding: 20, gap: 14 },
  choice: { borderWidth: 2, borderRadius: 15, padding: 14, minHeight: 54, justifyContent: "center" },
  action: { borderRadius: 18, minHeight: 56, justifyContent: "center", alignItems: "center", padding: 12 },
  actionText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  note: { fontSize: 12, lineHeight: 20 },
});
