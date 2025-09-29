import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  visible: boolean;
  activeRoute: string;
  onNavigate: (route: string) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  visible,
  activeRoute,
  onNavigate,
  onClose,
}) => {
  const t = useAppTheme();

  if (!visible) return null;

  const navItems = [
    { key: "home", label: "Home", icon: "⌂", route: "/home/Home" },
    { key: "library", label: "Library", icon: "⛃", route: "/library/LibPage" },
    {
      key: "deck",
      label: "Decks",
      icon: "❐",
      route: "/deck/DeckPage",
      badge: "3",
    },
    { key: "want", label: "Want", icon: "☰", route: "/want/WantPage" },
    {
      key: "passe",
      label: "Passe",
      icon: "→",
      route: "/passe/PassePage",
      badge: "1",
    },
  ];

  const secondaryItems = [
    {
      key: "profile",
      label: "Profile",
      icon: "👤",
      route: "/usuario/UserPage",
    },
  ];

  const handleNavigate = (route: string) => {
    onNavigate(route);
    onClose(); // Close sidebar after navigation
  };

  return (
    <View style={styles.overlay}>
      {/* Sidebar positioned on LEFT */}
      <SafeAreaView
        style={[
          styles.sidebar,
          {
            backgroundColor: t.bg.base,
            borderRightColor: `${t.border.base}30`,
          },
        ]}
        edges={["top", "bottom", "left"]}
      >
        <View style={styles.header}>
          <SidebarLogo />
          <Pressable
            onPress={onClose}
            style={[styles.closeButton, { backgroundColor: `${t.primary}20` }]}
            android_ripple={{ color: t.primarySoft }}
          >
            <Text style={[styles.closeIcon, { color: t.text.primary }]}>×</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.navSection}>
            {navItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={activeRoute.includes(item.key)}
                badge={item.badge}
                onPress={() => handleNavigate(item.route)}
              />
            ))}
          </View>

          <View
            style={[styles.divider, { borderTopColor: `${t.border.base}30` }]}
          />

          <View style={styles.navSection}>
            {secondaryItems.map((item) => (
              <SidebarItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={activeRoute.includes(item.key)}
                onPress={() => handleNavigate(item.route)}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Scrim - clickable backdrop on RIGHT side */}
      <Pressable
        style={[styles.scrim, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        onPress={onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: "row", // Sidebar LEFT, scrim RIGHT
  },
  sidebar: {
    width: 280,
    height: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 18,
    borderRightWidth: 1,
  },
  scrim: {
    flex: 1, // Takes remaining space to the right
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  navSection: {
    gap: SPACING.xs,
  },
  divider: {
    borderTopWidth: 1,
    marginVertical: SPACING.lg,
    marginHorizontal: SPACING.sm,
  },
});

export default Sidebar;
