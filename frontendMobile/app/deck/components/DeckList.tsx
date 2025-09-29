import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import DeckListItem from "./DeckListItem";
import { Deck } from "../../../types/deckTypes";
import { SPACING } from "../../../theme/tokens";

interface Props {
  data: Deck[];
  onDeckPress?: (deck: Deck) => void;
  contentBottomPad?: number;
}

const DeckList: React.FC<Props> = ({
  data,
  onDeckPress,
  contentBottomPad = 140,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Deck }) => (
      <DeckListItem deck={item} onPress={onDeckPress} />
    ),
    [onDeckPress]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: contentBottomPad },
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
});

export default DeckList;
