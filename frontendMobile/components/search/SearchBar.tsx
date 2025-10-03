import React from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { RADIUS, SPACING } from "../../theme/tokens";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  onFilterPress?: () => void;
  disabled?: boolean;
  autoFocus?: boolean; // New prop for auto focus
  onSubmit?: () => void; // New prop for submit action
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search cards...",
  value,
  onChange,
  onFilterPress,
  disabled,
  autoFocus = false,
  onSubmit,
}) => {
  const t = useAppTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: t.bg.input,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={t.text.muted}
        value={value}
        editable={!disabled}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={[styles.input, { color: t.text.primary }]}
        returnKeyType="search"
        autoFocus={autoFocus}
      />
      {!!onFilterPress && (
        <Pressable
          onPress={onFilterPress}
          android_ripple={{ color: t.primarySoftAlt }}
          style={styles.filterBtn}
        >
          <Text style={[styles.filterIcon, { color: t.primary }]}>⚙</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  filterBtn: {
    marginLeft: SPACING.sm,
    height: 40,
    width: 40,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    fontSize: 18,
    fontWeight: "700",
  },
});

export default SearchBar;
