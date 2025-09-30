import { Stack } from "expo-router";
import { ActiveUserProvider } from "../context/ActiveUserContext";

export default function Layout() {
  return (
    <ActiveUserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="login/LoginPage" options={{ title: "Login" }} />
        <Stack.Screen name="deck/DeckPage" options={{ title: "Decks" }} />
        <Stack.Screen name="library/LibPage" options={{ title: "Library" }} />
        <Stack.Screen name="passe/PassePage" options={{ title: "Passe" }} />
        <Stack.Screen name="usuario/UserPage" options={{ title: "Usuário" }} />
        <Stack.Screen name="want/WantPage" options={{ title: "Want" }} />
      </Stack>
    </ActiveUserProvider>
  );
}
