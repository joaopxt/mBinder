import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import TradeCardDisplay from "./components/TradeCardDisplay";
import ActionButton from "../../components/common/ActionButton";
import { TradeCard, MatchType } from "../../types/matchTypes";
import Sidebar from "@/components/layout/Sidebar";

const mockCards: TradeCard[] = [
  {
    id: "ancient-tomb",
    name: "Ancient Tomb",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjIJmqjXdmFwBb0w4VFVGtNUdtBSC_KwLbs7qz90FDJGaQpOhpD4_a6BSQBCA03MqCOpzbBHNGtWShlqCSlizQa6Iy3RE6_lTltsZ3aUJxYMNYMyajUpo3B0Pw6c5oS6LWwNDLG1KojAh4H_sonWAAAAnctP6PpYJPbUoX5mOMAaoclLViybfb7UxkmQrcqrb3aa0qjBRdd6t_ihf8BUBZnGYcYdUMD4Hc94BOoYiRowO8ML0RXl_Hdrgx40KqBdWk9Zk_iSraSv9Y",
    type: "Land",
    rarity: "Rare",
  },
  {
    id: "lightning-bolt",
    name: "Lightning Bolt",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrJXrGXm5ihH9H5uG63EMIsfJDNznJyrN0pCezVs3cfcbES2KVLCPMiZhyWrFCRISAFxCZplJBF1viOTV5OHxyKpiXS3LtoWiznzXaEIY7WQi9poUsv_94b8kzFBErAa0pM7iA_ocTIakJN0aRY7smaD5oAwUYELuQ0rrfTsel0fJL7zixvE680pq2I9hcqVYJIQ8vNKaa32hlc8Bqr_-hPv6eUFnkOKdGlvxPpxXL9LfhanAmMc9HvjDcqMOEUR3jKUqpfNmlaUu1",
    type: "Instant",
    rarity: "Uncommon",
  },
];

const TradePairInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ userId: string; type: MatchType }>();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleMarkTrade = () => {
    console.log("Mark potential trade");
    // Implement trade marking logic
  };

  const handleContact = () => {
    console.log("Contact user");
    // Implement contact/chat logic
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="Trade Pair" onMenuPress={handleMenuPress} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cards}>
            {mockCards.map((card) => (
              <TradeCardDisplay key={card.id} card={card} />
            ))}
          </View>

          <View style={styles.actions}>
            <ActionButton
              title="Mark Potential Trade"
              onPress={handleMarkTrade}
            />
            <ActionButton
              title="Chat / Contact"
              onPress={handleContact}
              variant="secondary"
            />
          </View>
        </ScrollView>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/match/TradePair"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const TradePair: React.FC = () => (
  <ThemeProvider forceDark>
    <TradePairInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: 120, // Space for bottom nav
  },
  cards: {
    gap: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  actions: {
    gap: SPACING.md,
  },
});

export default TradePair;
