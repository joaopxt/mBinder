import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface BulkImportActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  flex?: boolean; // For flexible width in modal layouts
}

const BulkImportActionButton: React.FC<BulkImportActionButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  flex = false,
}) => {
  const t = useAppTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: RADIUS.lg,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Size styles
    switch (size) {
      case "small":
        baseStyle.height = 36;
        baseStyle.paddingHorizontal = SPACING.md;
        break;
      case "large":
        baseStyle.height = 56;
        baseStyle.paddingHorizontal = SPACING.xl;
        break;
      default:
        baseStyle.height = 48;
        baseStyle.paddingHorizontal = SPACING.lg;
    }

    // Flex width for modal layouts
    if (flex) {
      baseStyle.flex = 1;
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.backgroundColor = t.bg.alt;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = t.border.base;
        break;
      case "outline":
        baseStyle.backgroundColor = "transparent";
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = t.primary;
        break;
      default:
        baseStyle.backgroundColor = t.primary;
    }

    // Disabled/loading styles
    if (disabled || loading) {
      baseStyle.opacity = 0.5;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
    };

    // Size styles
    switch (size) {
      case "small":
        baseStyle.fontSize = 14;
        break;
      case "large":
        baseStyle.fontSize = 18;
        break;
      default:
        baseStyle.fontSize = 16;
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle.color = t.text.primary;
        break;
      case "outline":
        baseStyle.color = t.primary;
        break;
      default:
        baseStyle.color = t.bg.base; // White text on primary background
    }

    return baseStyle;
  };

  return (
    <Pressable
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      disabled={disabled || loading}
      android_ripple={{
        color:
          variant === "primary" ? "rgba(255, 255, 255, 0.2)" : t.primarySoft,
      }}
    >
      {icon && !loading && (
        <Text style={[styles.icon, { color: getTextStyle().color }]}>
          {icon}
        </Text>
      )}

      {loading && (
        <Text style={[styles.icon, { color: getTextStyle().color }]}>⏳</Text>
      )}

      <Text style={[styles.text, getTextStyle()]}>
        {loading ? "Loading..." : title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
  },
  text: {
    // Text will be flexible when there's an icon
  },
  icon: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
});

export default BulkImportActionButton;
