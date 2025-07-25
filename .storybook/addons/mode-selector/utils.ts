const STORAGE_KEY = "sb-uikit-mode";

export type Mode = "light" | "dark";

export const setLocalMode = (value: Mode) => {
  localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalMode = () => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getInitialMode = (): Mode => {
  const localMode = getLocalMode();

  if (localMode) return localMode as Mode;

  const prefersDark = window?.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;

  return prefersDark ? "dark" : "light";
};
