import { useDesign } from "../../context/DesignContext";
import { Tabs, router } from "expo-router";
import { useEffect, useState, type ComponentProps } from "react";
import { Animated, Platform, Pressable, Text, View, type ColorValue, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const colors = {
  background: "#FFF9F1",
  surface: "#FFFFFF",
  primary: "#237A6D",
  muted: "#61736D",
  border: "#D9E4DE",
} as const;

const tabContent: Record<string, { label: string; glyph: string }> = {
  index: { label: "ホーム", glyph: "⌂" },
  review: { label: "復習", glyph: "↺" },
  achievements: { label: "成長記録", glyph: "✦" },
  settings: { label: "設定", glyph: "⚙" },
};

function TabIcon({ glyph, color }: { glyph: string; color: ColorValue }) {
  return (
    <Text accessibilityElementsHidden style={{ color, fontSize: 24, lineHeight: 28, fontWeight: "700" }}>
      {glyph}
    </Text>
  );
}

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0];

// A single frosted-glass selection slides under the active tab, rather than
// fading separate selected backgrounds in and out.
function SlidingGlassTabBar({ state, descriptors }: TabBarProps) {
  const { design, colors: themeColors } = useDesign();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);
  const [barWidth, setBarWidth] = useState(0);
  const [position] = useState(() => new Animated.Value(state.index));
  const count = state.routes.length;
  const itemWidth = count ? barWidth / count : 0;

  useEffect(() => {
    // Spring motion glides between tabs and keeps momentum when tapped rapidly.
    // No overshoot: the glass stops precisely under the selected tab.
    Animated.spring(position, {
      toValue: state.index,
      stiffness: 135,
      damping: 24,
      mass: 1,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [position, state.index]);

  const glassBlur = {
    backdropFilter: "blur(24px) saturate(165%)",
    WebkitBackdropFilter: "blur(24px) saturate(165%)",
  } as unknown as ViewStyle;

  return (
    <View
      onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      style={{
        flexDirection: "row",
        marginHorizontal: 12,
        marginTop: 4,
        marginBottom: bottomInset,
        height: 68,
        borderRadius: design === "simple" ? 18 : 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.92)",
        backgroundColor: design === "simple" ? "rgba(243,246,244,0.94)" : "rgba(231,240,232,0.78)",
        overflow: "hidden",
        shadowColor: "#305D55",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      {itemWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: 4,
              bottom: 4,
              left: 0,
              width: Math.max(itemWidth - 6, 0),
              marginLeft: 3,
              borderRadius: design === "simple" ? 14 : 20,
              borderWidth: design === "simple" ? 1 : 2,
              borderColor: "rgba(255,255,255,1)",
              backgroundColor: design === "simple" ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.76)",
              shadowColor: "#237A6D",
              shadowOpacity: design === "simple" ? 0.1 : 0.26,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 3 },
              transform: [{ translateX: Animated.multiply(position, itemWidth) }],
            },
            glassBlur,
          ]}
        />
      )}
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const content = tabContent[route.name] ?? { label: options.title ?? route.name, glyph: "•" };
        const color = focused ? themeColors.primary : themeColors.muted;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? content.label}
            onPress={() => {
              if (!focused) {
                if (route.name === "index") router.navigate("/");
                else if (route.name === "review") router.navigate("/review");
                else if (route.name === "achievements") router.navigate("/achievements");
                else if (route.name === "settings") router.navigate("/settings");
              }
            }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 1, zIndex: 1 }}
          >
            <TabIcon glyph={content.glyph} color={color} />
            <Text
              numberOfLines={1}
              style={{ color, fontSize: 11, lineHeight: 16, fontWeight: focused ? "800" : "600" }}
            >
              {content.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabsLayout() {
  const { colors: themeColors } = useDesign();
  const insets = useSafeAreaInsets();
  // Keep the original native bar. The custom sliding-glass bar targets the web
  // app used in iPhone Safari and preserves the existing safe-area behavior.
  const bottomInset = Platform.OS === "web" ? Math.max(insets.bottom, 12) : insets.bottom;
  return (
    <Tabs
      tabBar={Platform.OS === "web" ? (props) => <SlidingGlassTabBar {...props} /> : undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.muted,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.border,
          height: 64 + bottomInset,
          paddingTop: 8,
          paddingBottom: bottomInset,
        },
        tabBarLabelStyle: { fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 2, marginBottom: 0 },
        tabBarLabelPosition: "below-icon",
        tabBarIconStyle: { height: 28, width: 32 },
        tabBarItemStyle: { paddingVertical: 0 },
        tabBarHideOnKeyboard: true,
        sceneStyle: { backgroundColor: themeColors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "ホーム", tabBarAccessibilityLabel: "ホーム", tabBarIcon: ({ color }) => <TabIcon glyph="⌂" color={color} /> }} />
      <Tabs.Screen name="review" options={{ title: "復習", tabBarAccessibilityLabel: "復習", tabBarIcon: ({ color }) => <TabIcon glyph="↺" color={color} /> }} />
      <Tabs.Screen name="achievements" options={{ title: "成長記録", tabBarAccessibilityLabel: "成長記録", tabBarIcon: ({ color }) => <TabIcon glyph="✦" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "設定", tabBarAccessibilityLabel: "設定", tabBarIcon: ({ color }) => <TabIcon glyph="⚙" color={color} /> }} />
    </Tabs>
  );
}
