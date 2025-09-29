import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { TradeCard } from "../../../types/matchTypes";

interface Props {
  card: TradeCard;
}

const TradeCardDisplay: React.FC<Props> = ({ card }) => {
  const t = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: t.mode === "dark" ? "rgba(0,0,0,0.3)" : t.bg.alt,
        },
      ]}
    >
      <Image source={{ uri: card.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: t.text.primary }]}>
          {card.name}
        </Text>
        <View style={styles.details}>
          <Text style={[styles.type, { color: t.text.muted }]}>
            {card.type}
          </Text>
          <Text style={[styles.rarity, { color: t.text.muted }]}>
            {card.rarity}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 192,
  },
  info: {
    padding: SPACING.md,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
  },
  type: {
    fontSize: 16,
    fontWeight: "500",
  },
  rarity: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default TradeCardDisplay;
