import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvTypographyProps } from "../Typography";

export type HvAccordionClassKey = "root" | "hidden" | "container" | "label" | "disabled";

export interface HvAccordionProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvAccordionClassKey> {
  /**
   * The accordion label button.
   */
  label: string;
  /**
   * An object containing props to be passed onto the accordion label button.
   */
  labelProps?: HvTypographyProps;
  /**
   * Heading Level to apply to accordion button if ´undefined´ the button won't have a header wrapper.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * An object containing props to be passed onto the container holding the accordion children.
   */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Is the accordion disabled.
   */
  disabled?: boolean;
  /**
   * Whether the accordion is open or not, if this property is defined the accordion must be fully controlled.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
  /**
   * The content of the accordion.
   */
  children?: React.ReactNode;
}

export default function HvAccordion(props: HvAccordionProps): JSX.Element | null;
