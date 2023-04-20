import { getClasses } from "@core/utils";

export type HvSnackbarContentClasses = {
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

const snackbarContentClasses = getClasses<HvSnackbarContentClasses>(
  classKeys,
  "HvSnackbar-Content"
);

export default snackbarContentClasses;
