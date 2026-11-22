import { StyleSheet, Text, View } from "react-native";
import { TabCard, TabPage, tabColors } from "../../components/TabPage";

export default function SettingsScreen() {
  return (
    <TabPage title="設定" subtitle="自分に合うペースで、気持ちよく学ぼう。">
      <TabCard>
        <Text style={styles.heading} accessibilityRole="header">画面のデザイン</Text>
        <Text style={styles.body}>
          デザイン資料では「ポップ」と「落ち着いたシンプル」の2種類を予定しています。
        </Text>
        <View style={styles.optionCurrent}>
          <Text style={styles.optionTitle}>ポップ</Text>
          <Text style={styles.optionDetail}>現在のデザイン · やさしいグリーンとクリーム色</Text>
        </View>
        <View style={styles.optionSoon}>
          <Text style={styles.optionTitle}>落ち着いたシンプル</Text>
          <Text style={styles.optionDetail}>今後追加予定 · 切り替え機能はまだ利用できません</Text>
        </View>
      </TabCard>
      <TabCard pale>
        <Text style={styles.heading} accessibilityRole="header">学習データについて</Text>
        <Text style={styles.body}>
          現在はお試し版です。レッスン完了の状態はアプリを使っている間だけ保持されます。
        </Text>
        <Text style={styles.note}>
          アカウント機能、学習履歴の保存、外観の切り替えは今後実装します。
        </Text>
      </TabCard>
    </TabPage>
  );
}

const styles = StyleSheet.create({
  heading: { color: tabColors.ink, fontSize: 20, lineHeight: 28, fontWeight: "800" },
  body: { color: tabColors.ink, fontSize: 15, lineHeight: 25 },
  optionCurrent: { backgroundColor: tabColors.peach, borderRadius: 16, padding: 16, gap: 6 },
  optionSoon: { backgroundColor: tabColors.background, borderRadius: 16, padding: 16, gap: 6, borderWidth: 1, borderColor: tabColors.border },
  optionTitle: { color: tabColors.ink, fontSize: 16, fontWeight: "800" },
  optionDetail: { color: tabColors.muted, fontSize: 13, lineHeight: 21 },
  note: { color: tabColors.muted, fontSize: 13, lineHeight: 22 },
});
