import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";
import BulkImportActionButton from "./BulkImportActionButton";

interface BulkImportModalProps {
  visible: boolean;
  onClose: () => void;
  onImport: (cardNames: string[]) => Promise<void>;
  title?: string;
  placeholder?: string;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({
  visible,
  onClose,
  onImport,
  title = "Bulk Import Cards",
  placeholder = "Paste your card list here...",
}) => {
  const t = useAppTheme();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewCards, setPreviewCards] = useState<string[]>([]);

  const parseCardList = (text: string): string[] => {
    if (!text.trim()) return [];

    const lines = text.split("\n");
    const cardNames: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Remove quantity and whitespace from the beginning
      const match = trimmed.match(/^\s*\d*\s*(.+)$/);
      if (match && match[1]) {
        const cardName = match[1].trim();
        if (cardName) {
          cardNames.push(cardName);
        }
      }
    }

    return cardNames;
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await Clipboard.getStringAsync();
      if (clipboardText) {
        setInputText(clipboardText);
        const parsed = parseCardList(clipboardText);
        setPreviewCards(parsed);
      } else {
        Alert.alert("Clipboard Empty", "No text found in clipboard");
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      Alert.alert("Error", "Failed to read from clipboard");
    }
  };

  const handleTextChange = (text: string) => {
    setInputText(text);
    const parsed = parseCardList(text);
    setPreviewCards(parsed);
  };

  const handleImport = async () => {
    if (previewCards.length === 0) {
      Alert.alert("No Cards", "Please paste a valid card list");
      return;
    }

    setLoading(true);
    try {
      await onImport(previewCards);
      Alert.alert(
        "Success",
        `Imported ${previewCards.length} cards successfully!`
      );
      handleClose();
    } catch (error) {
      console.error("Import failed:", error);
      Alert.alert("Error", "Failed to import cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInputText("");
    setPreviewCards([]);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={[styles.modal, { backgroundColor: t.bg.base }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text.primary }]}>
              {title}
            </Text>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: t.text.muted }]}>✕</Text>
            </Pressable>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: t.text.muted }]}>
            Paste a list of cards with quantities. Example:{"\n"}1 Castle
            Embereth{"\n"}4 Lightning Bolt{"\n"}2 Mountain
          </Text>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: t.bg.alt,
                  borderColor: t.border.base,
                  color: t.text.primary,
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor={t.text.muted}
              value={inputText}
              onChangeText={handleTextChange}
              multiline
              textAlignVertical="top"
            />

            <BulkImportActionButton
              title="Paste from Clipboard"
              onPress={handlePasteFromClipboard}
              variant="outline"
              size="small"
              icon="📋"
            />
          </View>

          {/* Preview Section */}
          {previewCards.length > 0 && (
            <View style={styles.previewSection}>
              <Text style={[styles.previewTitle, { color: t.text.primary }]}>
                Preview ({previewCards.length} cards):
              </Text>
              <ScrollView
                style={[styles.previewList, { backgroundColor: t.bg.alt }]}
                showsVerticalScrollIndicator={false}
              >
                {previewCards.map((card, index) => (
                  <Text
                    key={index}
                    style={[styles.previewItem, { color: t.text.primary }]}
                  >
                    • {card}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <BulkImportActionButton
              title="Cancel"
              onPress={handleClose}
              variant="secondary"
              flex
            />

            <BulkImportActionButton
              title="Import Cards"
              onPress={handleImport}
              variant="primary"
              disabled={previewCards.length === 0}
              loading={loading}
              icon={loading ? undefined : "📤"}
              flex
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: SPACING.lg,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    width: "100%",
    maxWidth: 400,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  closeButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  inputSection: {
    marginBottom: SPACING.lg,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    fontSize: 14,
    height: 120,
    marginBottom: SPACING.md,
  },
  previewSection: {
    marginBottom: SPACING.lg,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  previewList: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  previewItem: {
    fontSize: 12,
    paddingVertical: 2,
    lineHeight: 16,
  },
  footer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
});

export default BulkImportModal;
