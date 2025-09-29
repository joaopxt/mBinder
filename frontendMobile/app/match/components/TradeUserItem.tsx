import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { TradeUser } from "../../../types/matchTypes";

interface Props {
  user: TradeUser;
  onPress?: (user: TradeUser) => void;
}

const TradeUserItem: React.FC<Props> = ({ user, onPress }) => {
  const t = useAppTheme();

  return (
    <Pressable
      onPress={() => onPress?.(user)}
      android_ripple={{ color: t.primarySoft }}
      style={[
        styles.container,
        {
          backgroundColor: t.mode === "dark" ? "rgba(0,0,0,0.2)" : t.bg.alt,
        },
      ]}
    >
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: t.text.primary }]}>
          {user.name}
        </Text>
        <Text style={[styles.cardCount, { color: t.text.muted }]}>
          {user.commonCards} cards in common
        </Text>
      </View>
      <Text style={[styles.chevron, { color: t.text.muted }]}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    gap: SPACING.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardCount: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    fontWeight: "300",
  },
});

export default TradeUserItem;
