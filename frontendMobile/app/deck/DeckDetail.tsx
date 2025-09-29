import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import DeckStats from "./components/DeckStats";
import ManaCurveChart from "./components/ManaCurveChart";
import DeckCardGrid from "./components/DeckCardGrid";
import { DeckDetail as DeckDetailType, DeckCard } from "../../types/deckTypes";
import Sidebar from "@/components/layout/Sidebar";

const mockDeckDetail: DeckDetailType = {
  id: "blue-control",
  name: "The Blue Tide",
  description: "A control deck focused on card advantage.",
  totalCards: 60,
  colors: ["Blue"],
  manaCurve: [2, 4, 8, 6, 3, 1],
  cards: [
    {
      id: "counterspell",
      name: "Counterspell",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCBR-61lsmDFeTS97RoUo_h7F-zSm_a0Vmq1-v59hBttaXCxr_Oga83TAY0ohEn05lmBBelORl_MFvCTlAq2Hgmbu4ZmVrr9j_LuSv-Rm9-rs86VPq99TJcFUlP-b6oZcj44SVFnffzwx1N0hRPGH5UqExiqtKtkM9iVbAHg1nbfqwPfSbfypsGNYC8nEkr3WY6-lJK9mxlikY6gObd1JXe_IaF5Zu4AQWTa2zc23e5-n-OgLtO6CSaAMawjeMo8A6_uUNkiAifxEdJ",
      quantity: 4,
    },
    {
      id: "brainstorm",
      name: "Brainstorm",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPynkX8FUXbxQCVRtuO-q7BtTdT68DiUSerwTz5u8Ovz5oMT4Eq0ANHBfBDcMimp0PTl6t0pBsY7HMRbguZPBcQLo3h5HJTQVoZ2WkHRCjiC6HhopnzYwBQj8hxSM89oFE9jIz8zzWM8dDKQV3bzen2apJ4Rzj1gZET-C30zMc22hZP-55VPOp-NY-0FHp_3h08qgnwIZlIo9QrKuD6PfMPEiFQ-S4QvY25h4cpBiUQJnhMnkbz-8kmL7HUohf4DU51XU6lgtTkoPM",
      quantity: 4,
    },
    {
      id: "force-of-will",
      name: "Force of Will",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDxAaZpHvI9ufdjc_x9k6jf1I-7vadyJKOS6VVqHgWplDBfFhm6QhXDZmA20TQyEAUYuw1rPX1rtwzdJA3co_AXAnxz4WDsSJ2WsVISQuurpBJXdPAFVW0wCSQ_4JkMv-cvlprS-oFp70YJRxbHZooR82y1bCgtiVZaoVGBE0-F9poyY3V2qzmJy36lB2zfBkDTyDkYc9MNiBVt4LOuOVCmXDPM41dymuzGtho7Cu0_gKkih37PN0j_CHSPLNtL8zrA2HOw0fidvoh3",
      quantity: 2,
    },
    {
      id: "jace-the-mind-sculptor",
      name: "Jace, the Mind Sculptor",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDgdcSIknUJYDIIHJT5mAWdOUzjbAqnLnQZSGTEKlQ9C-uI0GoYKMC6PfV4ENGK9O1najqlEkAvvOY_Fj_ywKhzDeKBvXTgdzVZbkQA-_yrpc6rbmaunoedortHWHaWqE9DU8oUYVS_-QtfyOrDhgujweycHcxewhd3hN4WzpDo1KTKcmvabql0u0_0xH1X579QMeB3TQ5LJMFKHgVxg7a60yhzzXQ8iQFq6c7rTxr-u9DLx2JwW8en6HbvzYoYDPAONxWlXHjT4lRj",
      quantity: 3,
    },
  ],
};

const DeckDetailInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  // In real app, fetch deck by params.id
  const deck = mockDeckDetail;

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    console.log("Edit deck (to implement)");
  };

  const handleCardPress = (card: DeckCard) => {
    console.log("Card pressed:", card.id);
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar
          title="Deck Details"
          onMenuPress={handleMenuPress}
          showBack
          onBackPress={handleBack}
          onActionPress={handleEdit}
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={[styles.deckTitle, { color: t.text.primary }]}>
              {deck.name}
            </Text>
            <Text style={[styles.description, { color: t.text.muted }]}>
              {deck.description}
            </Text>
          </View>

          <DeckStats totalCards={deck.totalCards} colors={deck.colors} />

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
              Mana Curve
            </Text>
            <ManaCurveChart data={deck.manaCurve} />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
              Cards in Deck
            </Text>
            <DeckCardGrid cards={deck.cards} onCardPress={handleCardPress} />
          </View>
        </ScrollView>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/deck/DeckPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const DeckDetailPage: React.FC = () => (
  <ThemeProvider forceDark>
    <DeckDetailInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  scroll: {
    padding: SPACING.lg,
    paddingBottom: 120,
    gap: SPACING.xl,
  },
  section: {
    gap: SPACING.md,
  },
  deckTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default DeckDetailPage;
