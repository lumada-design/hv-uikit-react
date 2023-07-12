import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";
import {
  HvVerticalNavigationAction,
  HvVerticalNavigationActions,
} from "@core/components";

const Sample = () => (
  <HvVerticalNavigationActions>
    <HvVerticalNavigationAction label="Action 1" icon={<Play />} />
    <HvVerticalNavigationAction label="Action 2" />
    <HvVerticalNavigationAction label="Action 3" icon={<Stop />} />
  </HvVerticalNavigationActions>
);

describe("VerticalNavigation Actions", () => {
  it("should render the actions", () => {
    render(<Sample />);
    expect(screen.getAllByRole("button").length).toBe(3);
  });
});
