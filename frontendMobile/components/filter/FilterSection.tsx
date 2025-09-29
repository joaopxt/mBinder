import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SPACING } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
  const t = useAppTheme();
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: t.text.primary }]}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm + 4,
  },
});

export default FilterSection;
