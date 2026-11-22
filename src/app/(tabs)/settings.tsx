import { Pressable, StyleSheet, Text, View } from "react-native";
import { TabCard, TabPage, tabColors } from "../../components/TabPage";
import { useDesign, type DesignTheme } from "../../context/DesignContext";

export default function SettingsScreen() {
  const { design, setDesign, colors } = useDesign();
  const option = (value: DesignTheme, title: string, detail: string) => {
    const selected = design === value;
    return (
      <Pressable
        key={value}
        accessibilityRole="radio"
        accessibilityState={{ checked: selected }}
        accessibilityLabel={title}
        onPress={() => setDesign(value)}
        style={({ pressed }) => [
          styles.option,
          { backgroundColor: selected ? colors.paleGreen : colors.surface, borderColor: selected ? colors.primary : colors.border },
          pressed && { opacity: 0.8 },
        ]}
      >
        <View style={styles.optionCopy}>
          <Text style={[styles.optionTitle, { color: colors.ink }]}>{title}</Text>
          <Text style={[styles.optionDetail, { color: colors.muted }]}>{detail}</Text>
        </View>
        <Text style={[styles.check, { color: colors.primary }]} accessibilityElementsHidden>{selected ? "✓" : "○"}</Text>
      </Pressable>
    );
  };
  return (
    <TabPage title="設定" subtitle="自分に合うペースで、気持ちよく学ぼう。">
      <TabCard>
        <Text style={[styles.heading, { color: colors.ink }]} accessibilityRole="header">画面のデザイン</Text>
        <Text style={[styles.body, { color: colors.ink }]}>お好みのデザインを選べます。選択するとすぐに画面へ反映されます。</Text>
        <View accessibilityRole="radiogroup" style={styles.options}>
          {option("pop", "ポップ", "やさしいグリーンとクリーム色")}
          {option("simple", "落ち着いたシンプル", "控えめな色合いとすっきりしたカード")}
        </View>
        <Text style={[styles.note, { color: colors.muted }]}>Web版では選択をこのブラウザに保存します。</Text>
      </TabCard>
      <TabCard pale>
        <Text style={[styles.heading, { color: colors.ink }]} accessibilityRole="header">学習データについて</Text>
        <Text style={[styles.body, { color: colors.ink }]}>現在はお試し版です。レッスン完了の状態はアプリを使っている間だけ保持されます。</Text>
        <Text style={[styles.note, { color: colors.muted }]}>アカウント機能と学習履歴の保存は今後実装します。</Text>
      </TabCard>
    </TabPage>
  );
}

const styles = StyleSheet.create({
  heading: { color: tabColors.ink, fontSize: 20, lineHeight: 28, fontWeight: "800" },
  body: { color: tabColors.ink, fontSize: 15, lineHeight: 25 },
  options: { gap: 12 },
  option: { borderRadius: 16, padding: 16, borderWidth: 1.5, flexDirection: "row", alignItems: "center", gap: 12, minHeight: 78 },
  optionCopy: { flex: 1, gap: 6 },
  optionTitle: { fontSize: 16, fontWeight: "800" },
  optionDetail: { fontSize: 13, lineHeight: 21 },
  check: { fontSize: 22, fontWeight: "800" },
  note: { color: tabColors.muted, fontSize: 13, lineHeight: 22 },
});
