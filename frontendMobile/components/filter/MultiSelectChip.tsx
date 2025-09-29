import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface MultiSelectChipProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
}

const MultiSelectChip: React.FC<MultiSelectChipProps> = ({
  label,
  selected,
  onToggle,
}) => {
  const t = useAppTheme();
  return (
    <Pressable
      onPress={onToggle}
      android_ripple={{ color: t.primarySoftAlt }}
      style={[
        styles.base,
        {
          backgroundColor: selected ? t.primarySoftAlt : t.bg.tileAlt,
          borderColor: selected ? t.primary : "transparent",
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: selected ? t.text.primary : t.text.primary,
            fontWeight: selected ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});

export default MultiSelectChip;
