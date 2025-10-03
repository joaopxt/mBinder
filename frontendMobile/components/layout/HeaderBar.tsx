import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";

interface HeaderBarProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  onActionPress?: () => void;
  actionIcon?: string;
  onMenuPress?: () => void;
  menuIcon?: string;
  showMenu?: boolean;
  showSearch?: boolean; // New prop to show/hide search icon
  onSearchPress?: () => void; // New prop for search action
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showBack,
  onBackPress,
  onActionPress,
  actionIcon = "✏",
  onMenuPress,
  menuIcon = "≡",
  showMenu = true,
  showSearch = true,
  onSearchPress,
}) => {
  const t = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor:
            t.mode === "dark" ? "rgba(35,25,15,0.7)" : "rgba(248,247,245,0.7)",
          borderBottomColor: t.border.base,
        },
      ]}
    >
      <View style={styles.leftGroup}>
        {/* Menu ALWAYS first */}
        <Pressable
          onPress={onMenuPress}
          style={styles.button}
          android_ripple={{ color: t.primarySoft }}
        >
          <Text style={[styles.icon, { color: t.text.primary }]}>
            {menuIcon}
          </Text>
        </Pressable>

        {showBack && (
          <Pressable
            onPress={onBackPress}
            style={styles.button}
            android_ripple={{ color: t.primarySoft }}
          >
            <Text style={[styles.icon, { color: t.text.primary }]}>←</Text>
          </Pressable>
        )}
      </View>

      <Text style={[styles.title, { color: t.text.primary }]} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.rightGroup}>
        {/* Search icon */}
        {showSearch && (
          <Pressable
            onPress={onSearchPress}
            style={styles.button}
            android_ripple={{ color: t.primarySoft }}
          >
            <Text style={[styles.icon, { color: t.text.primary }]}>🔍</Text>
          </Pressable>
        )}

        {/* Action button */}
        {onActionPress && (
          <Pressable
            onPress={onActionPress}
            style={styles.button}
            android_ripple={{ color: t.primarySoft }}
          >
            <Text style={[styles.icon, { color: t.text.primary }]}>
              {actionIcon}
            </Text>
          </Pressable>
        )}

        {/* Keep spacing symmetry if no buttons */}
        {!showSearch && !onActionPress && <View style={styles.button} />}
      </View>
    </View>
  );
};

const BUTTON_SIZE = 40;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: SPACING.sm,
  },
  icon: {
    fontSize: 20,
    fontWeight: "700",
  },
});

export default HeaderBar;
