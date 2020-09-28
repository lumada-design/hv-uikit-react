import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { ViewConfiguration } from "../../ViewConfiguration";

export type HvListViewHeaderRowClassKey = "root" | "headCell";

export interface HvListViewHeaderRowProps
  extends StandardProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HvListViewHeaderRowClassKey
  > {
  /**
   * This value is provided by the asset inventory list view and contains the styling from the.
   */
  viewConfiguration?: ViewConfiguration;
}

export default function HvListViewHeaderRow(props: HvListViewHeaderRowProps): JSX.Element | null;
