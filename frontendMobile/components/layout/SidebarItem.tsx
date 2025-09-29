import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  badge?: string | number;
  onPress?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  badge,
  onPress,
}) => {
  const t = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: t.primarySoft }}
      style={[
        styles.item,
        {
          backgroundColor: active ? t.primary : "transparent",
        },
      ]}
    >
      <Text style={[styles.icon, { color: active ? "#FFFFFF" : t.text.muted }]}>
        {icon}
      </Text>
      <Text
        style={[
          styles.label,
          {
            color: active ? "#FFFFFF" : t.text.primary,
            fontWeight: active ? "700" : "600",
          },
        ]}
      >
        {label}
      </Text>
      {badge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: active ? "rgba(255,255,255,0.3)" : t.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: active ? "#FFFFFF" : "#FFFFFF",
                fontWeight: "700",
              },
            ]}
          >
            {badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.md,
  },
  icon: {
    fontSize: 24,
    width: 24,
    textAlign: "center",
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});

export default SidebarItem;
