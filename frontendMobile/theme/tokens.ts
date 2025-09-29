// Unified theme typing (resolves TS error where LIGHT_THEME was not assignable to typeof DARK_THEME)

export const BASE_COLORS = {
  primary: "#f98006",
  primarySoft: "rgba(249,128,6,0.18)",
  primarySoftAlt: "rgba(249,128,6,0.3)",
  success: "#23A55A",
  warning: "#FFB300",
  danger: "#D32F2F",
};

type Mode = "dark" | "light";

interface ThemeStructure {
  mode: Mode;
  bg: {
    base: string;
    alt: string;
    tile: string;
    tileAlt: string;
    input: string;
    separator: string;
  };
  text: {
    primary: string;
    muted: string;
    invert: string;
  };
  border: {
    base: string;
    strong: string;
  };
  primary: string;
  primarySoft: string;
  primarySoftAlt: string;
  success: string;
  warning: string;
  danger: string;
}

export const DARK_THEME: ThemeStructure = {
  mode: "dark",
  bg: {
    base: "#23190f",
    alt: "#2d2116",
    tile: "rgba(255,255,255,0.06)",
    tileAlt: "rgba(255,255,255,0.1)",
    input: "rgba(255,255,255,0.07)",
    separator: "rgba(255,255,255,0.08)",
  },
  text: {
    primary: "#f8f7f5",
    muted: "rgba(248,247,245,0.65)",
    invert: "#23190f",
  },
  border: {
    base: "rgba(248,247,245,0.12)",
    strong: "rgba(248,247,245,0.24)",
  },
  ...BASE_COLORS,
};

export const LIGHT_THEME: ThemeStructure = {
  mode: "light",
  bg: {
    base: "#f8f7f5",
    alt: "#ffffff",
    tile: "rgba(0,0,0,0.05)",
    tileAlt: "rgba(0,0,0,0.08)",
    input: "rgba(0,0,0,0.06)",
    separator: "rgba(0,0,0,0.08)",
  },
  text: {
    primary: "#23190f",
    muted: "rgba(35,25,15,0.55)",
    invert: "#f8f7f5",
  },
  border: {
    base: "rgba(35,25,15,0.18)",
    strong: "rgba(35,25,15,0.28)",
  },
  ...BASE_COLORS,
};

export type AppTheme = ThemeStructure;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  pill: 999,
};

export const getTheme = (dark = true): AppTheme =>
  dark ? DARK_THEME : LIGHT_THEME;

export const isDarkTheme = (t: AppTheme) => t.mode === "dark";
