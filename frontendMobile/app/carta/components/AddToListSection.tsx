import React from "react";
import { View, StyleSheet } from "react-native";
import { SPACING } from "../../../theme/tokens";
import CartaActionButton from "./CartaActionButton";

interface AddToListSectionProps {
  onAddToList: (listType: "want" | "passe") => void;
}

const AddToListSection: React.FC<AddToListSectionProps> = ({ onAddToList }) => {
  return (
    <View style={styles.container}>
      <CartaActionButton
        title="Add to Want List"
        onPress={() => onAddToList("want")}
        variant="primary"
      />

      <CartaActionButton
        title="Add to Passe List"
        onPress={() => onAddToList("passe")}
        variant="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    paddingTop: SPACING.lg,
    // Removed marginTop: "auto" since we're now in a ScrollView
  },
});

export default AddToListSection;
