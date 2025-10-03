import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import MatchOptionCard from "./components/MatchOptionCard";
import ProgressIndicator from "./components/ProgressIndicator";
import ActionButton from "../../components/common/ActionButton";
import { MatchType } from "../../types/matchTypes";
import Sidebar from "@/components/layout/Sidebar";
import { useActiveUser } from "../../context/ActiveUserContext";
import { useMatches } from "../../dataHooks/matchHook";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MatchStartInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const { user } = useActiveUser();
  const { loadMatches, loading } = useMatches();
  const [selectedType, setSelectedType] = useState<MatchType | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleContinue = async () => {
    if (selectedType && user?.id) {
      console.log("[MatchStart] Starting match with:", {
        userId: user.id,
        type: selectedType,
      });
      try {
        const matchResults = await loadMatches(user.id, selectedType);
        console.log("[MatchStart] Received match results:", matchResults);
        console.log("[MatchStart] Match results length:", matchResults.length);

        const resultsJson = JSON.stringify(matchResults);
        const maxUrlLength = 6000; // Conservative limit for cross-platform compatibility

        if (resultsJson.length < maxUrlLength) {
          // Small dataset: use URL params
          const encodedResults = encodeURIComponent(resultsJson);
          router.push(
            `/match/MatchResults?type=${selectedType}&results=${encodedResults}`
          );
        } else {
          // Large dataset: use AsyncStorage
          const storageKey = `match-results-${Date.now()}`;
          await AsyncStorage.setItem(storageKey, resultsJson);
          router.push(
            `/match/MatchResults?type=${selectedType}&storageKey=${storageKey}`
          );
        }
      } catch (error) {
        console.error("[MatchStart] Failed to load matches:", error);
        Alert.alert("Error", "Failed to load matches. Please try again.", [
          { text: "OK" },
        ]);
      }
    }
  };

  if (!user) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Match" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary }}>
            Selecione um usuário primeiro.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
              active={selectedType === "passe"}
              onPress={() => setSelectedType("passe")}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ActionButton
            title={loading ? "Loading..." : "Continue"}
            onPress={handleContinue}
            disabled={!selectedType || loading}
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
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <MatchStartInner />
    </ThemeProvider>
  </>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
});

export default MatchStart;
