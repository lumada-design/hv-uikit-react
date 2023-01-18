import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvLabel } from "./Label";

describe("Label", () => {
  it("should be defined", () => {
    const { container } = render(<HvLabel />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvLabel />);
    expect(container).toMatchSnapshot();
  });
});
