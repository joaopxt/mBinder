import api from "./api";
import axios from "./api";

export interface BulkImportResult {
  added: string[];
  notFound: string[];
  alreadyExists: string[];
}

export const getDecks = async () => {
  const response = await axios.get("/deck");
  return response.data;
};

export const getDeckById = async (id: number) => {
  const response = await axios.get(`/deck/${id}`);
  return response.data;
};

export const createDeck = async (data: any) => {
  const response = await axios.post("/deck", data);
  return response.data;
};

export async function bulkImportCards(
  deckId: number,
  cardNames: string[]
): Promise<BulkImportResult> {
  try {
    console.log(
      `[deckService] Bulk importing ${cardNames.length} cards for deck ${deckId}`
    );

    const response = await api.post<BulkImportResult>(
      `/deck/${deckId}/bulk-import`,
      { cardNames }
    );

    console.log(`[deckService] Bulk import result:`, response.data);
    return response.data;
  } catch (error) {
    console.error("[deckService] Bulk import failed:", error);
    throw new Error("Failed to import cards");
  }
}
