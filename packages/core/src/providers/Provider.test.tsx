import { render } from "@testing-library/react";
import { mergeTheme } from "@hitachivantara/uikit-styles";

import { ds5 } from "../themes/ds5";
import { HvProvider } from "./Provider";

const customTheme = mergeTheme(ds5, {
  name: "custom-theme",
});

describe("Provider", () => {
  it("has the color mode selected if no properties are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider cssTheme="scoped" rootElementId="hv-root">
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = container.querySelector("[data-theme=ds5]");
    const mode = container.querySelector("[data-color-mode=dawn]");

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("has the color mode selected if only the colorMode property is provided", () => {
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

    const theme = container.querySelector("[data-theme=ds5]");
    const mode = container.querySelector("[data-color-mode=wicked]");

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });

  it("should have the correct theme and color mode selected if the themes and theme properties are provided", () => {
    const { container } = render(
      <div id="hv-root">
        <HvProvider
          cssTheme="scoped"
          rootElementId="hv-root"
          theme={customTheme}
        >
          <p>Theme provider test</p>
        </HvProvider>
      </div>,
    );

    const theme = container.querySelector("[data-theme=custom-theme]");
    const mode = container.querySelector("[data-color-mode=dawn]");

    expect(theme).toBeInTheDocument();
    expect(mode).toBeInTheDocument();
  });
});
