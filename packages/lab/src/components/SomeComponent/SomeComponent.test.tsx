import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvSomeComponent } from "./SomeComponent";

describe("Avatar", () => {
  it("should be defined", () => {
    const { container } = render(<HvSomeComponent />);
    expect(container).toBeDefined();
  });
});
