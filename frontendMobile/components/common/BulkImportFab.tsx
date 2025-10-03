import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface BulkImportFabProps {
  onPress: () => void;
  icon?: string;
}

const BulkImportFab: React.FC<BulkImportFabProps> = ({
  onPress,
  icon = "📋",
}) => {
  const t = useAppTheme();

  return (
    <Pressable
      style={[
        styles.fab,
        {
          backgroundColor: t.primary,
        },
      ]}
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
    >
      <Text style={[styles.icon, { color: t.bg.base }]}>{icon}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 100, // Above bottom nav
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 24,
  },
});

export default BulkImportFab;
