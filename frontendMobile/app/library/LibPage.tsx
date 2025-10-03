import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import Sidebar from "../../components/layout/Sidebar";
import SearchBar from "../../components/search/SearchBar";
import Chip from "../../components/common/Chip";
import KpiTile from "../../components/cards/KpiTile";
import ColorBreakdownList from "../../components/charts/ColorBreakdownList";
import FilterPanel from "../../components/filter/FilterPanel";
import { FilterState } from "../../components/filter/types";
import CollectionCardList from "./CollectionCardList";
import CollectionCard from "../../types/cardTypes";
import SearchModal from "@/components/search/SearchModal";

type TabMode = "stats" | "cards";

const MOCK_CARDS: CollectionCard[] = [
  {
    id: "elite-vanguard",
    name: "Elite Vanguard",
    typeLine: "Creature • 2/2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsj8YItmce4MAo22c2f43eDXoSfHSKLo7IOy_PiGuZBrsNuSlumYJG4fSjBIvs020LWQ2I5OC8uTRYMf8VRr1rRd4vp6jfjvfhmyPoYlM6R6gaX5P0H6l-YvkY_FIFxp_BZQ-rM8_cBO0yy4ue1BlKyuthTTpfqe0O3dRsavb7RIxzI-Ba_sEeCRCwIHOq_5A7EvFkvMY5ot7oaP4P2J3I3VWp_S7VhP4vA4rBwrDltHKBBfqBRll4e2UabAwvLTVtvajleQz2bSjm",
  },
  {
    id: "counterspell",
    name: "Counterspell",
    typeLine: "Instant",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzSfFYdJgzwjDZuCcYUigDlrjvk10o93Htq_2FD-2H8L6fk3J_5UN6227FZM530ii2qcFtuUsLzvvB9Kcldg4eD367wvn1SVGw55EWC_yOGiNyYkvjEmQds2VAmRCb6rHn-Rc5LeR1Co-CXyMFY9vI01ckHiXe0dM7XaRGfHyrsBnj5Q__NzLPnlJTjVI-hjy8y8RIKpdGu9Uczb6ZBFGy3IleqytE1gRCCQQ3Quz33BMoftt1vobBFbJuemPsoPPN6hlxjm7TFLUB",
  },
  {
    id: "lightning-bolt",
    name: "Lightning Bolt",
    typeLine: "Sorcery",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjTvuylPFrseC-fREXgYuPMhLzw0cdiY-ligeBo07gVRgVPGc5Scwy3gj1ibax67jboQAyRvtwTONm4Wn4CdqgNSMeuLu9zXQ9jtBxtU42aKoKgb1eF0M7-V3_jQvO440xqF03GgbQocR-E8Zpdn1xQIeNms81mnD79uT9P-KHqHgAvv5LaJyhecYs4FgdaGdmeYi6bwv60Y1kiBYPx7ysv67oIu5QE8J5d1CRsn_680GNfTsUAybEIUKEhaukL9SZjv8SIjw-Nc62",
  },
  {
    id: "pacifism",
    name: "Pacifism",
    typeLine: "Enchantment",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqdMp9imbCRwYyc8LsUr-NiUvqu4G1_WvAXVJ4_WOEp2_aYPtrD1DYWE89Ijgm28LA3tv6dH-5JJdoSHLTQoFPaT9W7NaHLTw88EnA6eBPVIc4Ki5lx1vm3TZbjRd6RGFC0hJjTZLjW16fBHv30HCuRYtwNkZmwIuOvGB7liHcX41uFpYEfGo_mx90BDvDy3Hw0wtgdCPkbVvOxz8FcjqhP7w_zuYvqqObZSzGMa2GvcQpX2CYYGcLDFmcof_IuNmkETU_W5rcsL7",
  },
  {
    id: "sol-ring",
    name: "Sol Ring",
    typeLine: "Artifact",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJMb0zX26mwDJuDVRghwNoI9eI7w3yeSljmLy-qlvMbeJlufxq7qgvl3ZInQapb393eqWdRvCqtr6qY2vfOeQRRbJOUMyiqUvjayq2VCjrCf8Blyszdu3G5XPcksKCMuFZcfGGyy56jhs_omv0FYUAPtVplwHL3o5F2RWhvJaoeeE1d5TCAnpNayYYZI1fcXH0iWkJiIfBJjfuzaUU_POwYQoGvyQDnpr3ixQWuazQQ3XZIUYJsYhrg0NPsXKml8gBi_tY37B8V",
  },
];

const LibContent: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [tab, setTab] = useState<TabMode>("stats");
  const [query, setQuery] = useState("");
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    types: [],
    sets: [],
    rarity: [],
    cmc: { min: 0, max: 20 },
  });
  const [panelVisible, setPanelVisible] = useState(false);
  const [cards, setCards] = useState<CollectionCard[]>(MOCK_CARDS);

  const colors = useMemo(
    () => [
      { label: "White", percent: 60 },
      { label: "Blue", percent: 70 },
      { label: "Black", percent: 10 },
      { label: "Red", percent: 90 },
      { label: "Green", percent: 50 },
      { label: "Colorless", percent: 60 },
    ],
    []
  );

  const handleSearchPress = () => {
    console.log("Search button pressed!"); // Debug log
    setSearchModalVisible(true);
  };

  const handleSearchClose = () => {
    setSearchModalVisible(false);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement your search logic here
    // For now, let's just close the modal after search
    setSearchModalVisible(false);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleRemoveCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const renderStatsView = () => (
    <ScrollView
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.chipsRow}>
        <Chip
          label="Stats"
          active={tab === "stats"}
          onPress={() => setTab("stats")}
        />
        <Chip
          label="Cards"
          active={tab === "cards"}
          onPress={() => setTab("cards")}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
          Overview
        </Text>
        <View style={styles.kpiGrid}>
          <KpiTile label="Total Cards" value={cards.length.toString()} />
          <KpiTile label="Total Value" value="$850" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
          Breakdown by Color
        </Text>
        <ColorBreakdownList data={colors} />
      </View>
    </ScrollView>
  );

  const renderCardsViewHeader = () => (
    <View style={{ paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md }}>
      <View style={[styles.chipsRow, { marginTop: SPACING.md }]}>
        <Chip
          label="Stats"
          active={tab === "stats"}
          onPress={() => setTab("stats")}
        />
        <Chip
          label="Cards"
          active={tab === "cards"}
          onPress={() => setTab("cards")}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top", "left", "right"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar
          title="Library"
          onMenuPress={handleMenuPress}
          onActionPress={() => console.log("Action")}
          onSearchPress={handleSearchPress}
        />

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/library/LibPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
        <SearchModal
          visible={searchModalVisible}
          onClose={handleSearchClose}
          onSearch={handleSearch}
          placeholder="Search cards..."
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </View>
    </SafeAreaView>
  );
};

const LibPage: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <LibContent />
    </ThemeProvider>
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  scroll: {
    padding: SPACING.lg,
    paddingBottom: 20,
    gap: SPACING.xl,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  section: {
    gap: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  kpiGrid: {
    flexDirection: "row",
    gap: SPACING.md,
  },
});

export default LibPage;
