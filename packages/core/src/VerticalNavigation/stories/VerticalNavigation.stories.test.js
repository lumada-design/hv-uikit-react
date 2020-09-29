// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
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

// test scenario, Collapse
export const CollapsableOpened = () => Collapsable();

CollapsableOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button", { name: /open/i }));
        return wait(() => screen.getAllByRole("list")[0]);
      },
    },
  },
};

// test scenario, Collapsable On Exit open
export const CollapseOnExitOpened = () => CollapseOnExit();

CollapseOnExitOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button", { name: /open/i }));
        return wait(() => screen.getByRole("navigation", { name: /example 2 navigation/i }));
      },
    },
  },
};
