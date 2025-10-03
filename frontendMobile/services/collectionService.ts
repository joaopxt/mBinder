import api from "./api";

export interface ColecaoCardDTO {
  id: number;
  name: string;
  set?: string;
  image?: string;
}

export interface ColecaoDTO {
  id: number;
  usuarioId: number;
  cartas: ColecaoCardDTO[];
}

export interface BulkImportResult {
  added: string[];
  notFound: string[];
  alreadyExists: string[];
}

export async function fetchUserColecao(
  userId: number
): Promise<ColecaoDTO | null> {
  const res = await api.get<ColecaoDTO | null>(`/colecao/user/${userId}`);
  return res.data;
}

export async function bulkImportCards(
  userId: number,
  cardNames: string[]
): Promise<BulkImportResult> {
  try {
    console.log(
      `[colecaoService] Bulk importing ${cardNames.length} cards for user ${userId}`
    );

    const response = await api.post<BulkImportResult>(
      `/colecao/${userId}/bulk-import`,
      { cardNames }
    );

    console.log(`[colecaoService] Bulk import result:`, response.data);
    return response.data;
  } catch (error) {
    console.error("[colecaoService] Bulk import failed:", error);
    throw new Error("Failed to import cards");
  }
}
