import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface KpiTileProps {
  label: string;
  value: string | number;
}

const KpiTile: React.FC<KpiTileProps> = ({ label, value }) => {
  const t = useAppTheme();
  return (
    <View style={[styles.box, { backgroundColor: t.bg.tile }]}>
      <Text style={[styles.label, { color: t.text.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: t.text.primary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default KpiTile;
