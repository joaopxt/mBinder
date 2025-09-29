import React from "react";
import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";

interface Props {
  title?: string; // Mantido para compatibilidade
  text?: string; // Prop alternativa
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: ViewStyle;
  full?: boolean; // Nova prop para largura completa
}

const ActionButton: React.FC<Props> = ({
  title,
  text,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  full = false,
}) => {
  const t = useAppTheme();

  // Usa text se fornecido, senão usa title (compatibilidade)
  const buttonText = text || title || "";

  const isPrimary = variant === "primary";
  const backgroundColor = disabled
    ? `${t.primary}30`
    : isPrimary
    ? t.primary
    : "transparent";

  const textColor = disabled
    ? `${t.text.primary}50`
    : isPrimary
    ? "#FFFFFF"
    : t.primary;

  const borderColor = isPrimary ? "transparent" : t.primary;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      android_ripple={{
        color: isPrimary ? "rgba(255,255,255,0.2)" : `${t.primary}20`,
      }}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth: isPrimary ? 0 : 2,
          width: full ? "100%" : undefined,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default ActionButton;
