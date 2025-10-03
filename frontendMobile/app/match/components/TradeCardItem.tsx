import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { TradeCard } from "../../../types/cardTypes";

interface Props {
  card: TradeCard;
  onPress?: (card: TradeCard) => void;
  cardWidth?: number;
}

const TradeCardItem: React.FC<Props> = ({ card, onPress, cardWidth = 160 }) => {
  const t = useAppTheme();

  return (
    <Pressable
      onPress={() => onPress?.(card)}
      android_ripple={{ color: t.primarySoftAlt }}
      style={[
        styles.wrapper,
        {
          backgroundColor: t.mode === "dark" ? "rgba(0,0,0,0.2)" : t.bg.alt,
          width: cardWidth,
        },
      ]}
    >
      {card.image ? (
        <Image
          source={{ uri: card.image }}
          style={[styles.image, { width: cardWidth }]}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              backgroundColor: t.bg.alt,
              width: cardWidth,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={[styles.placeholderText, { color: t.text.muted }]}>
            IMG
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.meta}>
          <Text
            style={[styles.name, { color: t.text.primary }]}
            numberOfLines={2}
          >
            {card.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    aspectRatio: 3 / 4,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
    lineHeight: 18,
  },
  type: {
    fontSize: 12,
    fontWeight: "500",
  },
  rarity: {
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default TradeCardItem;
