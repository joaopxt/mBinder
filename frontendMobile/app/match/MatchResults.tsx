import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import { MatchType } from "../../types/matchTypes";
import Sidebar from "@/components/layout/Sidebar";
import { MatchCardResult } from "../../services/matchService";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserMatch {
  usuario: string;
  cards: MatchCardResult[]; // Changed from string[] to MatchCardResult[]
  totalCards: number;
}

const UserMatchItem: React.FC<{
  match: UserMatch;
  matchType: MatchType;
  onPress: (match: UserMatch) => void;
}> = ({ match, matchType, onPress }) => {
  const t = useAppTheme();

  // Show first 5 cards, then "..." if there are more
  const displayCards = match.cards.slice(0, 5);
  const hasMoreCards = match.cards.length > 5;

  return (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: t.bg.alt }]}
      onPress={() => onPress(match)}
      activeOpacity={0.7}
    >
      <View style={styles.userHeader}>
        <Text style={[styles.userName, { color: t.text.primary }]}>
          {match.usuario}
        </Text>
        <Text style={[styles.cardCount, { color: t.text.muted }]}>
          {match.totalCards} card{match.totalCards !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.cardsList}>
        {displayCards.map((card, index) => (
          <View
            key={index}
            style={[styles.cardChip, { backgroundColor: t.bg.base }]}
          >
            <Text style={[styles.cardName, { color: t.text.primary }]}>
              {card.name}
            </Text>
          </View>
        ))}
        {hasMoreCards && (
          <View
            style={[
              styles.cardChip,
              styles.moreChip,
              { backgroundColor: t.bg.base },
            ]}
          >
            <Text style={[styles.cardName, { color: t.text.muted }]}>
              +{match.totalCards - 5} more...
            </Text>
          </View>
        )}
      </View>

      <View style={styles.tapHint}>
        <Text style={[styles.tapHintText, { color: t.text.muted }]}>
          Tap to view trade details
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MatchResultsInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    type: MatchType;
    results?: string;
    storageKey?: string;
  }>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [matches, setMatches] = useState<MatchCardResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Load matches from URL or AsyncStorage
  useEffect(() => {
    const loadMatches = async () => {
      try {
        let matchData: MatchCardResult[] = [];

        if (params.results) {
          // Small dataset from URL
          matchData = JSON.parse(decodeURIComponent(params.results));
          console.log("[MatchResults] Loaded matches from URL:", matchData);
        } else if (params.storageKey) {
          // Large dataset from AsyncStorage
          const storedData = await AsyncStorage.getItem(params.storageKey);
          if (storedData) {
            matchData = JSON.parse(storedData);
            console.log(
              "[MatchResults] Loaded matches from AsyncStorage:",
              matchData
            );
            // Clean up storage after loading
            AsyncStorage.removeItem(params.storageKey);
          }
        }

        setMatches(matchData);
      } catch (error) {
        console.error("[MatchResults] Failed to load matches:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [params.results, params.storageKey]);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleUserMatchPress = async (userMatch: UserMatch) => {
    try {
      // Store the selected user match data for TradePair
      const tradeData = {
        traderUser: userMatch.usuario,
        matchType: params.type,
        totalCards: userMatch.totalCards,
        // Store the full card objects with images
        allMatches: userMatch.cards,
      };

      const tradeJson = JSON.stringify(tradeData);
      const storageKey = `trade-pair-${Date.now()}`;

      await AsyncStorage.setItem(storageKey, tradeJson);

      router.push(`/match/TradePair?storageKey=${storageKey}`);
    } catch (error) {
      console.error("[MatchResults] Failed to navigate to trade pair:", error);
    }
  };

  // Group matches by user
  const userMatches: UserMatch[] = useMemo(() => {
    if (!matches || matches.length === 0) {
      return [];
    }

    const grouped: { [usuario: string]: MatchCardResult[] } = {};

    matches.forEach((match) => {
      if (!grouped[match.usuario]) {
        grouped[match.usuario] = [];
      }
      grouped[match.usuario].push(match);
    });

    return Object.entries(grouped)
      .map(([usuario, cards]) => ({
        usuario,
        cards,
        totalCards: cards.length,
      }))
      .sort((a, b) => b.totalCards - a.totalCards);
  }, [matches]);

  const renderUserMatch = ({ item }: { item: UserMatch }) => (
    <UserMatchItem
      match={item}
      matchType={params.type!}
      onPress={handleUserMatchPress}
    />
  );

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Match Results" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Loading results...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (userMatches.length === 0) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Match Results" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            No matches found.
          </Text>
          <Text
            onPress={() => router.back()}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Try Again
          </Text>
        </View>
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/match/MatchResults"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="Match Results" onMenuPress={handleMenuPress} />

        <View style={styles.content}>
          <Text style={[styles.title, { color: t.text.primary }]}>
            Found {userMatches.length} potential trade
            {userMatches.length !== 1 ? "s" : ""}
          </Text>
          <Text style={[styles.subtitle, { color: t.text.muted }]}>
            {params.type === "want"
              ? "Users with cards you want"
              : "Users who want your cards"}
          </Text>

          <FlatList
            data={userMatches}
            keyExtractor={(item) => item.usuario}
            renderItem={renderUserMatch}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/match/MatchResults"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const MatchResults: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <MatchResultsInner />
    </ThemeProvider>
  </>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  list: {
    gap: SPACING.md,
    paddingBottom: 100,
  },
  userCard: {
    padding: SPACING.md,
    borderRadius: 12,
    gap: SPACING.sm,
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  cardsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  cardChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  cardName: {
    fontSize: 12,
    fontWeight: "500",
  },
  moreChip: {
    opacity: 0.7,
  },
  tapHint: {
    marginTop: SPACING.xs,
    alignItems: "center",
  },
  tapHintText: {
    fontSize: 11,
    fontStyle: "italic",
  },
});

export default MatchResults;
