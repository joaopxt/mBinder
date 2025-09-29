import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { DeckCard } from "../../../types/deckTypes";

interface Props {
  cards: DeckCard[];
  onCardPress?: (card: DeckCard) => void;
}

const DeckCardGrid: React.FC<Props> = ({ cards, onCardPress }) => {
  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <Pressable
          key={card.id}
          onPress={() => onCardPress?.(card)}
          style={styles.cardWrapper}
        >
          {card.image ? (
            <Image source={{ uri: card.image }} style={styles.cardImage} />
          ) : (
            <View style={[styles.cardImage, { backgroundColor: "#333" }]} />
          )}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  cardWrapper: {
    width: "30%",
    aspectRatio: 3 / 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: RADIUS.lg,
  },
});

export default DeckCardGrid;
