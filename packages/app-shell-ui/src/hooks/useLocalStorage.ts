import { useEffect, useState } from "react";

export const LOCAL_STORAGE_KEYS = {
  COLOR_MODE: "hv/user-preferences/color-mode",
  NAV_EXPANDED: "hv/app-shell/expanded",
} satisfies Record<string, string>;

type StorageKey = keyof typeof LOCAL_STORAGE_KEYS;

const useLocalStorage = (storageKey: StorageKey) => {
  const key = LOCAL_STORAGE_KEYS[storageKey] || storageKey;
  const [value, setValue] = useState(() => localStorage.getItem(key));

  const setStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return { value, setStoredValue } as const;
};

export default useLocalStorage;
