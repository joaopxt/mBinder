import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import { searchAllCards, SearchResult } from "../../services/libraryService";
import Sidebar from "@/components/layout/Sidebar";

const SearchResultsInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ query: string }>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      if (!params.query) {
        setLoading(false);
        return;
      }

      try {
        console.log(`[SearchResults] Loading results for: "${params.query}"`);
        const searchResults = await searchAllCards(params.query);
        setResults(searchResults);
      } catch (error) {
        console.error("[SearchResults] Failed to load results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [params.query]);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleCardPress = (card: SearchResult) => {
    //router.push(`/components/carta/CartaPage?cardId=${card.id}`);
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <Pressable
      style={[styles.cardItem, { backgroundColor: t.bg.alt }]}
      onPress={() => handleCardPress(item)}
      android_ripple={{ color: t.primarySoft }}
    >
      <Image
        source={{
          uri:
            item.imageSmall ||
            item.imageNormal ||
            "https://placehold.co/146x204?text=Card",
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardInfo}>
        <Text style={[styles.cardName, { color: t.text.primary }]}>
          {item.name}
        </Text>
        {item.typeLine && (
          <Text style={[styles.typeLine, { color: t.text.muted }]}>
            {item.typeLine}
          </Text>
        )}
        {item.setName && (
          <Text style={[styles.setName, { color: t.text.muted }]}>
            {item.setName}
          </Text>
        )}
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar
          title="Search Results"
          onMenuPress={handleMenuPress}
          showBack
          onBackPress={() => router.back()}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Searching...
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
          title={`Search: "${params.query}"`}
          onMenuPress={handleMenuPress}
          showBack
          onBackPress={() => router.back()}
        />

        <View style={styles.content}>
          <Text style={[styles.subtitle, { color: t.text.muted }]}>
            Found {results.length} card{results.length !== 1 ? "s" : ""}
          </Text>

          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/search/SearchResults"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const SearchResults: React.FC = () => (
  <ThemeProvider forceDark>
    <SearchResultsInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  list: {
    gap: SPACING.sm,
    paddingBottom: 100,
  },
  cardItem: {
    flexDirection: "row",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  cardImage: {
    width: 60,
    height: 84,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  typeLine: {
    fontSize: 14,
    marginBottom: 2,
  },
  setName: {
    fontSize: 12,
  },
});

export default SearchResults;
