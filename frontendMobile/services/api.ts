import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

function resolveHost() {
  // Em desenvolvimento Expo expõe hostUri (ex: 192.168.100.151:8081)
  const hostUri =
    (Constants as any).expoConfig?.hostUri ||
    (Constants as any).manifest?.debuggerHost ||
    (Constants as any).manifest2?.extra?.expoClient?.hostUri ||
    "";
  if (hostUri) {
    const host = hostUri.split(":")[0];
    return host;
  }
  return "localhost";
}

const devHost = resolveHost();

// Se for emulador Android oficial podemos usar 10.0.2.2; caso físico, usamos devHost
const isAndroid = Platform.OS === "android";
const baseURL = isAndroid
  ? `http://${devHost === "localhost" ? "10.0.2.2" : devHost}:3000`
  : `http://${devHost}:3000`;

console.log("[API] baseURL =", baseURL);

const api = axios.create({
  baseURL,
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() ?? "GET";
  const base = config.baseURL ?? api.defaults.baseURL ?? "";
  const url = config.url ?? "";
  console.log("[API REQUEST]", method, base + url);
  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log("[API RESPONSE]", res.status, res.config.url);
    return res;
  },
  (err) => {
    const url = err?.config?.url
      ? (err?.config?.baseURL ?? "") + err.config.url
      : "(unknown url)";
    console.log(
      "[API ERROR]",
      err?.message,
      url,
      "status:",
      err?.response?.status
    );
    return Promise.reject(err);
  }
);

export default api;
