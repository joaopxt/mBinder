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

export async function fetchUserWant(userId: number): Promise<WantDTO | null> {
  const res = await api.get<WantDTO | null>(`/want/user/${userId}`);
  return res.data;
}
