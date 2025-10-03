import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import CardImage from "./components/CardImage";
import CardInfoSection from "./components/CardInfoSection";
import AddToListSection from "./components/AddToListSection";
import { useActiveUser } from "../../context/ActiveUserContext";
import {
  getCardById,
  getCardVariants,
  CardVariant,
} from "../../services/libraryService";
import { SearchResult } from "../../services/libraryService";
import { addCardToPasse } from "../../services/passeService";
import { addCardToWant } from "../../services/wantService";

const CartaPageInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ cardId: string }>();
  const { user } = useActiveUser();

  const [card, setCard] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [availableSets, setAvailableSets] = useState<CardVariant[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [addingToList, setAddingToList] = useState<string | null>(null);

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

        // Load variants for this card
        await loadCardVariants(params.cardId);
      } catch (error) {
        console.error("[CartaPage] Failed to load card:", error);
        Alert.alert("Error", "Failed to load card details");
      } finally {
        setLoading(false);
      }
    };

    loadCard();
  }, [params.cardId]);

  const loadCardVariants = async (cardId: string) => {
    try {
      setLoadingVariants(true);
      console.log(`[CartaPage] Loading variants for card ID: ${cardId}`);
      const variantsData = await getCardVariants(parseInt(cardId));
      setAvailableSets(variantsData.variants);
    } catch (error) {
      console.error("[CartaPage] Failed to load card variants:", error);
      // Don't show error to user, just log it
    } finally {
      setLoadingVariants(false);
    }
  };

  const handleSetChange = async (setName: string) => {
    console.log(`[CartaPage] Changing to set: ${setName}`);

    // Find the variant for the selected set
    const selectedVariant = availableSets.find(
      (variant) => variant.setName === setName
    );

    if (selectedVariant && card) {
      // Update the selected set
      setSelectedSet(setName);

      // Update card data with the new variant
      const updatedCard: SearchResult = {
        ...card,
        id: selectedVariant.id.toString(),
        setName: selectedVariant.setName,
        imageNormal: selectedVariant.imageNormal || card.imageNormal,
        imageSmall: selectedVariant.imageSmall || card.imageSmall,
      };

      setCard(updatedCard);

      // Update URL to reflect the new card variant
      router.setParams({ cardId: selectedVariant.id.toString() });
    }
  };

  const handleAddToList = async (listType: "want" | "passe") => {
    console.log(`🔥 [CartaPage] handleAddToList called with:`, {
      listType,
      hasCard: !!card,
      cardId: card?.id,
      hasUser: !!user,
      userId: user?.id,
    });

    if (!card || !user) {
      Alert.alert("Error", "Please select a user first");
      return;
    }

    const cardId = parseInt(card.id);
    if (isNaN(cardId)) {
      console.error(`❌ [CartaPage] Invalid card ID: "${card.id}"`);
      Alert.alert("Error", "Invalid card selected");
      return;
    }

    console.log(`🎯 [CartaPage] About to add card:`, {
      cardId,
      cardName: card.name,
      listType,
      userId: user.id,
    });

    setAddingToList(listType);

    try {
      console.log(
        `[CartaPage] Adding ${card.name} (${selectedSet}) to ${listType} list for user ${user.id}`
      );

      if (listType === "passe") {
        console.log(`📤 [CartaPage] Calling addCardToPasse...`);
        await addCardToPasse(user.id, cardId);
        Alert.alert(
          "Success",
          `"${card.name}" added to your passe successfully!`,
          [{ text: "OK" }]
        );
      } else {
        console.log(`📤 [CartaPage] Calling addCardToWant...`);
        await addCardToWant(user.id, cardId);
        Alert.alert(
          "Success",
          `"${card.name}" added to your want list successfully!`,
          [{ text: "OK" }]
        );
      }

      console.log(`✅ [CartaPage] Successfully added card to ${listType}`);
    } catch (error: any) {
      console.error(`❌ [CartaPage] Failed to add card to ${listType}:`, error);
      console.error(`❌ [CartaPage] Error details:`, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      Alert.alert(
        "Error",
        error.message || `Failed to add card to ${listType} list`,
        [{ text: "OK" }]
      );
    } finally {
      setAddingToList(null);
    }
  };

  // Show user selection prompt if no user is selected
  if (!user) {
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
            No User Selected
          </Text>
          <Text style={[styles.errorSubtext, { color: t.text.muted }]}>
            Please select a user to add cards to lists
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          showBack
          onBackPress={() => router.back()}
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
            onSetChange={handleSetChange}
            availableSets={availableSets}
            loadingVariants={loadingVariants}
          />

          <AddToListSection
            onAddToList={handleAddToList}
            loading={addingToList}
          />
        </ScrollView>
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
    paddingBottom: SPACING.xl,
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
