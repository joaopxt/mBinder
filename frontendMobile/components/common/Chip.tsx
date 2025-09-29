import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onPress }) => {
  const t = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: active ? t.primary : t.bg.tile,
        },
      ]}
      android_ripple={{ color: t.primarySoftAlt }}
    >
      <Text
        style={[
          styles.text,
          {
            color: active ? "#fff" : t.text.primary,
            opacity: active ? 1 : 0.9,
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
    borderRadius: RADIUS.pill,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
});

export default Chip;
