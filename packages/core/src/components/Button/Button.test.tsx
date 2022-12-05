import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("should render correctly", () => {
    const { container } = render(<Button />);
    expect(container).toBeDefined();
  });
});
