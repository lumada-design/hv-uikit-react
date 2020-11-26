// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import {
  Main,
  CustomContent,
  TextAndSemantic,
  CustomIcon,
  Accessibility,
  RemoveSchedule,
  DeleteConfirmation,
  NoRename,
} from "./Dialog.stories";

export default {
  title: "Tests/Dialog",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios

const openDialog = async (bIndex = 0) => {
  fireEvent.click(screen.getAllByRole("button")[bIndex]);

  const dialog = await screen.findByRole("dialog");

  // extra buffer to allow popper layout
  return new Promise((resolve) => setTimeout(() => resolve(dialog), 1000));
};

// test scenario, dialog open
export const DialogOpened = () => Main();

DialogOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// test scenario, dialog with table open
export const TableOpened = () => CustomContent();

TableOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(0);
      },
    },
  },
};

// test scenario, dialog with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(1);
      },
    },
  },
};

// open No Rename Dialog
export const sNoRename = () => NoRename();

sNoRename.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// open dialog DeleteConfirmation
export const sDeleteConfirmation = () => DeleteConfirmation();

sDeleteConfirmation.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// open dialog DeleteConfirmation
export const sRemoveSchedule = () => RemoveSchedule();

sRemoveSchedule.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// open dialog DeleteConfirmation
export const sAccessibility = () => Accessibility();

sAccessibility.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// open dialog CustomIcon
export const sCustomIcon = () => CustomIcon();

sCustomIcon.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog();
      },
    },
  },
};

// open dialog TextAndSemantic no icon
export const sTextAndSemanticNoIcon = () => TextAndSemantic();

sTextAndSemanticNoIcon.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(0);
      },
    },
  },
};

// open dialog TextAndSemantic Warning
export const sTextAndSemanticWarning = () => TextAndSemantic();

sTextAndSemanticWarning.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(1);
      },
    },
  },
};

// open dialog TextAndSemantic info
export const sTextAndSemanticInfo = () => TextAndSemantic();

sTextAndSemanticInfo.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(2);
      },
    },
  },
};

// open dialog TextAndSemantic Error
export const sTextAndSemanticError = () => TextAndSemantic();

sTextAndSemanticError.story = {
  parameters: {
    eyes: {
      runBefore() {
        return openDialog(3);
      },
    },
  },
};
