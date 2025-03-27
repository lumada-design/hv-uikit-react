import { renderHook } from "@testing-library/react";

import useLocalStorageHook from "../useLocalStorage";

const LOCAL_STORAGE_DUMMY_KEY = "dummyKey";

describe("useThemeEventListener Hook", () => {
  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_DUMMY_KEY);
  });

  it("should have the value as null in the first call", () => {
    const { result: localStorageHook } = renderHook(() =>
      useLocalStorageHook(LOCAL_STORAGE_DUMMY_KEY),
    );

    expect(localStorageHook.current.value).toBeNull();
    expect(localStorage.getItem(LOCAL_STORAGE_DUMMY_KEY)).toBeNull();
  });

  it("should store the new value in the localStorage", () => {
    const { result: localStorageHook } = renderHook(() =>
      useLocalStorageHook(LOCAL_STORAGE_DUMMY_KEY),
    );

    expect(localStorage.getItem(LOCAL_STORAGE_DUMMY_KEY)).toBeNull();

    localStorageHook.current.setStoredValue("dummyValue1");

    expect(localStorage.getItem(LOCAL_STORAGE_DUMMY_KEY)).toBe("dummyValue1");
  });
});
