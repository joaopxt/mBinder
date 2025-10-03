import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING } from "../../../theme/tokens";
import SetSelector from "./SetSelector";
import { SearchResult } from "../../../services/libraryService";
import { CardVariant } from "../../../services/libraryService";

interface CardInfoSectionProps {
  card: SearchResult;
  selectedSet: string;
  onSetChange: (set: string) => void;
  availableSets: CardVariant[];
  loadingVariants?: boolean;
}

const CardInfoSection: React.FC<CardInfoSectionProps> = ({
  card,
  selectedSet,
  onSetChange,
  availableSets,
  loadingVariants = false,
}) => {
  const t = useAppTheme();

  // Convert CardVariant[] to SetOption[] for SetSelector with unique keys
  const setOptions = availableSets.map((variant, index) => ({
    value: variant.setName,
    label: `${variant.setName} `.trim(),
    id: `${variant.id}-${index}`, // Add unique identifier
  }));

  // Remove duplicates based on setName but keep the first occurrence
  const uniqueSetOptions = setOptions.filter(
    (option, index, self) =>
      self.findIndex((o) => o.value === option.value) === index
  );

  // Add current set if not in variants (fallback)
  if (
    selectedSet &&
    !uniqueSetOptions.find((option) => option.value === selectedSet)
  ) {
    uniqueSetOptions.push({
      value: selectedSet,
      label: selectedSet,
      id: `fallback-${selectedSet}`,
    });
  }

  if (loadingVariants) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={t.text.muted} />
          <Text style={[styles.loadingText, { color: t.text.muted }]}>
            Loading available sets...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {uniqueSetOptions.length > 1 ? (
        <>
          <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
            Available Sets ({uniqueSetOptions.length})
          </Text>
          <SetSelector
            availableSets={uniqueSetOptions}
            selectedSet={selectedSet}
            onSetChange={onSetChange}
          />
        </>
      ) : (
        <View style={styles.singleSetContainer}>
          <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
            Set Information
          </Text>
          <Text style={[styles.singleSetText, { color: t.text.muted }]}>
            {selectedSet || "Unknown Set"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  loadingText: {
    marginLeft: SPACING.sm,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  singleSetContainer: {
    padding: SPACING.md,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
  },
  singleSetText: {
    fontSize: 14,
    fontWeight: "500",
  },
  rarityText: {
    fontSize: 12,
    marginTop: SPACING.xs,
  },
});

export default CardInfoSection;
