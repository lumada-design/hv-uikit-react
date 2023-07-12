import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvTag } from "./Tag";

describe("Tag", () => {
  it("should be defined", () => {
    const { container } = render(<HvTag />);
    expect(container).toBeDefined();
  });
});
