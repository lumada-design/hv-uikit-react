import * as React from "react";
import { StandardProps } from "@material-ui/core";
import { AssetInventoryMetadata } from "..";
import { ViewConfiguration } from "../ViewConfiguration";

export interface ListViewConfiguration extends ViewConfiguration {
  /**
   * Sets the title at the top of the column and applies styles to the cells in the column.
   */
  columnConfiguration: {
    title: string;
    style: object;
  }[];
}

export interface HvListViewProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvListViewClassKey> {
  /**
   * Icon used in the multi button in the asset inventory.
   */
  icon: React.ReactNode;
  /**
   * Configuration used to setup various properties of the view.
   * This configuration is propagated to the known childs of the asset inventory through context.
   */
  viewConfiguration: ListViewConfiguration;
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
  values: object[];
  /**
   * Selected values.
   */
  selectedValues?: string[];
  /**
   * Metadata associated with the values.
   */
  metadata?: AssetInventoryMetadata;
}

type HvListViewClassKey = "root" | "elements" | "tableBody" | "tableHead";

export default function HvListView(props: HvListViewProps): JSX.Element | null;
