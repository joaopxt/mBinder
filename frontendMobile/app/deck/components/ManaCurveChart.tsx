import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface Props {
  data: number[];
}

const ManaCurveChart: React.FC<Props> = ({ data }) => {
  const t = useAppTheme();
  const maxValue = Math.max(...data);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            t.mode === "dark"
              ? "rgba(249, 128, 6, 0.2)"
              : "rgba(249, 128, 6, 0.1)",
        },
      ]}
    >
      <View style={styles.bars}>
        {data.map((value, index) => {
          const heightPercent = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <View
              key={index}
              style={[
                styles.bar,
                {
                  height: `${Math.max(heightPercent, 10)}%`,
                  backgroundColor:
                    heightPercent === 100
                      ? t.primary
                      : "rgba(249, 128, 6, 0.5)",
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 96,
    padding: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  bars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING.sm,
  },
  bar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 8,
  },
});

export default ManaCurveChart;
