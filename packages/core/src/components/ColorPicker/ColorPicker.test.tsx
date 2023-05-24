import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("should render correctly full color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker label="Color" expanded />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly without saved colors color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          defaultValue="#de2beb"
          expanded
          showSavedColors={false}
        />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly recommended colors only color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          defaultValue="#de2beb"
          expanded
          showSavedColors={false}
          showCustomColors={false}
        />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly full color icon picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker label="Color" iconOnly />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly without saved colors icon color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker label="Color" iconOnly showSavedColors />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly recommended colors only icon color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          defaultValue="#de2beb"
          iconOnly
          showSavedColors
          showCustomColors
        />
      </div>
    );

    expect(container).toMatchSnapshot();
  });
});
