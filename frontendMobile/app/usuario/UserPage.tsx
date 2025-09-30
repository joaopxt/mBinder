import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import Sidebar from "../../components/layout/Sidebar";
import UserProfileHeader from "./_components/UserProfileHeader";
import UserStats from "./_components/UserStats";
import UserAccountForm from "./_components/UserAccountForm";

const UserPage: React.FC = () => {
  const t = useAppTheme();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleSidebarClose = () => {
    setSidebarVisible(false);
  };

  const handleNavigate = (route: string) => {
    // Navigation logic would go here
    console.log("Navigate to:", route);
    setSidebarVisible(false);
  };

  const handleSettingsPress = () => {
    // Settings logic would go here
    console.log("Settings pressed");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.bg.base }]}>
      <HeaderBar
        title="Profile"
        onMenuPress={handleMenuPress}
        onActionPress={handleSettingsPress}
        actionIcon="⚙"
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <UserProfileHeader />
        <UserStats />
        <UserAccountForm />
      </ScrollView>

      <Sidebar
        visible={sidebarVisible}
        activeRoute="/usuario/UserPage"
        onNavigate={handleNavigate}
        onClose={handleSidebarClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default UserPage;
