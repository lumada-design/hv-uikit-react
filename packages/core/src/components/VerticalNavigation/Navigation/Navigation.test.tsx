import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { HvVerticalNavigationTree } from "./Navigation";

const Sample = () => {
  return <HvVerticalNavigationTree aria-label="Example 1 navigation" />;
};

describe("VerticalNavigation - Navigation", () => {
  it("should be defined", () => {
    const { container } = render(<Sample />);
    expect(container).toBeDefined();
  });
});
