import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SPACING, RADIUS } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";

interface StatTileProps {
  label: string;
  value: number | string;
}

const StatTile: React.FC<StatTileProps> = ({ label, value }) => {
  const t = useAppTheme();
  return (
    <View style={[styles.tile, { backgroundColor: t.bg.tile }]}>
      <Text style={[styles.value, { color: t.text.primary }]}>{value}</Text>
      <Text style={[styles.label, { color: t.text.muted }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default StatTile;
