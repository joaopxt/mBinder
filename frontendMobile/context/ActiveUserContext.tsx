import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { UsuarioDTO } from "../services/usuarioService";
import { fetchUserWant, WantDTO } from "../services/wantService";

interface ActiveUserContextValue {
  user: UsuarioDTO | null;
  setUser: (u: UsuarioDTO | null) => void;
  isSelected: boolean;
  clear: () => void;
  want: WantDTO | null;
  wantLoading: boolean;
  refreshWant: () => Promise<void>;
}

const ActiveUserContext = createContext<ActiveUserContextValue | undefined>(
  undefined
);

export const ActiveUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);
  const [want, setWant] = useState<WantDTO | null>(null);
  const [wantLoading, setWantLoading] = useState(false);

  const loadWant = useCallback(async (userId: number) => {
    setWantLoading(true);
    try {
      const data = await fetchUserWant(userId);
      setWant(data);
    } catch (e) {
      console.log("[ActiveUser] Falha ao carregar want", e);
      setWant(null);
    } finally {
      setWantLoading(false);
    }
  }, []);

  // Quando o usuário muda, recarrega want
  useEffect(() => {
    if (user?.id) {
      loadWant(user.id);
    } else {
      setWant(null);
    }
  }, [user, loadWant]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isSelected: !!user,
      clear: () => {
        setUser(null);
        setWant(null);
      },
      want,
      wantLoading,
      refreshWant: async () => {
        if (user?.id) await loadWant(user.id);
      },
    }),
    [user, want, wantLoading, loadWant]
  );

  return (
    <ActiveUserContext.Provider value={value}>
      {children}
    </ActiveUserContext.Provider>
  );
};

export function useActiveUser() {
  const ctx = useContext(ActiveUserContext);
  if (!ctx)
    throw new Error(
      "useActiveUser deve ser usado dentro de ActiveUserProvider"
    );
  return ctx;
}
