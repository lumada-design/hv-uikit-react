import { getClasses } from "@core/utils";

export interface HvSnackbarContentClasses {
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
}

const classKeys: (keyof HvSnackbarContentClasses)[] = [
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

const snackbarContentClasses = getClasses(classKeys, "HvSnackbar-Content");

export default snackbarContentClasses;
