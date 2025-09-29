import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import MatchOptionCard from "./components/MatchOptionCard";
import ProgressIndicator from "./components/ProgressIndicator";
import ActionButton from "../../components/common/ActionButton";
import { MatchType } from "../../types/matchTypes";
import Sidebar from "@/components/layout/Sidebar";

const MatchStartInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<MatchType | null>(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleContinue = () => {
    if (selectedType) {
      router.push(`/match/MatchResults?type=${selectedType}`);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="Match" onMenuPress={handleMenuPress} />

        <ProgressIndicator currentStep={1} totalSteps={3} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text.primary }]}>
              What do you want to do?
            </Text>
            <Text style={[styles.subtitle, { color: t.text.muted }]}>
              Choose the direction of the match.
            </Text>
          </View>

          <View style={styles.options}>
            <MatchOptionCard
              title="I want"
              subtitle="My Wants vs Others' Passes"
              active={selectedType === "want"}
              onPress={() => setSelectedType("want")}
            />
            <MatchOptionCard
              title="I offer"
              subtitle="My Passes vs Others' Wants"
              active={selectedType === "offer"}
              onPress={() => setSelectedType("offer")}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ActionButton
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedType}
          />
        </View>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/match/MatchStart"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const MatchStart: React.FC = () => (
  <ThemeProvider forceDark>
    <MatchStartInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: SPACING.sm,
  },
  options: {
    gap: SPACING.lg,
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: 100, // Space for bottom nav
  },
});

export default MatchStart;
