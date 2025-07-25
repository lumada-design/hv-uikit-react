import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import {
  HvAppShellEventTheme,
  HvAppShellEventThemeTrigger,
} from "@hitachivantara/app-shell-events";

import { LOCAL_STORAGE_KEYS } from "./useLocalStorage";
import useThemeEventListenerHook from "./useThemeEventListener";

const mockedChangeTheme = vi.fn();
const mockedChangeMode = vi.fn();
vi.mock("@hitachivantara/uikit-react-core", async () => {
  const mod = await vi.importActual("@hitachivantara/uikit-react-core");
  return {
    ...mod,
    useTheme: () => {
      return {
        selectedTheme: "dummyTheme",
        changeTheme: mockedChangeTheme,
        changeMode: mockedChangeMode,
        selectedMode: "light",
        colorModes: ["light", "dark"],
      };
    },
  };
});

describe("useThemeEventListener Hook", () => {
  afterEach(() => {
    vi.resetAllMocks();
    localStorage.removeItem(LOCAL_STORAGE_KEYS.COLOR_MODE);
  });

  it("should call `changeTheme` with selectedTheme and the new colorMode, the new color should be stored in the localStorage", () => {
    const { result: themeEventListenerHook } = renderHook(() =>
      useThemeEventListenerHook(),
    );

    themeEventListenerHook.current.handleThemeEvent(
      new CustomEvent<HvAppShellEventTheme>(HvAppShellEventThemeTrigger, {
        detail: { colorMode: "light" },
      }),
    );

    expect(mockedChangeMode).toHaveBeenCalledWith("light");
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.COLOR_MODE)).toBe("light");
  });
});
