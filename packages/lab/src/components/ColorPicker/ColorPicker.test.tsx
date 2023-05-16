import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvColorPicker } from "./ColorPicker";

describe("ColorPicker", () => {
  it("should render correctly full color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          onChange={(color) => console.log(color)}
          expanded={true}
        />
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
          onChange={(color) => console.log(color)}
          expanded={true}
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
          onChange={(color) => console.log(color)}
          expanded={true}
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
        <HvColorPicker
          label="Color"
          iconOnly={true}
          onChange={(color) => console.log(color)}
        />
      </div>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly without saved colors icon color picker", () => {
    const { container } = render(
      <div style={{ width: "134px" }}>
        <HvColorPicker
          label="Color"
          iconOnly={true}
          onChange={(color) => console.log(color)}
          showSavedColors={true}
        />
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
          iconOnly={true}
          showSavedColors={true}
          showCustomColors={true}
          onChange={(color) => console.log(color)}
        />
      </div>
    );

    expect(container).toMatchSnapshot();
  });
});
