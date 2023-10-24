import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvStack } from "./Stack";

describe("Stack", () => {
  it("should be defined", () => {
    const { container } = render(<HvStack />);
    expect(container).toBeDefined();
  });
});
