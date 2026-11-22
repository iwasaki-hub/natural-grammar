import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>NATURAL GRAMMAR</Text>
        <Text style={styles.title} accessibilityRole="header">ページが見つかりません</Text>
        <Text style={styles.description}>URLをご確認ください。ホームから学習を再開できます。</Text>
        <Pressable style={styles.button} accessibilityRole="button" onPress={() => router.replace("/")}>
          <Text style={styles.buttonText}>ホームに戻る</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF9F1" },
  content: { flex: 1, width: "100%", maxWidth: 560, alignSelf: "center", justifyContent: "center", paddingHorizontal: 24, gap: 20 },
  eyebrow: { color: "#237A6D", fontSize: 13, fontWeight: "800", letterSpacing: 1 },
  title: { color: "#243B38", fontSize: 28, fontWeight: "800", lineHeight: 40 },
  description: { color: "#61736D", fontSize: 16, lineHeight: 26 },
  button: { backgroundColor: "#237A6D", borderRadius: 18, padding: 16, minHeight: 56, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
