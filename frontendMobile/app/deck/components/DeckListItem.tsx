import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { Deck } from "../../../types/deckTypes";

interface Props {
  deck: Deck;
  onPress?: (deck: Deck) => void;
}

const DeckListItem: React.FC<Props> = ({ deck, onPress }) => {
  const t = useAppTheme();
  return (
    <Pressable
      onPress={() => onPress?.(deck)}
      android_ripple={{ color: t.primarySoftAlt }}
      style={[
        styles.wrapper,
        {
          backgroundColor: t.mode === "dark" ? "rgba(0,0,0,0.2)" : t.bg.alt,
          borderColor: t.border.base,
        },
      ]}
    >
      {deck.image ? (
        <Image source={{ uri: deck.image }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: "#333" }]} />
      )}
      <View style={styles.meta}>
        <Text
          style={[styles.name, { color: t.text.primary }]}
          numberOfLines={1}
        >
          {deck.name}
        </Text>
        <Text style={[styles.cardCount, { color: t.text.muted }]}>
          {deck.cardCount} cards
        </Text>
      </View>
      <Text style={[styles.chevron, { color: t.text.muted }]}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  cardCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    fontWeight: "300",
  },
});

export default DeckListItem;
