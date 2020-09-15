// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import { Main, CustomContent } from "./Modal.stories";

export default {
  title: "Tests/Modal",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended applitools test scenarios

// test scenario, modal open
export const ModalOpened = () => Main();

ModalOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("heading", { name: /switch model view\?/i }));
      }
    }
  }
};

// test scenario, modal with table open
export const TableOpened = () => CustomContent();

TableOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Table"));
        return wait(() => screen.getByRole("dialog"));
      }
    }
  }
};

// test scenario, modal with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Inputs"));
        return wait(() => screen.getByRole("dialog"));
      }
    }
  }
};
