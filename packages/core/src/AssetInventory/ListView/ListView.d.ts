import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { AssetInventoryMetadata } from "@hv/uikit-react-core/AssetInventory";
import {Action} from "@hv/uikit-react-core/Actions";

export type ViewConfiguration = {
  onSelection: Function;
  isSelectable: boolean;
  columnConfiguration: {
    title: string;
    style: object;
  }[];
  maxVisibleActions: number;
  actions:
    | React.ReactNode
    | Action[];
  actionsCallback: (id: string, action: Action) => void;
};

export interface HvListViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvListViewClassKey> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Icon used in the multi button in the assert inventory.
   */
  icon: React.ReactNode;
  /**
   * Configuration used to setup various properties of the view.
   * This configuration is propagated to the known childs of the asset inventory through context.
   */
  viewConfiguration: ViewConfiguration;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: {
    /**
     * Styles applied to the component root class.
     */
    root?: string;
    /**
     * Styles applied to the table header.
     */
    tableHead?: string;
    /**
     * Styles applied to the table body.
     */
    tableBody?: string;
  };
  /**
   * The function that will be used to render the list,
   * it receives the values one bye one, is recommended to use
   * the list View cell and list view Row to construct the renderer
   */
  renderer: Function;
  /**
   * The values that will be passed to the renderer one by one
   */
  values: object[];
  /**
   * Selected values.
   */
  selectedValues?: string[];
  /**
   * The spacing between the cells correspond to the usual htlm table attribute
   */
  cellSpacing?: string;
  /**
   * Metadata associated with the values.
   */
  metadata?: AssetInventoryMetadata;
}

type HvListViewClassKey = "root" | "tableBody" | "tableHead";

export default function HvListView(props: HvListViewProps): JSX.Element | null;
