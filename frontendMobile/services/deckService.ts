import axios from "./api";

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
