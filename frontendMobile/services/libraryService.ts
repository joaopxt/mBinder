import api from "./api";

export interface SearchResult {
  id: string;
  name: string;
  imageNormal?: string;
  imageSmall?: string;
  setName?: string;
  typeLine?: string;
}

export interface CardVariant {
  id: number;
  setName: string;
  imageNormal?: string;
  imageSmall?: string;
}

export interface CardVariantsResponse {
  cardName: string;
  variants: CardVariant[];
  totalVariants: number;
}

// Helper function to handle errors properly
function handleApiError(error: unknown, context: string): void {
  console.error(`[libraryService] ${context} failed:`, error);

  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: any;
        status?: number;
        statusText?: string;
      };
      message?: string;
    };

    if (axiosError.response) {
      console.error(
        `[libraryService] Error response:`,
        axiosError.response.data
      );
      console.error(
        `[libraryService] Error status:`,
        axiosError.response.status
      );
      console.error(
        `[libraryService] Error statusText:`,
        axiosError.response.statusText
      );
    } else if (axiosError.message) {
      console.error(`[libraryService] Error message:`, axiosError.message);
    }
  } else if (error instanceof Error) {
    console.error(`[libraryService] Error message:`, error.message);
    console.error(`[libraryService] Error stack:`, error.stack);
  } else {
    console.error(`[libraryService] Unknown error type:`, String(error));
  }
}

export async function getCardById(cardId: string): Promise<SearchResult> {
  try {
    const response = await api.get<SearchResult>(`/library/${cardId}`);

    return response.data;
  } catch (error: unknown) {
    handleApiError(error, "Get card by ID");
    throw new Error("Failed to get card details");
  }
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

    const response = await api.get<SearchResult[]>("/library/search", {
      params: { query: query.trim(), limit },
    });

    if (!Array.isArray(response.data)) {
      console.error(
        "[libraryService] Invalid response format - not an array:",
        response.data
      );
      return [];
    }

    return response.data;
  } catch (error: unknown) {
    handleApiError(error, "Search");
    return [];
  }
}

export async function searchAllCards(query: string): Promise<SearchResult[]> {
  try {
    if (!query || query.trim().length === 0) {
      console.log("[libraryService] Empty query provided for searchAllCards");
      return [];
    }

    const response = await api.get<SearchResult[]>("/library/search/all", {
      params: { query: query.trim() },
    });

    return response.data;
  } catch (error: unknown) {
    handleApiError(error, "Search all");
    return [];
  }
}

export async function getCardVariants(
  cardId: number
): Promise<CardVariantsResponse> {
  try {
    console.log(`[libraryService] Fetching variants for card ID: ${cardId}`);
    const response = await api.get<CardVariantsResponse>(
      `/library/card/${cardId}/variants`
    );
    console.log(`[libraryService] Variants response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`[libraryService] Failed to fetch card variants:`, error);
    throw new Error("Failed to fetch card variants");
  }
}

export async function getCardVariantsByName(
  cardName: string
): Promise<CardVariantsResponse> {
  try {
    const response = await api.get<CardVariantsResponse>(
      `/library/card/name/${encodeURIComponent(cardName)}/variants`
    );
    return response.data;
  } catch (error) {
    console.error(
      `[libraryService] Failed to fetch card variants by name:`,
      error
    );
    throw new Error("Failed to fetch card variants");
  }
}
