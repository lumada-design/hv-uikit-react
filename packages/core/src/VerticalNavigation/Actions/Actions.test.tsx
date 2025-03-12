import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvVerticalNavigationAction, HvVerticalNavigationActions } from ".";

const Sample = () => (
  <HvVerticalNavigationActions>
    <HvVerticalNavigationAction label="Action 1" icon={<div />} />
    <HvVerticalNavigationAction label="Action 2" />
    <HvVerticalNavigationAction label="Action 3" icon={<div />} />
  </HvVerticalNavigationActions>
);

describe("VerticalNavigation Actions", () => {
  it("should render the actions", () => {
    render(<Sample />);
    expect(screen.getAllByRole("button").length).toBe(3);
  });
});
