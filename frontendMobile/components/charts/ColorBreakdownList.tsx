import React from "react";
import { View, StyleSheet } from "react-native";
import ColorBreakdownRow from "./ColorBreakdownRow";
import { SPACING } from "../../theme/tokens";

interface Item {
  label: string;
  percent: number;
}

interface Props {
  data: Item[];
}

const ColorBreakdownList: React.FC<Props> = ({ data }) => (
  <View style={styles.wrapper}>
    {data.map((it) => (
      <ColorBreakdownRow key={it.label} label={it.label} percent={it.percent} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.md,
  },
});

export default ColorBreakdownList;
