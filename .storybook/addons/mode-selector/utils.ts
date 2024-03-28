const STORAGE_KEY = "sb-uikit-mode";

const modes = ["dawn", "wicked"] as const;
export type Mode = (typeof modes)[number];

export const setLocalMode = (value: Mode): void => {
  return localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalMode = (): string | null => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getInitialMode = (): Mode => {
  const localMode = getLocalMode() as Mode;

  if (localMode) {
    return localMode;
  }

  const prefersDark = window?.matchMedia?.(
    "(prefers-color-scheme: dark)",
  )?.matches;

  return prefersDark ? "wicked" : "dawn";
};
