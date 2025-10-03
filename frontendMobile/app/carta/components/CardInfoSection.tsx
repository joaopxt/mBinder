import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING } from "../../../theme/tokens";
import SetSelector from "./SetSelector";
import { SearchResult } from "../../../services/libraryService";

interface CardInfoSectionProps {
  card: SearchResult;
  selectedSet: string;
  onSetChange: (set: string) => void;
}

const CardInfoSection: React.FC<CardInfoSectionProps> = ({
  card,
  selectedSet,
  onSetChange,
}) => {
  // Mock data for available sets - in real app, this would come from API
  const availableSets = [
    { value: "alpha", label: "Alpha" },
    { value: "beta", label: "Beta" },
    { value: "unlimited", label: "Unlimited" },
    { value: card.setName || "current", label: card.setName || "Current Set" },
  ];

  return (
    <View style={styles.container}>
      <SetSelector
        availableSets={availableSets}
        selectedSet={selectedSet}
        onSetChange={onSetChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    marginBottom: SPACING.xl,
  },
});

export default CardInfoSection;
