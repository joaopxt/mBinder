import api from "./api";

export interface UsuarioDTO {
  id: number;
  nome: string;
  nickname: string;
  celular: string;
  idade?: number;
}

export async function fetchUsuarios(): Promise<UsuarioDTO[]> {
  try {
    const res = await api.get<UsuarioDTO[]>("/usuario");
    return res.data;
  } catch (error: any) {
    console.error(
      "[fetchUsuarios] falha:",
      error?.response?.status,
      error?.message
    );
    throw error;
  }
}
