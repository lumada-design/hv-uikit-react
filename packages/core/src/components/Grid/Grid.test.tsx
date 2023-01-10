import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { HvGrid } from "./Grid";

describe("Grid", () => {
  it("should be defined", () => {
    const { container } = render(<HvGrid />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvGrid />);
    expect(container).toMatchSnapshot();
  });
});
