import * as React from "react";
import { StandardProps } from "@material-ui/core";
import PropTypes from "prop-types/index";
import { ViewConfiguration } from "@hv/uikit-react-core/AssetInventory/ListView";

export interface HvListViewHeaderRowProps
  extends StandardProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HvListViewHeaderRowClassKey
  > {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * This value is provided by the asset inventory list view and contains the styling from the.
   */
  viewConfiguration?: ViewConfiguration;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: {
    /**
     * Styles applied to the assetinventorylistview root class.
     */
    root: string;
    /**
     * Styles applied the header when selectable.
     */
    selectable: string;
    /**
     * Styles applied the header when not selectable.
     */
    notSelectable: string;
    /**
     * TODO: add description
     */
    selectCell: string;
    /**
     * TODO: add description
     */
    headCell: string;
  };
}

type HvListViewHeaderRowClassKey =
  | "root"
  | "selectable"
  | "notSelectable"
  | "selectCell"
  | "headCell";

export default function HvListViewHeaderRow(props: HvListViewHeaderRowProps): JSX.Element | null;
