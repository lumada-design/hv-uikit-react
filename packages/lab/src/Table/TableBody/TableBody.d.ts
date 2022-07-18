import { StandardProps } from "@mui/material";

export type HvTableBodyClassKey = "root";

export interface HvTableBodyProps
  extends StandardProps<React.HTMLAttributes<HTMLTableSectionElement>, HvTableBodyClassKey> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `thead`.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvTableBody(props: HvTableBodyProps): JSX.Element | null;
