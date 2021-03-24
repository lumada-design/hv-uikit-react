import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { HvTypographyProps } from "../Typography";

export type HvAccordionClassKey = "root" | "hidden" | "container" | "label" | "disabled";

export interface HvAccordionProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    HvAccordionClassKey
  > {
  /**
   * The accordion label button.
   */
  label: string;
  /**
   * An object containing props to be passed onto the accordion label button.
   */
  labelProps?: HvTypographyProps;
  /**
   * An object containing props to be passed onto container holding the accordion children.
   */
   containerProps?: React.HTMLAttributes<HTMLDivElement>,
  /**
   * Is the accordion disabled.
   */
  disabled?: boolean;
  /**
   * Whether the accordion is open or not, if this property is defined the accordion must be fully controlled.
   */
  expanded?: boolean;
  /**
   * The content of the accordion.
   */
  children?: React.ReactNode;
}

export default function HvAccordion(props: HvAccordionProps): JSX.Element | null;
