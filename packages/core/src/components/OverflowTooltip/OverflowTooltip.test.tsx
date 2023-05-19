import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvOverflowTooltip } from "./OverflowTooltip";

describe("OverflowTooltip", () => {
  it("should be defined", () => {
    const { container } = render(<HvOverflowTooltip data="" />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvOverflowTooltip data="" />);
    expect(container).toMatchSnapshot();
  });
});
