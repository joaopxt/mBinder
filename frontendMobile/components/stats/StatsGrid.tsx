import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING } from "../../theme/tokens";
import StatTile from "./StatTile";

interface StatsGridProps {
  want: number;
  passe: number;
  decks: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ want, passe, decks }) => (
  <View style={styles.grid}>
    <StatTile label="Want" value={want} />
    <StatTile label="Passe" value={passe} />
    <StatTile label="Decks" value={decks} />
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: SPACING.md,
  },
});

export default StatsGrid;
