import { queryHelpers, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useTheme } from "@hitachivantara/uikit-react-utils";
import { ds5, pentahoPlus } from "@hitachivantara/uikit-styles";

import { createTheme } from "../utils/theme";
import { HvProvider } from "./Provider";

const Main = () => {
  const { changeTheme } = useTheme();

  return (
    <>
      <button type="button" onClick={() => changeTheme("ds5", "wicked")}>
        Update theme
      </button>
      <p>Theme provider test</p>
    </>
  );
};

const customThemeInherit = createTheme({
  name: "custom-theme",
  inheritColorModes: true,
});

const customThemeNoInherit = createTheme({
  name: "custom-theme",
  inheritColorModes: false,
  colors: {
    modes: {
      purple: {
        atmo1: "purple",
      },
    },
  },
});

describe("Provider", () => {
  it("should have the correct theme and color mode selected if no properties are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider cssTheme="scoped" rootElementId="hv-root">
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds5");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct theme and color mode selected if only the colorMode property is provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          colorMode="wicked"
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds5");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct theme and color mode selected if the themes and theme properties are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          themes={[ds5, customThemeInherit]}
          theme="custom-theme"
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "custom-theme",
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct theme and color mode selected if themes, theme and colorMode are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          themes={[ds5, customThemeNoInherit]}
          theme="custom-theme"
          colorMode="purple"
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "custom-theme",
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "purple",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct theme and color mode selected if only themes is provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          themes={[ds5, pentahoPlus, customThemeInherit]}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds5");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should update the theme and color mode correctly", async () => {
    const { container, getByRole } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          themes={[ds5, pentahoPlus, customThemeNoInherit]}
          theme="custom-theme"
          colorMode="purple"
        >
          <Main />
        </HvProvider>
      </div>,
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "custom-theme",
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "purple",
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();

    const button = getByRole("button");

    await userEvent.click(button);

    const updatedTheme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "ds5",
    );
    const updatedMode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked",
    );

    expect(updatedTheme).toBeInTheDocument();
    expect(updatedMode).toBeInTheDocument();
  });
});
