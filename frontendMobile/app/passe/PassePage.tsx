import React, { useMemo, useCallback, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import HeaderBar from "../../components/layout/HeaderBar";
import PasseCardGrid from "./components/PasseCardGrid";
import { PasseCard } from "../../types/cardTypes";
import Sidebar from "@/components/layout/Sidebar";
import { useActiveUser } from "../../context/ActiveUserContext";
import { useUserPasse } from "../../dataHooks/passeHook";
import { FilterState } from "@/components/filter/types";
import SearchModal from "@/components/search/SearchModal";
import BulkImportModal from "@/components/common/BulkImportModal";
import BulkImportFab from "@/components/common/BulkImportFab";
import { bulkImportCards } from "@/services/passeService";

const IMAGE_FALLBACK = "https://placehold.co/200x280?text=Card";

const PasseInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const { user } = useActiveUser();
  const {
    passe,
    loading: passeLoading,
    error,
    refreshPasse,
  } = useUserPasse(user?.id ?? null);
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

  // Memoize card transformation - only recalculate when passe.cartas changes
  const passeCards: PasseCard[] = useMemo(() => {
    if (!passe?.cartas) return [];
    return passe.cartas.map((c: any) => ({
      id: String(c.id),
      name: c.name ?? "Sem nome",
      quantity: 1,
      image: c.image ?? IMAGE_FALLBACK,
    }));
  }, [passe?.cartas]);

  const handleRemove = useCallback((id: string) => {
    console.log("Remover carta (não implementado):", id);
    // TODO: Implement remove functionality
  }, []);

  const handleCardPress = useCallback(
    (card: PasseCard) => {
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
    console.log("Searching passe for:", query);
    setSearchModalVisible(false);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Passe filters changed:", newFilters);
  };

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
    await refreshPasse();

    // Show detailed result if needed
    if (result.notFound.length > 0 || result.alreadyExists.length > 0) {
      console.log("Import completed with issues:", result);
    }
  };

  const handleNavigate = useCallback(
    (route: string) => {
      setSidebarVisible(false);
      router.push(route as any);
    },
    [router]
  );

  if (!user) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Passe List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary }}>
            Selecione um usuário primeiro.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (passeLoading) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar title="Passe List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={(t as any).primary} />
          <Text style={{ color: t.text.primary, marginTop: 16 }}>
            Carregando passe...
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
        <HeaderBar title="Passe List" onMenuPress={handleMenuPress} />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            {error}
          </Text>
          <Text
            onPress={refreshPasse}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Tentar novamente
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!passe || passeCards.length === 0) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: t.bg.base }]}
        edges={["top"]}
      >
        <HeaderBar
          title="Passe List"
          onMenuPress={handleMenuPress}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.center}>
          <Text style={{ color: t.text.primary, marginBottom: 8 }}>
            Nenhuma carta no Passe de {user.nickname}.
          </Text>
          <Text
            onPress={refreshPasse}
            style={{ color: (t as any).primary, fontWeight: "600" }}
          >
            Recarregar
          </Text>
        </View>
        <BulkImportFab onPress={handleBulkImportPress} />
        <Sidebar
          visible={sidebarVisible}
          activeRoute="/passe/PassePage"
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
          title={`Passe - ${user.nickname}`}
          onMenuPress={handleMenuPress}
          onSearchPress={handleSearchPress}
        />

        <PasseCardGrid
          data={passeCards}
          onRemove={handleRemove}
          onCardPress={handleCardPress}
          contentBottomPad={140}
        />

        <BulkImportFab onPress={handleBulkImportPress} />

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/passe/PassePage"
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

const PassePage: React.FC = () => (
  <>
    <Stack.Screen options={{ headerShown: false }} />
    <ThemeProvider forceDark>
      <PasseInner />
    </ThemeProvider>
  </>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, position: "relative" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PassePage;
