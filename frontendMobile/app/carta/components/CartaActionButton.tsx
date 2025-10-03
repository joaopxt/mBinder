import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../../theme/tokens";

interface CartaActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

const CartaActionButton: React.FC<CartaActionButtonProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  const t = useAppTheme();

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: variant === "secondary" ? t.bg.alt : t.primary,
        },
        variant === "secondary" && {
          borderWidth: 1,
          borderColor: t.border.base,
        },
      ]}
      onPress={onPress}
      android_ripple={{
        color:
          variant === "primary" ? "rgba(255, 255, 255, 0.2)" : t.primarySoft,
      }}
    >
      <Text
        style={[
          styles.text,
          {
            color: variant === "secondary" ? t.text.primary : t.bg.base,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    paddingHorizontal: SPACING.lg,
    width: "100%", // This works fine in StyleSheet
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CartaActionButton;
