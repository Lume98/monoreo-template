/**
 * Theme configuration and utilities for shadcn-ui themes
 */

export type ThemeName = "default" | "rose" | "blue" | "green";
export type ThemeMode = "light" | "dark";

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  description: string;
}

/**
 * Available themes configuration
 */
export const themes: Record<ThemeName, ThemeConfig> = {
  default: {
    name: "default",
    displayName: "Default",
    description: "Default neutral theme",
  },
  rose: {
    name: "rose",
    displayName: "Rose",
    description: "Rose color theme",
  },
  blue: {
    name: "blue",
    displayName: "Blue",
    description: "Blue color theme",
  },
  green: {
    name: "green",
    displayName: "Green",
    description: "Green color theme",
  },
};

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}

/**
 * Get theme configuration by name
 */
export function getTheme(name: ThemeName): ThemeConfig {
  return themes[name];
}

/**
 * Apply theme to document
 * @param themeName - Name of the theme to apply
 * @param mode - Light or dark mode
 */
export function applyTheme(themeName: ThemeName = "default", mode: ThemeMode = "light"): void {
  if (typeof document === "undefined") {
    return;
  }

  const html = document.documentElement;

  // Remove existing theme attributes
  html.removeAttribute("data-theme");
  html.classList.remove("dark");

  // Apply theme
  if (themeName !== "default") {
    html.setAttribute("data-theme", themeName);
  }

  // Apply dark mode
  if (mode === "dark") {
    html.classList.add("dark");
  }
}

/**
 * Get current theme from document
 */
export function getCurrentTheme(): { theme: ThemeName; mode: ThemeMode } {
  if (typeof document === "undefined") {
    return { theme: "default", mode: "light" };
  }

  const html = document.documentElement;
  const themeAttr = html.getAttribute("data-theme");
  const theme = (themeAttr as ThemeName) || "default";
  const mode = html.classList.contains("dark") ? "dark" : "light";

  return { theme, mode };
}

/**
 * Toggle dark mode
 */
export function toggleDarkMode(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  const html = document.documentElement;
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    return "light";
  } else {
    html.classList.add("dark");
    return "dark";
  }
}

