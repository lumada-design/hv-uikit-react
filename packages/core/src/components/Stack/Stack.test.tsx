import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("should be defined", () => {
    const { container } = render(<Stack />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Stack />);
    expect(container).toMatchSnapshot();
  });
});
