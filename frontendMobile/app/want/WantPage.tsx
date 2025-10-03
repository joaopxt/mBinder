import React, { useMemo, useCallback, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import Sidebar from "../../components/layout/Sidebar";
import { useActiveUser } from "../../context/ActiveUserContext";
import { useUserWant } from "../../dataHooks/wantHook";
import { WantCard } from "../../types/cardTypes";
import WantCardGrid from "./components/WantCardGrid";
import { FilterState } from "@/components/filter/types";
import SearchModal from "@/components/search/SearchModal";
import { bulkImportCards } from "@/services/wantService";
import BulkImportModal from "@/components/common/BulkImportModal";
import BulkImportFab from "@/components/common/BulkImportFab";

const IMAGE_FALLBACK = "https://placehold.co/200x280?text=Card";

const WantInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const { user } = useActiveUser();
  const {
    want,
    loading: wantLoading,
    error,
    refreshWant,
  } = useUserWant(user?.id ?? null);
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [bulkImportVisible, setBulkImportVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    types: [],
    sets: [],
    rarity: [],
    cmc: { min: 0, max: 20 },
  });

  const wantCards: WantCard[] = useMemo(() => {
    if (!want?.cartas) return [];
    return want.cartas.map((c: any) => ({
      id: String(c.id),
      name: c.name ?? c.nome ?? "Sem nome",
      quantity: 1,
      set: c.set ?? c.edicao ?? "",
      image: c.image ?? IMAGE_FALLBACK,
    }));
  }, [want?.cartas]);

  const handleRemove = useCallback((id: string) => {
    console.log("Remover carta (não implementado):", id);
  }, []);

  const handleCardPress = useCallback(
    (card: WantCard) => {
      router.push(`/carta/CartaPage?cardId=${card.id}`);
    },
    [router]
  );

  const handleMenuPress = useCallback(() => {
    setSidebarVisible((prev) => !prev);
  }, []);

  const handleSearchPress = () => {
    setSearchModalVisible(true);
  };

  const handleSearchClose = () => {
    setSearchModalVisible(false);
  };

  const handleSearch = (query: string) => {
    console.log("Searching wants for:", query);
    // Implement search logic for wants
    setSearchModalVisible(false);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Want filters changed:", newFilters);
  };

  const handleNavigate = useCallback(
    (route: string) => {
      setSidebarVisible(false);
      router.push(route as any);
    },
    [router]
  );

  const handleBulkImportPress = () => {
    setBulkImportVisible(true);
  };

  const handleBulkImportClose = () => {
    setBulkImportVisible(false);
  };

  const handleBulkImport = async (cardNames: string[]) => {
    if (!user?.id) {
      throw new Error("No user selected");
    }

    const result = await bulkImportCards(user.id, cardNames);

    // Refresh the passe list to show new cards
    await refreshWant();

    // Show detailed result if needed
    if (result.notFound.length > 0 || result.alreadyExists.length > 0) {
      console.log("Import completed with issues:", result);
    }
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
          <ActivityIndicator size="large" color={t.text.muted} />
          <Text style={{ color: t.text.muted, marginTop: 12 }}>
            Carregando Want...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Want List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            {error}
          </Text>
          <Text
            onPress={refreshWant}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Tentar novamente
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
        <HeaderBar
          title="Want List"
          onMenuPress={handleMenuPress}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            Nenhuma carta na Want de {user.nickname}.
          </Text>
          <Text
            onPress={refreshWant}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Recarregar
          </Text>
        </View>
        <BulkImportFab onPress={handleBulkImportPress} />
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/want/WantPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
        <SearchModal
          visible={searchModalVisible}
          onClose={handleSearchClose}
          onSearch={handleSearch}
          placeholder="Search cards..."
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <BulkImportModal
          visible={bulkImportVisible}
          onClose={handleBulkImportClose}
          onImport={handleBulkImport}
          title="Import Cards to Want"
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
          onSearchPress={handleSearchPress}
        />

        <WantCardGrid
          data={wantCards}
          onRemove={handleRemove}
          onCardPress={handleCardPress}
          contentBottomPad={140}
        />
        <BulkImportFab onPress={handleBulkImportPress} />
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/want/WantPage"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
        <SearchModal
          visible={searchModalVisible}
          onClose={handleSearchClose}
          onSearch={handleSearch}
          placeholder="Search cards..."
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        <BulkImportModal
          visible={bulkImportVisible}
          onClose={handleBulkImportClose}
          onImport={handleBulkImport}
          title="Import Cards to Passe"
        />
      </View>
    </SafeAreaView>
  );
};

const WantPage: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <WantInner />
    </ThemeProvider>
  </>
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
