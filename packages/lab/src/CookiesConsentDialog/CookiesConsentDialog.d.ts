import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvDialogProps } from "@hv/uikit-react-core";

export type HvCookiesConsentDialogClassKey =
  | "root"
  | "closeButton";

export interface HvCookiesConsentDialogProps
  extends StandardProps<HvDialogProps, HvCookiesConsentDialogClassKey> {
  /**
   * The title of the dialog
   */
  title: string;
  /**
   * The content of the dialog
   */
  description: React.ReactNode | string;
  /**
   * The buttons of the dialog
   */
  buttons: React.ReactNode;
}

export default function HvCookiesConsentDialog(
  props: HvCookiesConsentDialogProps
): JSX.Element | null;
