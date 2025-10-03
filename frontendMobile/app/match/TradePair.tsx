import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import { MatchType } from "../../types/matchTypes";
import { MatchCardResult } from "../../services/matchService";
import { TradeCard } from "../../types/cardTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUsuario } from "../../services/usuarioService";
import TradeCardGrid from "./components/TradeCardGrid";

interface TradeData {
  traderUser: string;
  matchType: MatchType;
  totalCards: number;
  allMatches: MatchCardResult[]; // Now contains full card objects with images
}

const ContactButton: React.FC<{
  traderUser: string;
  matchType: MatchType;
  onPress: () => void;
}> = ({ traderUser, matchType, onPress }) => {
  const t = useAppTheme();

  const buttonText = `Contact ${traderUser}`;

  return (
    <View style={styles.contactButtonContainer}>
      <TouchableOpacity
        style={[styles.contactButton, { backgroundColor: "#25D366" }]} // WhatsApp green
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.contactButtonText}>{buttonText}</Text>
        <Text style={styles.contactButtonSubtext}>via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const TradePairInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ storageKey: string }>();

  const [tradeData, setTradeData] = useState<TradeData | null>(null);
  const [traderPhone, setTraderPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load trade data from AsyncStorage
  useEffect(() => {
    const loadTradeData = async () => {
      try {
        if (!params.storageKey) {
          throw new Error("No storage key provided");
        }

        const storedData = await AsyncStorage.getItem(params.storageKey);
        if (!storedData) {
          throw new Error("No trade data found");
        }

        const parsedData: TradeData = JSON.parse(storedData);
        console.log("[TradePair] Loaded trade data:", parsedData);
        console.log("[TradePair] All matches:", parsedData.allMatches);
        setTradeData(parsedData);

        // Clean up storage
        AsyncStorage.removeItem(params.storageKey);

        // Fetch trader user info for phone number
        try {
          const traderInfo = await fetchUsuario(parsedData.traderUser);
          setTraderPhone(traderInfo.celular || null);
        } catch (userError) {
          console.warn("[TradePair] Could not fetch trader phone:", userError);
        }
      } catch (error) {
        console.error("[TradePair] Failed to load trade data:", error);
        setError("Failed to load trade information");
      } finally {
        setLoading(false);
      }
    };

    loadTradeData();
  }, [params.storageKey]);

  // Convert MatchCardResult objects to TradeCard objects - now with real images!
  const tradeCards: TradeCard[] = useMemo(() => {
    if (
      !tradeData ||
      !tradeData.allMatches ||
      tradeData.allMatches.length === 0
    ) {
      console.log("[TradePair] No trade data or matches available");
      return [];
    }

    console.log("[TradePair] Processing allMatches:", tradeData.allMatches);

    // Convert MatchCardResult to TradeCard - now includes real images
    const cards = tradeData.allMatches.map((match, index) => {
      console.log("[TradePair] Processing match with image:", match);

      return {
        id: match.id, // Use the actual card ID
        name: match.name, // Card name from match
        image: match.image, // Real image URL from match!
        set: match.set || "", // Set information if available
        usuario: match.usuario, // Keep user info for context
        tipo: match.tipo, // Keep match type for context
      };
    });

    console.log("[TradePair] Final trade cards with images:", cards);
    return cards;
  }, [tradeData]);

  const handleContactPress = async () => {
    if (!tradeData) return;

    if (!traderPhone) {
      Alert.alert(
        "Contact Info Missing",
        `No phone number available for ${tradeData.traderUser}. Please contact them through other means.`,
        [{ text: "OK" }]
      );
      return;
    }

    const actionText = tradeData.matchType === "want" ? "buy" : "sell";
    const message = `Hi! I have interest to ${actionText} some cards from your collection. I found some matches between our lists on mBinder app.`;

    // Format phone number for WhatsApp (remove non-digits and add country code if needed)
    const cleanPhone = traderPhone.replace(/\D/g, "");
    const whatsappPhone = cleanPhone.startsWith("55")
      ? cleanPhone
      : `55${cleanPhone}`;
    const whatsappUrl = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(
      message
    )}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback to web WhatsApp
        const webWhatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
          message
        )}`;
        await Linking.openURL(webWhatsappUrl);
      }
    } catch (error) {
      console.error("[TradePair] Failed to open WhatsApp:", error);
      Alert.alert(
        "Error",
        "Could not open WhatsApp. Please make sure it's installed or contact the user manually.",
        [{ text: "OK" }]
      );
    }
  };

  const handleCardPress = (card: TradeCard) => {
    console.log("Card pressed:", card);
    // Add card detail functionality here if needed
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Trade Details" onBackPress={() => router.back()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Loading trade details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !tradeData) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Trade Details" onBackPress={() => router.back()} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            {error || "No trade data available"}
          </Text>
          <Text
            onPress={() => router.back()}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Go Back
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
          title={`Trade with ${tradeData.traderUser}`}
          onBackPress={() => router.back()}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text.primary }]}>
              {tradeData.matchType === "want"
                ? "Cards You Want"
                : "Cards They Want"}
            </Text>
            <Text style={[styles.subtitle, { color: t.text.muted }]}>
              {tradeCards.length} card{tradeCards.length !== 1 ? "s" : ""}{" "}
              available for trade
            </Text>
          </View>

          <TradeCardGrid
            data={tradeCards}
            onCardPress={handleCardPress}
            contentBottomPad={140}
          />
        </View>

        <ContactButton
          traderUser={tradeData.traderUser}
          matchType={tradeData.matchType}
          onPress={handleContactPress}
        />
      </View>
    </SafeAreaView>
  );
};

const TradePair: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <TradePairInner />
    </ThemeProvider>
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
  },
  contactButtonContainer: {
    position: "absolute",
    bottom: 100, // Above bottom navigation
    left: SPACING.lg,
    right: SPACING.lg,
  },
  contactButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contactButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  contactButtonSubtext: {
    color: "white",
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
});

export default TradePair;
