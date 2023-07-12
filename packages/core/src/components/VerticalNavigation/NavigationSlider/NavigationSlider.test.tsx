import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
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
