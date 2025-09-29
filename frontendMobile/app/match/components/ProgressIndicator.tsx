import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";

interface Props {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const t = useAppTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index < currentStep ? t.primary : `${t.primary}30`,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
});

export default ProgressIndicator;
