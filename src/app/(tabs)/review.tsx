import { useMemo } from "react";
import { useDesign, palettes } from "../../context/DesignContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabCard, TabPage } from "../../components/TabPage";

export default function ReviewScreen() {
  const { colors } = useDesign();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <TabPage title="復習" subtitle="わからなかったところを、少しずつ自分の力に。">
      <TabCard pale>
        <Text style={styles.badge}>学び直し</Text>
        <Text style={styles.heading} accessibilityRole="header">いつでも、もう一度。</Text>
        <Text style={styles.body}>
          練習した問題を、納得できるまで繰り返し解いてみましょう。
        </Text>
      </TabCard>
      <TabCard>
        <View style={styles.row}>
          <Text style={styles.tag}>DAY 4</Text>
          <Text style={styles.meta}>サンプル 3問</Text>
        </View>
        <Text style={styles.heading} accessibilityRole="header">一般動詞の現在形</Text>
        <Text style={styles.body}>I / she / they に合わせた動詞の形を復習できます。</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Day 4の練習問題をもう一度解く"
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => router.push("/practice")}
        >
          <Text style={styles.buttonText}>3問をもう一度練習する</Text>
        </Pressable>
      </TabCard>
      <Text style={styles.note}>
        ※ 間違えた問題の自動記録・一覧表示は準備中です。今はDay 4のサンプル問題を最初から解き直せます。
      </Text>
    </TabPage>
  );
}

function createStyles(colors: (typeof palettes)["pop"] | (typeof palettes)["simple"]) {
  return StyleSheet.create({
  badge: { color: colors.primary, fontSize: 13, fontWeight: "800" },
  heading: { color: colors.ink, fontSize: 21, lineHeight: 30, fontWeight: "800" },
  body: { color: colors.ink, fontSize: 15, lineHeight: 25 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  tag: { backgroundColor: colors.peach, color: colors.primary, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 14, overflow: "hidden", fontSize: 13, fontWeight: "800" },
  meta: { color: colors.muted, fontSize: 13 },
  button: { backgroundColor: colors.primary, borderRadius: 18, minHeight: 54, paddingHorizontal: 14, justifyContent: "center", alignItems: "center" },
  buttonText: { color: colors.surface, fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.8 },
  note: { color: colors.muted, fontSize: 12, lineHeight: 20, paddingHorizontal: 2 },
});
}
