import api from "./api";

export interface PasseCardDTO {
  id: number;
  name: string;
  set?: string;
  image?: string;
}

export interface PasseDTO {
  id: number;
  usuarioId: number;
  cartas: PasseCardDTO[];
}

export interface BulkImportResult {
  added: string[];
  notFound: string[];
  alreadyExists: string[];
}

export async function fetchUserPasse(userId: number): Promise<PasseDTO | null> {
  const res = await api.get<PasseDTO | null>(`/passe/user/${userId}`);
  return res.data;
}

export async function bulkImportCards(
  userId: number,
  cardNames: string[]
): Promise<BulkImportResult> {
  try {
    console.log(
      `[passeService] Bulk importing ${cardNames.length} cards for user ${userId}`
    );

    const response = await api.post<BulkImportResult>(
      `/passe/${userId}/bulk-import`,
      { cardNames }
    );

    console.log(`[passeService] Bulk import result:`, response.data);
    return response.data;
  } catch (error) {
    console.error("[passeService] Bulk import failed:", error);
    throw new Error("Failed to import cards");
  }
}

export async function addCardToPasse(
  userId: number,
  cardId: number
): Promise<void> {
  try {
    console.log(`[passeService] Adding card ${cardId} to user ${userId} passe`);

    const response = await api.post(`/passe/${userId}/add-card/${cardId}`);

    console.log(
      `[passeService] Card added to passe successfully:`,
      response.data
    );
  } catch (error: any) {
    console.error("[passeService] Failed to add card to passe:", error);

    if (error.response?.status === 409) {
      throw new Error("Card is already in your passe");
    } else if (error.response?.status === 404) {
      throw new Error("Card or user not found");
    } else {
      throw new Error("Failed to add card to passe");
    }
  }
}
