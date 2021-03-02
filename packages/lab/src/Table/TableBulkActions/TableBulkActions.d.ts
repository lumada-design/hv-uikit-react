import { StandardProps } from "@material-ui/core";
import { TableInstance } from "react-table";
import { HvBulkActionsProps } from "@hv/uikit-react-core";

export type HvTableBulkActionsClassKey = "root";

export interface HvTableBulkActionsProps
  extends StandardProps<HvBulkActionsProps, HvTableBulkActionsClassKey> {
  /**
   * React Table useTable instance
   */
  rtInstance: TableInstance;
}

export default function HvTableBulkActions(props: HvTableBulkActionsProps): JSX.Element | null;
