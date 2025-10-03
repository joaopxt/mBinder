import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";

interface CardImageProps {
  imageUrl?: string;
  cardName: string;
}

const CardImage: React.FC<CardImageProps> = ({ imageUrl, cardName }) => {
  const t = useAppTheme();

  const fallbackImageUrl =
    "https://placehold.co/300x420/23190f/f98006?text=Card";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageUrl || fallbackImageUrl,
          }}
          style={[
            styles.cardImage,
            {
              backgroundColor: t.bg.alt,
            },
          ]}
          resizeMode="contain" // Changed from "cover" to "contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg, // Reduced from xl
    alignItems: "center", // Center the image
  },
  imageContainer: {
    width: 240, // Fixed width instead of 100%
    height: 336, // Fixed height (7:5 ratio for MTG cards)
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: RADIUS.lg,
  },
});

export default CardImage;
