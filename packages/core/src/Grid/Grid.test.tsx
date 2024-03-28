import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvGrid } from "./Grid";

describe("Grid", () => {
  it("should be defined", () => {
    const { container } = render(<HvGrid />);
    expect(container).toBeDefined();
  });
});
