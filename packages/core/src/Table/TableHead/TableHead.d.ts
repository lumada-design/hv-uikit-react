import { StandardProps } from "@mui/material";

export type HvTableHeadClassKey = "root";

export interface HvTableHeadProps
  extends StandardProps<React.HTMLAttributes<HTMLTableSectionElement>, HvTableHeadClassKey> {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `thead`.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export default function HvTableHead(props: HvTableHeadProps): JSX.Element | null;
