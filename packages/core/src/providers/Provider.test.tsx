import { queryHelpers, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { describe, expect, it } from "vitest";
import { HvProvider } from "./Provider";
import { HvThemeContext } from "./ThemeProvider";

const Main = () => {
  const { changeTheme } = useContext(HvThemeContext);

  return (
    <>
      <button onClick={() => changeTheme("ds3", "wicked")}>Update theme</button>
      <p>Theme provider test</p>
    </>
  );
};

describe("Provider", () => {
  it("should have the correct default theme and mode if no theme property is provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider rootElementId="hv-root">
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds5");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct default theme and selected mode if only baseColorMode property is provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseColorMode: "wicked",
          }}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds5");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct selected theme and default mode if only baseTheme property is provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseTheme: "ds3",
          }}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds3");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct selected theme and mode if baseTheme and baseColorMode are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseTheme: "ds3",
            baseColorMode: "wicked",
          }}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute("data-theme", container, "ds3");
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the new theme and correct mode selected if name and baseColorMode are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseTheme: "ds3",
            baseColorMode: "wicked",
            name: "new-theme",
          }}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "new-theme"
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the new theme and mode selected if name, baseColorMode and customizations are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseTheme: "ds5",
            baseColorMode: "purple",
            name: "new-theme",
            colors: {
              modes: {
                purple: {
                  atmo2: "#a32cc4",
                },
              },
            },
          }}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "new-theme"
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "purple"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should update the theme and mode correctly", async () => {
    const { container, getByRole } = render(
      <div id="hv-root">
        <HvProvider
          rootElementId="hv-root"
          theme={{
            baseTheme: "ds3",
            baseColorMode: "dawn",
            name: "new-theme",
          }}
        >
          <Main />
        </HvProvider>
      </div>
    );

    const theme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "new-theme"
    );
    const mode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "dawn"
    );

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();

    const button = getByRole("button");

    await userEvent.click(button);

    const updatedTheme = queryHelpers.queryByAttribute(
      "data-theme",
      container,
      "ds3"
    );
    const updatedMode = queryHelpers.queryByAttribute(
      "data-color-mode",
      container,
      "wicked"
    );

    expect(updatedTheme).toBeInTheDocument();
    expect(updatedMode).toBeInTheDocument();
  });
});
