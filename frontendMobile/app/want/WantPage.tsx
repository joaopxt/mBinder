import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import WantCardGrid from "./components/WantCardGrid";
import { WantCard } from "../../types/cardTypes";
import Fab from "../../components/common/Fab";
import Sidebar from "@/components/layout/Sidebar";

const mockWantCards: WantCard[] = [
  {
    id: "sol-ring",
    name: "Sol Ring",
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHzjpGe-1zX_ZzP1Ftoa-ciwxj4x-hab0UuR4sl4ln6ldyQAb2BkHiZ6hrhWXaQJBGeuaelx4kI2ekoLIsjngQqT0LhVW0vmCpi-QZpQx_PfrOyxf5eSH1h1skZmTRyXwsiIp_nDEbOGArC4oHrcYxk-zO7QtTBk8_PD9ROyKBP_0snSLKS5jjZ_Uxj6-h5V_jlr96z0NKpJe79w_SeK3EWiehfG3I4nh5Zv2LNwt1nHYdSvpIBDJImQe_uzeIeyt-2X4UfGbEvikx",
  },
  {
    id: "lightning-bolt",
    name: "Lightning Bolt",
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_JhcvgTuROkfPrCNAfljK0xCOR6imzOrSyzZ7qUav4DUK_DBnOS3IrrXcraLkcW_b5iOWSgzVu5beRuHX0pLLT5-CNiAI3gw8XEMx-_uWMY_R30C2Xs3dUXfrPcXZ7LXvM5p2fVIBnlO6TNarjJ1zPA6LGpHCc9-j6fICqzmEQP9_ISIhz29RRlTlupoURipI7085QDg0zYQbcfxMDQPP0YLIYq9FUMG7_2Ef648lYwHvmbJOds31vmB-pe8BQXI-Dg6IBg6_8Abl",
  },
  {
    id: "counterspell",
    name: "Counterspell",
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA44sti45M_-tIWecXchG0w5IlThbMy_YjFCEmpUZwkzEZiDt1xC_wp5nzgUkHqxD1uJkNK3YfRjnmJpQ3f4zdpZeopf61pOhJ0F0TSO7_-Ek-lKlZBK02bMNwrAxF5uYBGG1FOXqVy8jgNNMbufHtjXgwRrNyiVCoFrA_vj7hQRA8T26MDTg_QZukgYK9PNkDLmTuwCvGR2IwUcRjcpS82kgjqeJAQ9mQL1oEbcrnyl9sVXKl8MSTel51R7bEmwzp5dTmbZbfTDTer",
  },
];

const WantInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const [wantCards, setWantCards] = useState<WantCard[]>(mockWantCards);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleRemove = useCallback((id: string) => {
    setWantCards((prev) => prev.filter((card) => card.id !== id));
  }, []);

  const handleCardPress = useCallback((card: WantCard) => {
    console.log("Card pressed:", card.id);
  }, []);

  const handleAdd = () => {
    console.log("Add from Library (to implement)");
  };

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="My WantList" onMenuPress={handleMenuPress} />

        <WantCardGrid
          data={wantCards}
          onRemove={handleRemove}
          onCardPress={handleCardPress}
          contentBottomPad={140}
        />

        <Fab onPress={handleAdd} icon="+" />

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/want/WantPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const WantPage: React.FC = () => (
  <ThemeProvider forceDark>
    <WantInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, position: "relative" },
});

export default WantPage;
