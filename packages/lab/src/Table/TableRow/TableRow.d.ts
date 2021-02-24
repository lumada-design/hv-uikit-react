import { StandardProps } from "@material-ui/core";

export type HvTableRowClassKey = "root" | "head" | "body" | "footer" | "hover" | "selected";

export interface HvTableRowProps
  extends StandardProps<React.HTMLAttributes<HTMLTableRowElement>, HvTableRowClassKey> {
  /**
   * Whether the table row will shade on hover.
   */
  hover?: boolean;
  /**
   * Whether the table row will have the selected shading.
   */
  selected?: boolean;
}

export default function HvTableRow(props: HvTableRowProps): JSX.Element | null;
