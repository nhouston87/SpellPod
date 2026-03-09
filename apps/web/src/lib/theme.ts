export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'spellpod.theme';

export function applyTheme(theme: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getStoredTheme(): ThemeMode | null {
  const value = localStorage.getItem(THEME_KEY);
  return value === 'light' || value === 'dark' ? value : null;
}

export function setStoredTheme(theme: ThemeMode): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function initializeTheme(): ThemeMode {
  const stored = getStoredTheme();
  const resolved: ThemeMode = stored ?? 'light';
  applyTheme(resolved);
  return resolved;
}
