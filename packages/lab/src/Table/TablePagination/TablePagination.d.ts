import { StandardProps } from "@material-ui/core";
import { TableInstance } from "react-table";
import { HvPaginationProps } from "@hv/uikit-react-core";

export type HvTablePaginationClassKey = "root";

export interface HvTablePaginationProps
  extends StandardProps<HvPaginationProps, HvTablePaginationClassKey> {
  /**
   * React Table useTable instance
   */
  rtInstance: TableInstance;
}

export default function HvTablePagination(props: HvTablePaginationProps): JSX.Element | null;
