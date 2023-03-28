import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HvPanel } from "./";
import { HvTypography } from "components";

describe("Panel", () => {
  it("should be defined", () => {
    const { container } = render(
      <HvPanel>
        <HvTypography>Panel Content</HvTypography>
      </HvPanel>
    );
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
      <HvPanel>
        <HvTypography>Panel Content</HvTypography>
      </HvPanel>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the Panel", async () => {
    const { container, findAllByText } = render(
      <HvPanel>
        <HvTypography>Panel Content</HvTypography>
      </HvPanel>
    );
    const component = await findAllByText("Panel Content");
    expect(component.length).toBe(1);
    expect(container).toBeDefined();
  });
});
