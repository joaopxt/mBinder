import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SPACING, RADIUS } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";
import CollectionCard from "../../types/cardTypes";

interface Props {
  card: CollectionCard;
  onPress?: (card: CollectionCard) => void;
  onRemove?: (id: string) => void;
  cardWidth?: number;
}

const CollectionCardItem: React.FC<Props> = ({
  card,
  onPress,
  onRemove,
  cardWidth = 160,
}) => {
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
          style={[styles.image, { backgroundColor: "#333", width: cardWidth }]}
        />
      )}

      <View style={styles.footer}>
        <View style={styles.meta}>
          <Text
            style={[styles.name, { color: t.text.primary }]}
            numberOfLines={1}
          >
            {card.name}
          </Text>
          <Text style={[styles.type, { color: t.text.muted }]}>
            {card.typeLine}
          </Text>
        </View>
        {onRemove && (
          <Pressable
            hitSlop={8}
            onPress={() => onRemove(card.id)}
            android_ripple={{ color: t.primarySoft }}
            style={styles.removeBtn}
          >
            <Text style={[styles.removeIcon, { color: t.text.muted }]}>🗑</Text>
          </Pressable>
        )}
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
  },
  meta: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  type: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  removeBtn: {
    padding: 4,
  },
  removeIcon: {
    fontSize: 20,
  },
});

export default CollectionCardItem;
