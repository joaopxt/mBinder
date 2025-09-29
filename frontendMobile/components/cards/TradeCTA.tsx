import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SPACING, RADIUS } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";
import ActionButton from "../common/ActionButton";

interface TradeCTAProps {
  onMatch: () => void;
}

const TradeCTA: React.FC<TradeCTAProps> = ({ onMatch }) => {
  const t = useAppTheme();
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: t.mode === "dark" ? t.primarySoftAlt : t.bg.tileAlt,
        },
      ]}
    >
      <Text style={[styles.icon, { color: t.primary }]}>◆</Text>
      <Text style={[styles.title, { color: t.text.primary }]}>
        Ready to Trade?
      </Text>
      <Text style={[styles.body, { color: t.text.muted }]}>
        You have cards in both your Want and Passe lists. Find your next trade!
      </Text>
      <ActionButton
        text="Find a Match"
        variant="primary"
        onPress={onMatch}
        full
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: SPACING.sm,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
});

export default TradeCTA;
