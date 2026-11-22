import { Tabs } from "expo-router";
import { useEffect, useRef, useState, type ComponentProps } from "react";
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
function SlidingGlassTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);
  const [barWidth, setBarWidth] = useState(0);
  const position = useRef(new Animated.Value(state.index)).current;
  const count = state.routes.length;
  const itemWidth = count ? barWidth / count : 0;

  useEffect(() => {
    Animated.timing(position, {
      toValue: state.index,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [position, state.index]);

  const glassBlur = {
    backdropFilter: "blur(18px) saturate(150%)",
    WebkitBackdropFilter: "blur(18px) saturate(150%)",
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
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.8)",
        backgroundColor: "rgba(255,249,241,0.88)",
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
              top: 5,
              bottom: 5,
              left: 0,
              width: Math.max(itemWidth - 8, 0),
              marginLeft: 4,
              borderRadius: 19,
              borderWidth: 1.5,
              borderColor: "rgba(255,255,255,0.95)",
              backgroundColor: "rgba(255,255,255,0.48)",
              shadowColor: "#FFFFFF",
              shadowOpacity: 0.8,
              shadowRadius: 9,
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
        const color = focused ? colors.primary : colors.muted;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? content.label}
            onPress={() => {
              const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            }}
            onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })}
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
  const insets = useSafeAreaInsets();
  // Keep the original native bar. The custom sliding-glass bar targets the web
  // app used in iPhone Safari and preserves the existing safe-area behavior.
  const bottomInset = Platform.OS === "web" ? Math.max(insets.bottom, 12) : insets.bottom;
  return (
    <Tabs
      tabBar={Platform.OS === "web" ? (props) => <SlidingGlassTabBar {...props} /> : undefined}
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
      <Tabs.Screen name="index" options={{ title: "ホーム", tabBarAccessibilityLabel: "ホーム", tabBarIcon: ({ color }) => <TabIcon glyph="⌂" color={color} /> }} />
      <Tabs.Screen name="review" options={{ title: "復習", tabBarAccessibilityLabel: "復習", tabBarIcon: ({ color }) => <TabIcon glyph="↺" color={color} /> }} />
      <Tabs.Screen name="achievements" options={{ title: "成長記録", tabBarAccessibilityLabel: "成長記録", tabBarIcon: ({ color }) => <TabIcon glyph="✦" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "設定", tabBarAccessibilityLabel: "設定", tabBarIcon: ({ color }) => <TabIcon glyph="⚙" color={color} /> }} />
    </Tabs>
  );
}
