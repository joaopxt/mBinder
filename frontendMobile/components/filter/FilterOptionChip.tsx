import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface FilterOptionChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

const FilterOptionChip: React.FC<FilterOptionChipProps> = ({
  label,
  active,
  onPress,
}) => {
  const t = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: t.primarySoftAlt }}
      style={[
        styles.base,
        {
          backgroundColor: active ? t.primarySoftAlt : t.bg.tile,
          borderColor: active ? t.primary : t.border.base,
          borderWidth: active ? 2 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: active ? t.text.primary : t.text.primary,
            fontWeight: active ? "700" : "600",
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
    paddingHorizontal: SPACING.md + 4,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  text: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
});

export default FilterOptionChip;
