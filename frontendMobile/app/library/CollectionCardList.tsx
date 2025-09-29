import React, { useCallback } from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
import CollectionCard from "../../types/cardTypes";
import CollectionCardItem from "./CollectionCardItem";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.lg * 3) / 2; // 2 columns with proper spacing

interface Props {
  data: CollectionCard[];
  onCardPress?: (c: CollectionCard) => void;
  onRemove?: (id: string) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  contentBottomPad?: number;
}

const CollectionCardList: React.FC<Props> = ({
  data,
  onCardPress,
  onRemove,
  ListHeaderComponent,
  ListEmptyComponent,
  contentBottomPad = 140,
}) => {
  const t = useAppTheme();

  const renderItem = useCallback(
    ({ item }: { item: CollectionCard }) => (
      <CollectionCardItem
        card={item}
        onPress={onCardPress}
        onRemove={onRemove}
        cardWidth={CARD_WIDTH}
      />
    ),
    [onCardPress, onRemove]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      style={{ flex: 1 }}
      ListHeaderComponent={ListHeaderComponent || null}
      ListEmptyComponent={
        ListEmptyComponent || (
          <View style={styles.empty}>{/* Simple empty placeholder */}</View>
        )
      }
      contentContainerStyle={[
        styles.content,
        {
          paddingBottom: contentBottomPad,
          backgroundColor: t.bg.base,
        },
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  empty: {
    padding: SPACING.xl,
  },
});

export default CollectionCardList;
