import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface Props {
  totalCards: number;
  colors: string[];
}

const DeckStats: React.FC<Props> = ({ totalCards, colors }) => {
  const t = useAppTheme();

  return (
    <View style={styles.grid}>
      <View
        style={[
          styles.statCard,
          {
            backgroundColor:
              t.mode === "dark"
                ? "rgba(249, 128, 6, 0.2)"
                : "rgba(249, 128, 6, 0.1)",
          },
        ]}
      >
        <Text style={[styles.label, { color: t.text.muted }]}>Total Cards</Text>
        <Text style={[styles.value, { color: t.text.primary }]}>
          {totalCards}
        </Text>
      </View>

      <View
        style={[
          styles.statCard,
          {
            backgroundColor:
              t.mode === "dark"
                ? "rgba(249, 128, 6, 0.2)"
                : "rgba(249, 128, 6, 0.1)",
          },
        ]}
      >
        <Text style={[styles.label, { color: t.text.muted }]}>Colors</Text>
        <View style={styles.colorBar}>
          <View
            style={[
              styles.colorFill,
              {
                backgroundColor: colors.length > 0 ? "#3B82F6" : "#6B7280",
                width: "100%",
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2,
  },
  colorBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#6B7280",
    borderRadius: 3,
    marginTop: SPACING.sm,
    overflow: "hidden",
  },
  colorFill: {
    height: "100%",
    borderRadius: 3,
  },
});

export default DeckStats;
