import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface Props {
  title: string;
  subtitle: string;
  active?: boolean;
  onPress?: () => void;
}

const MatchOptionCard: React.FC<Props> = ({
  title,
  subtitle,
  active,
  onPress,
}) => {
  const t = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: t.primarySoft }}
      style={[
        styles.card,
        {
          backgroundColor: active ? `${t.primary}40` : "transparent",
          borderColor: active ? t.primary : `${t.primary}50`,
        },
      ]}
    >
      <Text style={[styles.title, { color: t.text.primary }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: t.text.muted }]}>{subtitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: SPACING.sm,
  },
});

export default MatchOptionCard;
