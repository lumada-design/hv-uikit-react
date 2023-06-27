const STORAGE_KEY = "sb-uikit-mode";

export const setLocalMode = (value: string): void => {
  return localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalMode = (): string | null => {
  return localStorage?.getItem(STORAGE_KEY);
};

export const getInitialMode = () => {
  const localMode = getLocalMode();
  /* const prefersDark = window?.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches; */

  return localMode ?? "wicked";
};
