import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { UsuarioDTO } from "../services/usuarioService";

interface ActiveUserContextValue {
  user: UsuarioDTO | null;
  setUser: (u: UsuarioDTO | null) => void;
  isSelected: boolean;
  clear: () => void;
}

const ActiveUserContext = createContext<ActiveUserContextValue | undefined>(
  undefined
);

export const ActiveUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioDTO | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isSelected: !!user,
      clear: () => setUser(null),
    }),
    [user]
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
