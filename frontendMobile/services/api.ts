import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL do backend
  timeout: 5000,
});

export default api;
