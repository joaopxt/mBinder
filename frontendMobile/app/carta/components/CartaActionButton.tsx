import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../../theme/tokens";

interface CartaActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean; // ADD THIS MISSING PROP
}

const CartaActionButton: React.FC<CartaActionButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false, // ADD THIS MISSING PROP
}) => {
  const t = useAppTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      height: 48,
      paddingHorizontal: SPACING.lg,
      borderRadius: RADIUS.lg,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      flex: 1,
    };

    // Handle disabled/loading state
    if (disabled || loading) {
      return {
        ...baseStyle,
        backgroundColor: variant === "primary" ? t.primarySoft : t.bg.alt,
        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: variant === "outline" ? t.border.base : "transparent",
        opacity: 0.6,
      };
    }

    switch (variant) {
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: t.bg.alt,
          borderWidth: 1,
          borderColor: t.border.base,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: t.primary,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: t.primary,
        };
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: 16,
      fontWeight: "600" as const,
      textAlign: "center" as const,
    };

    if (disabled || loading) {
      return {
        ...baseStyle,
        color: t.text.muted,
      };
    }

    switch (variant) {
      case "secondary":
        return {
          ...baseStyle,
          color: t.text.primary,
        };
      case "outline":
        return {
          ...baseStyle,
          color: t.primary,
        };
      default:
        return {
          ...baseStyle,
          color: t.bg.base, // White text on primary background
        };
    }
  };

  return (
    <Pressable
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{
        color:
          variant === "primary" ? "rgba(255, 255, 255, 0.2)" : t.primarySoft,
      }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={getTextStyle().color}
          style={styles.loadingIndicator}
        />
      )}

      <Text style={getTextStyle()}>{loading ? "Adding..." : title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    marginRight: SPACING.sm,
  },
});

export default CartaActionButton;
