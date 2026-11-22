import { Tabs } from "expo-router";
import { Text } from "react-native";

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  primary: "#237A6D",
  muted: "#61736D",
  border: "#D9E4DE",
} as const;

function TabIcon({ glyph, color }: { glyph: string; color: string }) {
  return (
    <Text accessibilityElementsHidden style={{ color, fontSize: 24, lineHeight: 28, fontWeight: "700" }}>
      {glyph}
    </Text>
  );
}

export default function MainTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        tabBarLabelPosition: "below-icon",
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarAccessibilityLabel: "ホーム",
          tabBarIcon: ({ color }) => <TabIcon glyph="⌂" color={color} />,
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: "復習",
          tabBarAccessibilityLabel: "復習",
          tabBarIcon: ({ color }) => <TabIcon glyph="↺" color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: "成長記録",
          tabBarAccessibilityLabel: "成長記録",
          tabBarIcon: ({ color }) => <TabIcon glyph="✦" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarAccessibilityLabel: "設定",
          tabBarIcon: ({ color }) => <TabIcon glyph="⚙" color={color} />,
        }}
      />
    </Tabs>
  );
}
