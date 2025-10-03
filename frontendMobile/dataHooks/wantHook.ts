import { useState, useEffect, useCallback } from "react";
import { fetchUserWant, WantDTO } from "../services/wantService";

export const useUserWant = (userId: number | null) => {
  const [want, setWant] = useState<WantDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadWant = useCallback(async () => {
    if (!userId) {
      setWant(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchUserWant(userId);
      setWant(data);
    } catch (e) {
      console.error("[useUserWant] Failed to load want:", e);
      setError("Failed to load want list");
      setWant(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadWant();
  }, [loadWant]);

  const refreshWant = useCallback(() => {
    return loadWant();
  }, [loadWant]);

  return {
    want,
    loading,
    error,
    refreshWant,
  };
};
