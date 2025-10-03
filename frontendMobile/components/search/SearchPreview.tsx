import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../theme/tokens";
import { SearchResult } from "../../services/libraryService";

interface SearchPreviewProps {
  results: SearchResult[];
  onCardPress: (card: SearchResult) => void;
  visible: boolean;
}

const SearchPreview: React.FC<SearchPreviewProps> = ({
  results,
  onCardPress,
  visible,
}) => {
  const t = useAppTheme();

  if (!visible || results.length === 0) {
    return null;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: SearchResult;
    index: number;
  }) => {
    return (
      <Pressable
        style={[
          styles.item,
          {
            backgroundColor: t.bg.alt,
            borderBottomColor: t.border.base,
          },
        ]}
        onPress={() => {
          onCardPress(item);
        }}
        android_ripple={{ color: t.primarySoft }}
      >
        <Text style={[styles.cardName, { color: t.text.primary }]}>
          {item.name}
        </Text>
        {item.setName && (
          <Text style={[styles.setName, { color: t.text.muted }]}>
            {item.setName}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: t.bg.base,
          borderColor: t.border.base,
        },
      ]}
    >
      <FlatList
        data={results}
        keyExtractor={(item, index) => {
          const key = `${item.id}-${index}`;

          return key;
        }}
        renderItem={renderItem}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        ListEmptyComponent={() => {
          console.log(`[SearchPreview] ListEmptyComponent rendered`);
          return (
            <Text style={{ color: t.text.muted, padding: SPACING.md }}>
              No results found
            </Text>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
    maxHeight: 250,
  },
  item: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cardName: {
    fontSize: 15,
    fontWeight: "600",
  },
  setName: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default SearchPreview;
