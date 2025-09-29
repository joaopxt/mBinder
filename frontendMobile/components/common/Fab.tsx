import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FabProps {
  onPress?: () => void;
  label?: string;
  icon?: string;
}

const Fab: React.FC<FabProps> = ({ onPress, label = "Add", icon = "+" }) => {
  const t = useAppTheme();
  const insets = useSafeAreaInsets();
  const bottomOffset = (insets.bottom || 12) + 68 + SPACING.lg; // safe area + nav height + margin

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: t.primarySoftAlt }}
      style={[
        styles.fab,
        {
          backgroundColor: t.primary,
          shadowColor: "#000",
          bottom: bottomOffset,
        },
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    elevation: 12, // aumentado para ficar acima da nav
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 999, // garante que fica por cima
  },
  icon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: -1,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});

export default Fab;
