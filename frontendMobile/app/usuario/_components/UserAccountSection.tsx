import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface UserAccountSectionProps {
  title: string;
  children: React.ReactNode;
}

const UserAccountSection: React.FC<UserAccountSectionProps> = ({
  title,
  children,
}) => {
  const t = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: t.bg.tile }]}>
      <Text style={[styles.title, { color: t.text.primary }]}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  content: {
    gap: SPACING.sm,
  },
});

export default UserAccountSection;
