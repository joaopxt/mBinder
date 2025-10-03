import api from "./api";
import CollectionCard from "../types/cardTypes";

export interface SearchResult {
  id: string;
  name: string;
  imageNormal?: string;
  imageSmall?: string;
  setName?: string;
  typeLine?: string;
}

export async function searchCards(
  query: string,
  limit: number = 5
): Promise<SearchResult[]> {
  try {
    if (!query || query.trim().length === 0) {
      console.log("[libraryService] Empty query provided");
      return [];
    }

    console.log(
      `[libraryService] Searching for: "${query}" with limit: ${limit}`
    );

    const response = await api.get<SearchResult[]>("/library/search", {
      params: { query: query.trim(), limit },
    });

    console.log(`[libraryService] API Response:`, response.data);
    console.log(`[libraryService] Found ${response.data.length} results`);

    // Validate the response structure
    if (!Array.isArray(response.data)) {
      console.error(
        "[libraryService] Invalid response format - not an array:",
        response.data
      );
      return [];
    }

    return response.data;
  } catch (error: unknown) {
    console.error("[libraryService] Search failed:", error);

    // Type guard for axios error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as any; // Type assertion for axios error
      console.error(
        "[libraryService] Error response:",
        axiosError.response?.data
      );
      console.error(
        "[libraryService] Error status:",
        axiosError.response?.status
      );
    } else if (error instanceof Error) {
      console.error("[libraryService] Error message:", error.message);
    } else {
      console.error("[libraryService] Unknown error type:", String(error));
    }

    return [];
  }
}

export async function searchAllCards(query: string): Promise<SearchResult[]> {
  try {
    if (!query || query.trim().length === 0) {
      console.log("[libraryService] Empty query provided for searchAllCards");
      return [];
    }

    console.log(`[libraryService] Searching all cards for: "${query}"`);

    const response = await api.get<SearchResult[]>("/library/search/all", {
      params: { query: query.trim() },
    });

    console.log(`[libraryService] Found ${response.data.length} total results`);
    return response.data;
  } catch (error: unknown) {
    console.error("[libraryService] Search all failed:", error);

    // Type guard for axios error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as any; // Type assertion for axios error
      console.error(
        "[libraryService] Error response:",
        axiosError.response?.data
      );
      console.error(
        "[libraryService] Error status:",
        axiosError.response?.status
      );
    } else if (error instanceof Error) {
      console.error("[libraryService] Error message:", error.message);
    } else {
      console.error("[libraryService] Unknown error type:", String(error));
    }

    return [];
  }
}
