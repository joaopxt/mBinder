import { useState, useEffect, useCallback } from "react";
import { fetchUserPasse, PasseDTO } from "../services/passeService";

export const useUserPasse = (userId: number | null) => {
  const [passe, setPasse] = useState<PasseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPasse = useCallback(async () => {
    if (!userId) {
      setPasse(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchUserPasse(userId);
      setPasse(data);
    } catch (e) {
      console.error("[useUserPasse] Failed to load passe:", e);
      setError("Failed to load passe list");
      setPasse(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadPasse();
  }, [loadPasse]);

  const refreshPasse = useCallback(() => {
    return loadPasse();
  }, [loadPasse]);

  return {
    passe,
    loading,
    error,
    refreshPasse,
  };
};
