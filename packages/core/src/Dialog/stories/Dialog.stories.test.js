// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
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

  const dialog = await waitFor(() => screen.getByRole("dialog"));

  // extra buffer to allow popper layout
  return new Promise((resolve) => setTimeout(() => resolve(dialog), 1000));
};

// test scenario, dialog open
export const DialogOpened = () => Main();

DialogOpened.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// test scenario, dialog with table open
export const TableOpened = () => CustomContent();

TableOpened.parameters = {
  eyes: {
    runBefore() {
      return openDialog(0);
    },
  },
};

// test scenario, dialog with inputs opened
export const inputsOpened = () => CustomContent();

inputsOpened.parameters = {
  eyes: {
    runBefore() {
      return openDialog(1);
    },
  },
};

// open No Rename Dialog
export const sNoRename = () => NoRename();

sNoRename.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// open dialog DeleteConfirmation
export const sDeleteConfirmation = () => DeleteConfirmation();

sDeleteConfirmation.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// open dialog DeleteConfirmation
export const sRemoveSchedule = () => RemoveSchedule();

sRemoveSchedule.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// open dialog DeleteConfirmation
export const sAccessibility = () => Accessibility();

sAccessibility.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// open dialog CustomIcon
export const sCustomIcon = () => CustomIcon();

sCustomIcon.parameters = {
  eyes: {
    runBefore() {
      return openDialog();
    },
  },
};

// open dialog TextAndSemantic no icon
export const sTextAndSemanticNoIcon = () => TextAndSemantic();

sTextAndSemanticNoIcon.parameters = {
  eyes: {
    runBefore() {
      return openDialog(0);
    },
  },
};

// open dialog TextAndSemantic Warning
export const sTextAndSemanticWarning = () => TextAndSemantic();

sTextAndSemanticWarning.parameters = {
  eyes: {
    runBefore() {
      return openDialog(1);
    },
  },
};

// open dialog TextAndSemantic info
export const sTextAndSemanticInfo = () => TextAndSemantic();

sTextAndSemanticInfo.parameters = {
  eyes: {
    runBefore() {
      return openDialog(2);
    },
  },
};

// open dialog TextAndSemantic Error
export const sTextAndSemanticError = () => TextAndSemantic();

sTextAndSemanticError.parameters = {
  eyes: {
    runBefore() {
      return openDialog(3);
    },
  },
};
