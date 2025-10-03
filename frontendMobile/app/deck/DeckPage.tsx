import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import DeckList from "./components/DeckList";
import { Deck } from "../../types/deckTypes";
import Fab from "../../components/common/Fab";
import Sidebar from "../../components/layout/Sidebar";
import { FilterState } from "@/components/filter/types";
import SearchModal from "@/components/search/SearchModal";

const mockDecks: Deck[] = [
  {
    id: "blue-control",
    name: "Blue Control",
    cardCount: 60,
    image: "",
  },
  {
    id: "red-aggro",
    name: "Red Aggro",
    cardCount: 60,
    image: "",
  },
  {
    id: "green-ramp",
    name: "Green Ramp",
    cardCount: 60,
    image: "",
  },
];

const DeckInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>(mockDecks);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    types: [],
    sets: [],
    rarity: [],
    cmc: { min: 0, max: 20 },
  });

  const handleDeckPress = useCallback(
    (deck: Deck) => {
      router.push(`/deck/DeckDetail?id=${deck.id}`);
    },
    [router]
  );

  const handleAddDeck = () => {
    console.log("Add new deck (to implement)");
  };

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSearchPress = () => {
    setSearchModalVisible(true);
  };

  const handleSearchClose = () => {
    setSearchModalVisible(false);
  };

  const handleSearch = (query: string) => {
    console.log("Searching wants for:", query);
    // Implement search logic for wants
    setSearchModalVisible(false);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Want filters changed:", newFilters);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar
          title="Decks"
          onMenuPress={handleMenuPress}
          onSearchPress={handleSearchPress}
        />
        <DeckList
          data={decks}
          onDeckPress={handleDeckPress}
          contentBottomPad={140}
        />
        <Fab onPress={handleAddDeck} label="Add" icon="+" />
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/deck/DeckPage"
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

const DeckPage: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <DeckInner />
    </ThemeProvider>
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, position: "relative" },
});

export default DeckPage;
