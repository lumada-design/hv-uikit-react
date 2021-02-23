import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvCookiesConsentBannerClassKey =
  | "root"
  | "content"
  | "title"
  | "actions";

export interface HvCookiesConsentBannerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvCookiesConsentBannerClassKey> {
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

export default function HvCookiesConsentBanner(
  props: HvCookiesConsentBannerProps
): JSX.Element | null;
