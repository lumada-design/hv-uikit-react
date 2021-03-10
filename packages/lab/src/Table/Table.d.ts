import { StandardProps } from "@material-ui/core";

export type HvTableClassKey = "root" | "stickyHeader";

export interface HvTableProps
  extends StandardProps<React.HTMLAttributes<HTMLTableElement>, HvTableClassKey> {
  /**
   * Whether the `HvTable` has a sticky header row
   */
  stickyHeader?: boolean;
}

export default function HvTable(props: HvTableProps): JSX.Element | null;
