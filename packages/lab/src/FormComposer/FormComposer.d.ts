import * as React from "react";
import { StandardProps } from "@mui/material";

interface FormGroup {
  title: string;
  children: React.ReactNode;
}

export type HvFormComposerClassKey =
  | "root"
  | "title"
  | "mainContainer"
  | "navContainer"
  | "componentContainer"
  | "footer";

export interface HvFormComposerProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvFormComposerClassKey> {
  /**
   * Main title to be displayed.
   */
  mainTitle?: string;
  /**
   * The group of component that will be added to the Form composer.
   */
  groups: FormGroup[];
  /**
   * Shows navigation bar.
   */
  hasNavigation?: boolean;
  /**
   * Shows footer.
   */
  hasFooter?: boolean;
  /**
   * Content to be shown on the footer.
   */
  footerContent?: React.ReactNode;
}

export default function HvFormComposer(props: HvFormComposerProps): JSX.Element | null;
