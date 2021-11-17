import { screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
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

const openMenu = async () => {
  fireEvent.click(screen.getByRole("button"));

  const menu = await screen.findByRole("menu");

  // extra buffer to allow popper layout
  return new Promise((resolve) => {
    setTimeout(() => resolve(menu), 1000);
  });
};

// test scenario, drop/open hidden breadCrumb items
export const LimitedToTwoPathsOpened = () => LimitedToTwoPaths();

LimitedToTwoPathsOpened.parameters = {
  eyes: {
    runBefore() {
      return openMenu();
    },
  },
};

// test scenario, drop/open hidden breadCrumb items
export const WithURLLimitedOpened = () => WithURLLimited();

WithURLLimitedOpened.parameters = {
  eyes: {
    runBefore() {
      return openMenu();
    },
  },
};
