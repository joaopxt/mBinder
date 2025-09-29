import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";

interface RowProps {
  label: string;
  percent: number; // 0-100
}

const ColorBreakdownRow: React.FC<RowProps> = ({ label, percent }) => {
  const t = useAppTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: t.text.muted }]}>{label}</Text>
      <View style={[styles.track, { backgroundColor: t.bg.tile }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percent}%`,
              backgroundColor: t.primary,
            },
          ]}
        />
      </View>
      <Text style={[styles.percent, { color: t.text.primary }]}>
        {percent}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  label: {
    width: 82,
    fontSize: 12,
    fontWeight: "600",
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: RADIUS.pill,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: RADIUS.pill,
  },
  percent: {
    width: 50,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ColorBreakdownRow;
