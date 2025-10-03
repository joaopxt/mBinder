import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import CardImage from "./components/CardImage";
import CardInfoSection from "./components/CardInfoSection";
import AddToListSection from "./components/AddToListSection";
import { getCardById } from "../../services/libraryService";
import { SearchResult } from "../../services/libraryService";
import { FilterState } from "@/components/filter/types";
import SearchModal from "@/components/search/SearchModal";
import Sidebar from "@/components/layout/Sidebar";

const CartaPageInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ cardId: string }>();

  const [card, setCard] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    types: [],
    sets: [],
    rarity: [],
    cmc: { min: 0, max: 20 },
  });

  const handleMenuPress = useCallback(() => {
    setSidebarVisible((prev) => !prev);
  }, []);

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

  const handleNavigate = useCallback(
    (route: string) => {
      setSidebarVisible(false);
      router.push(route as any);
    },
    [router]
  );

  useEffect(() => {
    const loadCard = async () => {
      if (!params.cardId) {
        setLoading(false);
        return;
      }

      try {
        console.log(`[CartaPage] Loading card with ID: ${params.cardId}`);
        const cardData = await getCardById(params.cardId);
        setCard(cardData);
        setSelectedSet(cardData?.setName || "");
      } catch (error) {
        console.error("[CartaPage] Failed to load card:", error);
        Alert.alert("Error", "Failed to load card details");
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [params.cardId]);

  const handleAddToList = async (listType: "want" | "passe") => {
    if (!card) return;

    try {
      // TODO: Implement add to list functionality
      console.log(`[CartaPage] Adding ${card.name} to ${listType} list`);
      Alert.alert("Success", `Card added to ${listType} list!`);
    } catch (error) {
      console.error(`[CartaPage] Failed to add card to ${listType}:`, error);
      Alert.alert("Error", `Failed to add card to ${listType} list`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar
          title="Card Details"
          showBack
          onBackPress={() => router.back()}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Loading card...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!card) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar
          title="Card Details"
          showBack
          onBackPress={() => router.back()}
        />
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: t.text.primary }]}>
            Card not found
          </Text>
          <Text style={[styles.errorSubtext, { color: t.text.muted }]}>
            The requested card could not be loaded
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
        <HeaderBar
          title={card.name}
          onMenuPress={handleMenuPress}
          onSearchPress={handleSearchPress}
        />

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <CardImage
            imageUrl={card.imageNormal || card.imageSmall}
            cardName={card.name}
          />

          <CardInfoSection
            card={card}
            selectedSet={selectedSet}
            onSetChange={setSelectedSet}
          />

          <AddToListSection onAddToList={handleAddToList} />
        </ScrollView>
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/carta/CartaPage"
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

const CartaPage: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <CartaPageInner />
    </ThemeProvider>
  </>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl, // Extra padding at bottom
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default CartaPage;
