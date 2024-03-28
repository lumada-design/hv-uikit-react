import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvVerticalNavigationSlider } from "./NavigationSlider";

const Sample = () => {
  return <HvVerticalNavigationSlider />;
};

describe("NavigationSlider", () => {
  it("should be defined", () => {
    const { container } = render(<Sample />);
    expect(container).toBeDefined();
  });
});
