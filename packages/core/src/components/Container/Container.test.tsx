import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "./Container";

describe("Container", () => {
  it("should be defined", () => {
    const { container } = render(<Container />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<Container />);
    expect(container).toMatchSnapshot();
  });
});
