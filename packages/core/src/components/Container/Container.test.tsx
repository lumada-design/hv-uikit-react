import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvContainer } from "./Container";

describe("Container", () => {
  it("should be defined", () => {
    const { container } = render(<HvContainer />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvContainer />);
    expect(container).toMatchSnapshot();
  });
});
