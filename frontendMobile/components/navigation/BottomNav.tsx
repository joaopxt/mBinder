// ...existing code...
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SPACING } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// ...existing code...
interface NavItem {
  key: string;
  label: string;
  icon: string;
  route: string;
}

const ITEMS: NavItem[] = [
  { key: "home", label: "Home", icon: "⌂", route: "/home/Home" },
  { key: "library", label: "Library", icon: "⌸", route: "/library/LibPage" },
  { key: "decks", label: "Decks", icon: "♞", route: "/deck/DeckPage" },
  { key: "wants", label: "Want", icon: "☰", route: "/want/WantPage" },
  { key: "passe", label: "Passe", icon: "📈", route: "/passe/PassePage" },
  { key: "profile", label: "Profile", icon: "👤", route: "/usuario/UserPage" },
];

interface BottomNavProps {
  active: string;
  onNavigate: (route: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
  const t = useAppTheme();
  const insets = useSafeAreaInsets();
  const extraBottom = insets.bottom || 12; // garante espaço sobre gestural / barra nativa

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor:
            t.mode === "dark"
              ? "rgba(35,25,15,0.92)"
              : "rgba(255,255,255,0.95)",
          borderTopColor: t.border.base,
          paddingBottom: extraBottom + SPACING.sm, // mais alto
        },
      ]}
    >
      {ITEMS.map((it) => {
        const activeState = it.key === active;
        return (
          <Pressable
            key={it.key}
            onPress={() => onNavigate(it.route)}
            style={styles.item}
            android_ripple={{ color: t.primarySoft }}
          >
            <Text
              style={[
                styles.icon,
                { color: activeState ? t.primary : t.text.muted },
              ]}
            >
              {it.icon}
            </Text>
            <Text
              style={[
                styles.label,
                { color: activeState ? t.primary : t.text.muted },
              ]}
            >
              {it.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingTop: SPACING.sm + 2,
    // altura visual maior (minHeight aprox 68~72 considerando padding + safe area)
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  item: {
    flex: 1,
    paddingVertical: SPACING.xs + 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: { fontSize: 20 }, // ligeiro aumento
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginTop: 2,
  },
});

export default BottomNav;
// ...existing code...
