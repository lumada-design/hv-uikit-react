import * as React from "react";
import { StandardProps } from "@mui/material";
import { HvTooltipProps } from "@hitachivantara/uikit-react-core";
import { AssetInventoryMetadata } from "..";
import { ViewConfiguration } from "../ViewConfiguration";

export interface ListViewConfiguration extends ViewConfiguration {
  /**
   * Sets the title at the top of the column and applies styles to the cells in the column.
   */
  columnConfiguration: {
    title?: string;
    style: object;
    align?: string;
    /**
     * Extra properties for the header cell in the column.
     */
    cellProps?: Record<string, any>;
    /**
     * Extra properties for the tooltip of the header cell in the column.
     */
    tooltipProps?: HvTooltipProps;
  }[];
}

export type HvListViewClassKey = "root" | "elements" | "tableBody" | "tableHead";

export interface HvListViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvListViewClassKey> {
  /**
   * Component to the present when no data is available.
   */
  emptyComponent?: React.ReactNode;
  /**
   * Configuration used to setup various properties of the view.
   * This configuration is propagated to the known children of the asset inventory through context.
   */
  viewConfiguration?: ListViewConfiguration;
  /**
   * The function that will be used to render the list,
   * it receives the values one bye one, is recommended to use
   * the list View cell and list view Row to construct the renderer
   */
  renderer: (
    value: object,
    index: number,
    viewConfiguration: ListViewConfiguration,
    metadata: AssetInventoryMetadata
  ) => React.ReactNode;
  /**
   * The values that will be passed to the renderer one by one
   */
  values?: object[];
  /**
   * Selected values.
   */
  selectedValues?: string[];
  /**
   * Metadata associated with the values.
   */
  metadata?: AssetInventoryMetadata;
}

export default function HvListView(props: HvListViewProps): JSX.Element | null;
