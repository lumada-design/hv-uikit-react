// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import {
  Main,
  CustomContent,
  TextAndSemantic,
  CustomIcon,
  Accessibility,
  RemoveSchedule,
  DeleteConfirmation,
  NoRename,
} from "./Modal.stories";

export default {
  title: "Tests/Modal",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
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
      },
    },
  },
};

// test scenario, modal with table open
export const TableOpened = () => CustomContent();

TableOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Table"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// test scenario, modal with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Inputs"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open No Rename Modal
export const sNoRename = () => NoRename();

sNoRename.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal DeleteConfirmation
export const sDeleteConfirmation = () => DeleteConfirmation();

sDeleteConfirmation.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal DeleteConfirmation
export const sRemoveSchedule = () => RemoveSchedule();

sRemoveSchedule.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal DeleteConfirmation
export const sAccessibility = () => Accessibility();

sAccessibility.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Open modal"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal CustomIcon
export const sCustomIcon = () => CustomIcon();

sCustomIcon.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Custom icon"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal TextAndSemantic no icon
export const sTextAndSemanticNoIcon = () => TextAndSemantic();

sTextAndSemanticNoIcon.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("No icon"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal TextAndSemantic Warning
export const sTextAndSemanticWarning = () => TextAndSemantic();

sTextAndSemanticWarning.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Warning"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal TextAndSemantic info
export const sTextAndSemanticInfo = () => TextAndSemantic();

sTextAndSemanticInfo.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Info"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};

// open modal TextAndSemantic Error
export const sTextAndSemanticError = () => TextAndSemantic();

sTextAndSemanticError.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByText("Error"));
        return wait(() => screen.getByRole("dialog"));
      },
    },
  },
};
