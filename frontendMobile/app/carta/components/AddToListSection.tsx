import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING } from "../../../theme/tokens";
import CartaActionButton from "./CartaActionButton";

interface AddToListSectionProps {
  onAddToList: (listType: "want" | "passe") => void;
  loading?: string | null; // Which button is currently loading
}

const AddToListSection: React.FC<AddToListSectionProps> = ({
  onAddToList,
  loading = null,
}) => {
  const t = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: t.text.primary }]}>Add to List</Text>

      <View style={styles.buttonContainer}>
        <CartaActionButton
          title="Add to Want"
          onPress={() => onAddToList("want")}
          variant="secondary"
          loading={loading === "want"}
          disabled={loading !== null}
        />

        <CartaActionButton
          title="Add to Passe"
          onPress={() => onAddToList("passe")}
          variant="primary"
          loading={loading === "passe"}
          disabled={loading !== null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
});

export default AddToListSection;
