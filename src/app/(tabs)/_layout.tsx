import { Tabs } from "expo-router";
import { Platform, Text, type ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  primary: "#237A6D",
  muted: "#61736D",
  border: "#D9E4DE",
} as const;

function TabIcon({ glyph, color }: { glyph: string; color: ColorValue }) {
  return (
    <Text accessibilityElementsHidden style={{ color, fontSize: 24, lineHeight: 28, fontWeight: "700" }}>
      {glyph}
    </Text>
  );
}

export default function MainTabsLayout() {
  const insets = useSafeAreaInsets();
  // Mobile Safari can reserve too little height for the browser-rendered tab bar.
  // Keep both the icon and its label inside an explicitly sized, safe-area-aware bar.
  const bottomInset = Platform.OS === "web" ? Math.max(insets.bottom, 12) : insets.bottom;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64 + bottomInset,
          paddingTop: 8,
          paddingBottom: bottomInset,
        },
        tabBarLabelStyle: { fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 2, marginBottom: 0 },
        tabBarLabelPosition: "below-icon",
        tabBarIconStyle: { height: 28, width: 32 },
        tabBarItemStyle: { paddingVertical: 0 },
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
