import { describe, expect, it } from "vitest";
import {  render } from "@testing-library/react";
import { Play, Stop } from "@hitachivantara/uikit-react-icons";
import { HvVerticalNavigationAction, HvVerticalNavigationActions } from "components";

const Sample = () => (
    <HvVerticalNavigationActions>
        <HvVerticalNavigationAction label="Action 1" icon={<Play />} />
        <HvVerticalNavigationAction label="Action 2" />
        <HvVerticalNavigationAction label="Action 3" icon={<Stop />} />
  </HvVerticalNavigationActions>   
)

describe("VerticalNavigation - Actions", () => {
    it("should be defined", () => {
      const { container } = render(
        <Sample />
      );
      expect(container).toBeDefined();
    });
  
    it("should render correctly", () => {
      const { container } = render(
        <Sample />
      );
      expect(container).toMatchSnapshot();
    });
})