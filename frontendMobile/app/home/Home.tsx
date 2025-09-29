import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import StatsGrid from "../../components/stats/StatsGrid";
import QuickActionsCard from "../../components/cards/QuickActionsCard";
import TradeCTA from "../../components/cards/TradeCTA";
import Sidebar from "@/components/layout/Sidebar";

const HomeInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleStartMatch = () => {
    router.push("/match/MatchStart");
  };

  const handleFindMatch = () => {
    router.push("/match/MatchStart");
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="mBinder" onMenuPress={handleMenuPress} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <StatsGrid want={15} passe={28} decks={6} />

          <QuickActionsCard
            onAddWant={() => router.push("/library/LibPage")}
            onAddPasse={() => router.push("/deck/DeckPage")}
            onMatch={() => router.push("/match/MatchStart")}
          />

          <TradeCTA onMatch={() => router.push("/match/MatchStart")} />
        </ScrollView>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/home/Home"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const Home: React.FC = () => (
  <ThemeProvider forceDark>
    <HomeInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: 120,
    gap: SPACING.xl,
  },
  greeting: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: SPACING.sm,
  },
});

export default Home;
