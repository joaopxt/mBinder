import { useState } from "react";
import { findMatches, MatchCardResult } from "../services/matchService";
import { MatchType } from "../types/matchTypes";

export function useMatches() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMatches = async (
    userId: number,
    type: MatchType
  ): Promise<MatchCardResult[]> => {
    setLoading(true);
    setError(null);

    try {
      console.log("[matchHook] Loading matches for:", { userId, type });
      const matches = await findMatches(userId, type);
      console.log("[matchHook] Loaded matches:", matches);
      return matches;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("[matchHook] Failed to load matches:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loadMatches,
    loading,
    error,
  };
}
