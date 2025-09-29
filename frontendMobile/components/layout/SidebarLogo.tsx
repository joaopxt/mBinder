import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";

const SidebarLogo: React.FC = () => {
  const t = useAppTheme();

  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoIcon, { color: t.primary }]}>⬟</Text>
      <Text style={[styles.logoText, { color: t.text.primary }]}>mBinder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  logoIcon: {
    fontSize: 28,
    fontWeight: "700",
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default SidebarLogo;
