import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface AccountFormActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const AccountFormActions: React.FC<AccountFormActionsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const t = useAppTheme();

  if (isEditing) {
    return (
      <View style={styles.container}>
        <Pressable
          style={[
            styles.button,
            styles.cancelButton,
            { borderColor: t.text.muted },
          ]}
          onPress={onCancel}
          android_ripple={{ color: t.primarySoft }}
        >
          <Text style={[styles.buttonText, { color: t.text.muted }]}>
            Cancel
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            styles.saveButton,
            { backgroundColor: t.primary },
          ]}
          onPress={onSave}
          android_ripple={{ color: t.primarySoft }}
        >
          <Text style={[styles.buttonText, styles.saveButtonText]}>
            Save Changes
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          styles.editButton,
          { backgroundColor: t.primary },
        ]}
        onPress={onEdit}
        android_ripple={{ color: t.primarySoft }}
      >
        <Text style={[styles.buttonText, styles.editButtonText]}>
          ✏ Edit Profile
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingTop: SPACING.lg,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  saveButton: {
    // backgroundColor set via props
  },
  editButton: {
    // backgroundColor set via props
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
  editButtonText: {
    color: "#FFFFFF",
  },
});

export default AccountFormActions;
