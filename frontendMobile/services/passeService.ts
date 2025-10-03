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

export async function fetchUserPasse(userId: number): Promise<PasseDTO | null> {
  const res = await api.get<PasseDTO | null>(`/passe/user/${userId}`);
  return res.data;
}
