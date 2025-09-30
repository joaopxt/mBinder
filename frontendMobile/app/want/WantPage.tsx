import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import Sidebar from "../../components/layout/Sidebar";
import Fab from "../../components/common/Fab";
import { useActiveUser } from "../../context/ActiveUserContext";
import { WantCard } from "../../types/cardTypes";
import WantCardGrid from "./components/WantCardGrid";

const IMAGE_FALLBACK = "https://placehold.co/200x280?text=Card";

const WantInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const { user, want, wantLoading, refreshWant } = useActiveUser();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const wantCards: WantCard[] = useMemo(() => {
    if (!want?.cartas) return [];
    return want.cartas.map((c: any) => ({
      id: String(c.id),
      name: c.name ?? "Sem nome",
      quantity: 1,
      set: c.set ?? "",
      image: c.image ?? IMAGE_FALLBACK,
    }));
  }, [want]);

  const handleRemove = useCallback((id: string) => {
    console.log("Remover carta (não implementado):", id);
  }, []);

  const handleCardPress = useCallback((card: WantCard) => {
    console.log("Card pressed:", card.id);
  }, []);

  const handleAdd = () => {
    console.log("Adicionar carta à Want (não implementado)");
  };

  const handleMenuPress = () => setSidebarVisible((v) => !v);
  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  if (!user) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Want List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            Selecione um usuário na página de Usuário.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (wantLoading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Want List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <ActivityIndicator color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Carregando Want...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!want || wantCards.length === 0) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Want List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            Nenhuma carta na Want de {user.nickname}.
          </Text>
          <Text
            onPress={refreshWant}
            style={{ color: t.text.primary, fontWeight: "600" }}
          >
            Recarregar
          </Text>
        </View>
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/want/WantPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar
          title={`Want - ${user.nickname}`}
          onMenuPress={handleMenuPress}
        />

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
  center: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WantPage;
