import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface AccountInfoFieldProps {
  label: string;
  value: string;
  isEditable: boolean;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
}

const AccountInfoField: React.FC<AccountInfoFieldProps> = ({
  label,
  value,
  isEditable,
  onChangeText,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
}) => {
  const t = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: t.text.primary }]}>{label}</Text>

      <View style={[styles.inputContainer, { backgroundColor: t.bg.input }]}>
        <TextInput
          style={[
            styles.input,
            {
              color: t.text.primary,
              backgroundColor: isEditable ? t.bg.input : "transparent",
              opacity: isEditable ? 1 : 0.7,
            },
            multiline && styles.multilineInput,
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={isEditable}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={t.text.muted}
        />

        {!isEditable && (
          <View style={styles.editIconContainer}>
            <Text style={[styles.editIcon, { color: t.text.muted }]}>✏</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    position: "relative",
    borderRadius: RADIUS.lg,
    minHeight: 48,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  editIconContainer: {
    position: "absolute",
    right: SPACING.md,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  editIcon: {
    fontSize: 20,
  },
});

export default AccountInfoField;
