// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import { LimitedToTwoPaths, WithURLLimited } from "./BreadCrumb.stories";

export default {
  title: "Tests/Breadcrumb",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios

// test scenario, drop/open hidden breadCrumb items
export const LimitedToTwoPathsOpened = () => LimitedToTwoPaths();

LimitedToTwoPathsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button"));
        return wait(() => screen.getByText("Label 7"));
      },
    },
  },
};

// test scenario, drop/open hidden breadCrumb items
export const WithURLLimitedOpened = () => WithURLLimited();

WithURLLimitedOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("button"));
        return wait(() => screen.getByText("DesignSystem"));
      },
    },
  },
};
