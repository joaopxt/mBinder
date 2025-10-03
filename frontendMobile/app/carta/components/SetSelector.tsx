import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface SetOption {
  value: string;
  label: string;
  id?: string; // Add unique identifier
}

interface SetSelectorProps {
  availableSets: SetOption[];
  selectedSet: string;
  onSetChange: (set: string) => void;
}

const SetSelector: React.FC<SetSelectorProps> = ({
  availableSets,
  selectedSet,
  onSetChange,
}) => {
  const t = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = availableSets.find((set) => set.value === selectedSet);

  const handleSelect = (value: string) => {
    onSetChange(value);
    setIsOpen(false);
  };

  const renderSetOption = ({
    item,
    index,
  }: {
    item: SetOption;
    index: number;
  }) => (
    <Pressable
      style={[
        styles.option,
        {
          backgroundColor: t.bg.alt,
          borderBottomColor: t.border.base,
        },
        // Add different styling for selected item
        item.value === selectedSet && {
          backgroundColor: t.primarySoft,
        },
      ]}
      onPress={() => handleSelect(item.value)}
      android_ripple={{ color: t.primarySoft }}
    >
      <Text
        style={[
          styles.optionText,
          { color: t.text.primary },
          // Highlight selected item
          item.value === selectedSet && {
            fontWeight: "600",
            color: t.primary,
          },
        ]}
      >
        {item.label}
      </Text>
      {item.value === selectedSet && (
        <Text style={[styles.checkmark, { color: t.primary }]}>✓</Text>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: t.text.primary }]}>Set</Text>

      <Pressable
        style={[
          styles.selector,
          {
            backgroundColor: t.bg.alt,
            borderColor: t.border.base,
          },
        ]}
        onPress={() => setIsOpen(true)}
        android_ripple={{ color: t.primarySoft }}
      >
        <Text style={[styles.selectedText, { color: t.text.primary }]}>
          {selectedOption?.label || "Select a set"}
        </Text>
        <Text style={[styles.arrow, { color: t.text.primary }]}>⌄</Text>
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: t.bg.base,
                borderColor: t.border.base,
              },
            ]}
          >
            <FlatList
              data={availableSets}
              keyExtractor={(item, index) => `${item.value}-${index}`} // Fix: Use unique key
              renderItem={renderSetOption}
              style={styles.optionsList}
              showsVerticalScrollIndicator={true}
              bounces={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: SPACING.sm,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    maxHeight: 300,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
  optionsList: {
    maxHeight: 250,
  },
  option: {
    flexDirection: "row", // Add flex direction for checkmark
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: SPACING.sm,
  },
});

export default SetSelector;
