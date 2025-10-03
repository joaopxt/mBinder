import api from "./api";

export interface WantCardDTO {
  id: number;
  name: string;
  set?: string;
  image?: string;
}

export interface WantDTO {
  id: number;
  usuarioId: number;
  cartas: WantCardDTO[];
}

export interface BulkImportResult {
  added: string[];
  notFound: string[];
  alreadyExists: string[];
}

export async function fetchUserWant(userId: number): Promise<WantDTO | null> {
  try {
    console.log(`[wantService] Fetching want for user ${userId}`);
    const response = await api.get<WantDTO | null>(`/want/user/${userId}`);
    console.log(`[wantService] Want data received:`, response.data);
    return response.data;
  } catch (error) {
    console.error("[wantService] Failed to fetch user want:", error);
    throw new Error("Failed to fetch want");
  }
}

export async function bulkImportCards(
  userId: number,
  cardNames: string[]
): Promise<BulkImportResult> {
  try {
    console.log(
      `[wantService] Bulk importing ${cardNames.length} cards for user ${userId}`
    );

    const response = await api.post<BulkImportResult>(
      `/want/${userId}/bulk-import`, // <-- THIS SHOULD CALL /want/ NOT /passe/
      { cardNames }
    );

    console.log(`[wantService] Bulk import result:`, response.data);
    return response.data;
  } catch (error) {
    console.error("[wantService] Bulk import failed:", error);
    throw new Error("Failed to import cards to want list");
  }
}

export async function addCardToWant(
  userId: number,
  cardId: number
): Promise<void> {
  try {
    console.log(
      `[wantService] Adding card ${cardId} to user ${userId} want list`
    );

    const response = await api.post(`/want/${userId}/add-card/${cardId}`);

    console.log(
      `[wantService] Card added to want list successfully:`,
      response.data
    );
  } catch (error: any) {
    console.error("[wantService] Failed to add card to want list:", error);

    if (error.response?.status === 409) {
      throw new Error("Card is already in your want list");
    } else if (error.response?.status === 404) {
      throw new Error("Card or user not found");
    } else {
      throw new Error("Failed to add card to want list");
    }
  }
}
