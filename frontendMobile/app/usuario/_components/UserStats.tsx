import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING } from "../../../theme/tokens";
import StatTile from "../../../components/stats/StatTile";

interface UserStatsProps {
  wantCount?: number;
  passeCount?: number;
  completedMatches?: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  wantCount = 123,
  passeCount = 456,
  completedMatches = 789,
}) => {
  const t = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: t.bg.base }]}>
      <View style={styles.statsRow}>
        <StatTile label="Want count" value={wantCount} />
        <View style={styles.spacer} />
        <StatTile label="Passe count" value={passeCount} />
        <View style={styles.spacer} />
        <StatTile label="Completed matches" value={completedMatches} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    width: SPACING.sm,
  },
});

export default UserStats;
