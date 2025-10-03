import React, { useCallback } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import TradeCardItem from "./TradeCardItem";
import { TradeCard } from "../../../types/cardTypes";
import { SPACING } from "../../../theme/tokens";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - SPACING.lg * 3) / 2; // 2 columns with proper spacing

interface Props {
  data: TradeCard[];
  onCardPress?: (card: TradeCard) => void;
  contentBottomPad?: number;
}

const TradeCardGrid: React.FC<Props> = ({
  data,
  onCardPress,
  contentBottomPad = 140,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: TradeCard }) => (
      <TradeCardItem card={item} onPress={onCardPress} cardWidth={CARD_WIDTH} />
    ),
    [onCardPress]
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
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
  },
  row: {
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
});

export default TradeCardGrid;
