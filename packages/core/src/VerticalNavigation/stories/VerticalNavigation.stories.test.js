import { waitFor, screen, fireEvent } from "@storybook/testing-library";
import { Collapsable, CollapseOnExit } from "./VerticalNavigation.stories";

export default {
  title: "Tests/Navigation System/Vertical Navigation",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios

const openNavigation = async () => {
  fireEvent.click(screen.getByRole("button"));

  return waitFor(() => screen.getByRole("navigation"));
};

// test scenario, Collapse
export const CollapsableOpened = () => Collapsable();

CollapsableOpened.parameters = {
  eyes: {
    runBefore() {
      return openNavigation();
    },
  },
};

// test scenario, Collapsable On Exit open
export const CollapseOnExitOpened = () => CollapseOnExit();

CollapseOnExitOpened.parameters = {
  eyes: {
    runBefore() {
      return openNavigation();
    },
  },
};
