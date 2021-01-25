import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvDialogProps } from "@hv/uikit-react-core";

export type HvCookiesConsentDialogClassKey =
  | "root"
  | "title"
  | "mainContainer"
  | "navContainer"
  | "componentContainer"
  | "footer";

export interface HvCookiesConsentDialogProps
  extends StandardProps<HvDialogProps, HvCookiesConsentDialogClassKey> {
  /**
   * The title of the dialog
   */
  title: string;
  /**
   * The content of the dialog, can be a string or a composition of nodes
   */
  description: React.ReactNode;
  /**
   * The buttons of the dialog
   */
  buttons: React.ReactNode;
}

export default function HvCookiesConsentDialog(
  props: HvCookiesConsentDialogProps
): JSX.Element | null;
