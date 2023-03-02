import { getClasses } from "utils";

export type HvSnackbarContentWrapperClasses = {
  root?: string;
  message?: string;
  messageSpan?: string;
  iconVariant?: string;
  messageText?: string;
  action?: string;
  default?: string;
  success?: string;
  warning?: string;
  error?: string;
};

const classKeys: string[] = [
  "root",
  "message",
  "messageSpan",
  "iconVariant",
  "messageText",
  "action",
  "default",
  "success",
  "warning",
  "error",
];

const snackbarContentWrapperClasses =
  getClasses<HvSnackbarContentWrapperClasses>(
    classKeys,
    "HvSnackbar-ContentWrapper"
  );

export default snackbarContentWrapperClasses;
