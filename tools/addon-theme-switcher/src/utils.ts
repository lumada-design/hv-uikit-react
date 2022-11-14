import { STORAGE_KEY } from "./constants";

export const setLocalTheme = (value: string): void => {
  return localStorage?.setItem(STORAGE_KEY, value);
};

export const getLocalTheme = (): string | null => {
  return localStorage?.getItem(STORAGE_KEY);
};
