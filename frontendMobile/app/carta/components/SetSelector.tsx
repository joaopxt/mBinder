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

  const renderSetOption = ({ item }: { item: SetOption }) => (
    <Pressable
      style={[
        styles.option,
        {
          backgroundColor: t.bg.alt,
          borderBottomColor: t.border.base,
        },
      ]}
      onPress={() => handleSelect(item.value)}
      android_ripple={{ color: t.primarySoft }}
    >
      <Text style={[styles.optionText, { color: t.text.primary }]}>
        {item.label}
      </Text>
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
              keyExtractor={(item) => item.value}
              renderItem={renderSetOption}
              style={styles.optionsList}
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SetSelector;
