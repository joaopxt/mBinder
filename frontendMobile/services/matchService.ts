import api from "./api";
import { TradeCard } from "../types/cardTypes";

// Keep old interface for backward compatibility if needed
export interface MatchResult {
  carta: string;
  usuario: string;
  tipo: string;
}

// New interface that includes full card data with image
export interface MatchCardResult {
  id: string;
  name: string;
  image: string;
  usuario: string;
  tipo: "want" | "passe";
  set?: string;
}

export interface MatchResponse {
  message?: string;
  matches?: MatchCardResult[];
}

export async function findMatches(
  userId: number,
  type: "want" | "passe"
): Promise<MatchCardResult[]> {
  try {
    console.log(
      `[matchService] Calling GET /usuario/${userId}/matches?type=${type}`
    );

    const response = await api.get<MatchCardResult[] | { message: string }>(
      `/usuario/${userId}/matches?type=${type}`
    );

    console.log("[matchService] Raw response:", response.data);

    // Handle both array response and message response
    if (Array.isArray(response.data)) {
      console.log("[matchService] Returning matches array:", response.data);
      return response.data;
    } else {
      console.log("[matchService] No matches found:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("[matchService] Failed to fetch matches:", error);
    throw new Error("Failed to load matches");
  }
}

export async function findMatchesBetweenUsers(
  userId: number,
  targetUserId: number,
  type: "want" | "passe"
): Promise<MatchCardResult[]> {
  try {
    const response = await api.get<MatchCardResult[] | { message: string }>(
      `/usuario/${userId}/matches/${targetUserId}?type=${type}`
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.log("No matches found between users:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch matches between users:", error);
    throw new Error("Failed to load matches between users");
  }
}
