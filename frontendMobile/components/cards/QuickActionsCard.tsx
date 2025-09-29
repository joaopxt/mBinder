import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING, RADIUS } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";
import ActionButton from "../common/ActionButton";

interface QuickActionsCardProps {
  onAddWant: () => void;
  onAddPasse: () => void;
  onMatch: () => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onAddWant,
  onAddPasse,
  onMatch,
}) => {
  const t = useAppTheme();
  return (
    <View style={[styles.wrapper, { backgroundColor: t.bg.tile }]}>
      <View style={styles.row}>
        <ActionButton
          text="Add to Want"
          onPress={onAddWant}
          style={styles.flexButton}
        />
        <ActionButton
          text="Add to Passe"
          onPress={onAddPasse}
          style={styles.flexButton}
        />
      </View>
      <ActionButton
        text="Start Match"
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
    gap: SPACING.lg,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  flexButton: {
    flex: 1,
  },
});

export default QuickActionsCard;
