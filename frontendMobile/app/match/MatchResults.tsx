import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemeProvider, useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import HeaderBar from "../../components/layout/HeaderBar";
import TradeUserItem from "./components/TradeUserItem";
import { TradeUser, MatchType } from "../../types/matchTypes";
import Sidebar from "@/components/layout/Sidebar";

const mockUsers: TradeUser[] = [
  {
    id: "1",
    name: "Ethan Carter",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmjOEEXr5WhulBXRhTtIFjI_Ytw_8mWNXur9y17B95YiMELU6rl8wb35HcbmO9wVIAktVE5TIcIjiztoVgaQ-NBC6IKePcBg-JDZ6KEZ1pNol7Z9f57Sh63_Hw1p2lNq9FfjZUJFGTzpF2fZFAyHWSDSDdVSpp81N3YykbRCsgsmOQ1cDyk0Hh1-5D-dTl5zTD31fr8bpSXiduwSUnWrB_NiRHPDZfB-81YkrEcYCYkW_I99Ap7uQC2BwhBJu6FSvcF1HBgy4irG03",
    commonCards: 12,
  },
  {
    id: "2",
    name: "Olivia Bennett",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuu53lMam2_-Hl-CqAWvzAZ9UwikITPDIW9w7SfzcdvoUxY1EJkr96Kp5ybMbZxVx0TcGC5TrPDqFD9kpobdbGFgfU_6yC1GmhXuV15wyLc6btSWcYkPwuj4-JmeyeRyEgrJTLym4e2DfoYt8TVPrzZ7T6DJG6lWsWBQn8Ci_sDFti5GtRMNAv-4gT_vP2_ss3IZ_g335WFGUdqgwjgOnKjrC87jBEGe0S525LnI7_ARwVzkOOX0CoYjDzAh-mDxviRZA9CzltRcGt",
    commonCards: 2,
  },
  {
    id: "3",
    name: "Noah Thompson",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRaRMEQuCHTZycU-_Aid6adJQ0ne3VsWjzGqjuEshHA52wIKSF68fRfMYlL2EGJKRoQsqqpeCxJuCRjCaX1BQoldTlaUhKyRzGoqz1BujV0OSJyj8iL6tt0FqyynUFdWlCaYthId8ypT9okKq-SdVoQDCTGz4zZPCvmng_VWPXkrNlN0bk2T9SODmyuEIdaV1Ao9VFsg9FmGLm_craOOqzIrw5OXhXUF4uuRcjFDWj_1BSBtmAmsr312EATbyU_u-zer_i5Uz2sYP9",
    commonCards: 1,
  },
];

const MatchResultsInner: React.FC = () => {
  const t = useAppTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ type: MatchType }>();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleMenuPress = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigate = (route: string) => {
    setSidebarVisible(false);
    router.push(route as any);
  };

  const handleUserPress = useCallback(
    (user: TradeUser) => {
      router.push(`/match/TradePair?userId=${user.id}&type=${params.type}`);
    },
    [router, params.type]
  );

  const renderUser = useCallback(
    ({ item }: { item: TradeUser }) => (
      <TradeUserItem user={item} onPress={handleUserPress} />
    ),
    [handleUserPress]
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: t.bg.base }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: t.bg.base }]}>
        <HeaderBar title="Match Results" onMenuPress={handleMenuPress} />

        <View style={styles.content}>
          <Text style={[styles.title, { color: t.text.primary }]}>
            Potential Trades
          </Text>

          <FlatList
            data={mockUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderUser}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Sidebar
          visible={sidebarVisible}
          activeRoute="/match/MatchResults"
          onNavigate={handleNavigate}
          onClose={() => setSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const MatchResults: React.FC = () => (
  <ThemeProvider forceDark>
    <MatchResultsInner />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.lg,
  },
  list: {
    gap: SPACING.sm,
    paddingBottom: 100, // Space for bottom nav
  },
});

export default MatchResults;
