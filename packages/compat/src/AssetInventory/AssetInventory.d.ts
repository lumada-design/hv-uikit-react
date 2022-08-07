import * as React from "react";
import { StandardProps } from "@mui/material";
import {
  HvActionsGenericCommonProps,
  ListValueProp,
  HvPaginationCommonProps,
} from "@hitachivantara/uikit-react-core";
import { CardViewConfiguration } from "./CardView";
import { ListViewConfiguration } from "./ListView";

export interface AssetInventoryConfiguration extends ListViewConfiguration, CardViewConfiguration {}

export type AssetInventoryMetadata = {
  /**
   * id associated with data entry
   */
  id?: string;
  /**
   * title associated with data entry
   */
  title?: string;
  /**
   * accessor associated with data entry
   */
  accessor?: string;
  /**
   * value type used for searching data entries
   */
  cellType?: "alpha-numeric" | "numeric" | "date" | "node";
  /**
   * whether the data entry is sortable
   */
  sortable?: boolean;
  /**
   * label describing ascending sort
   */
  sortableLabelAsc?: string;
  /**
   * label describing descending sort
   */
  sortableLabelDesc?: string;
  /**
   * custom function to sort the values
   * @param a
   * @param b
   */
  sortFunction?: (a: any, b: any) => boolean;
  /**
   * whether the data entry is searchable
   */
  searchable?: boolean;
  /**
   * custom function to search the values
   * @param entryValue
   * @param searchValue
   */
  searchFunction?: (entryValue: any, searchValue: any) => boolean;
};

export type ClassKey =
  | "root"
  | "controlsContainer"
  | "search"
  | "rightControls"
  | "multiButtons"
  | "viewContainer"
  | "sortContainer"
  | "searchBoxContainer"
  | "pagination";

export interface HvAssetInventoryProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey>,
    HvActionsGenericCommonProps,
    HvPaginationCommonProps {
  /**
   * Data passed to the component.
   */
  values: {
    id: string;
  }[];
  /**
   * Labels.
   */
  labels?: {
    /**
     * The label of the sort.
     */
    sortBy?: string;
    /**
     * The label on top of the search box.
     */
    inputLabel?: string;
    /**
     * the placeholder value of the search box.
     */
    placeholder?: string;
  };
  /**
   * Contains the metadata for the values and the necessary configuration for the views,
   * check the views for the specific view configuration.
   */
  configuration: {
    metadata: AssetInventoryMetadata[];
    viewConfiguration?: AssetInventoryConfiguration;
  };
  /**
   * Callback evoked in the selection of the card.
   */
  onSelection?: (event: React.FormEvent<HTMLDivElement>, selection: string[]) => void;
  /**
   * Extra filters
   */
  FilterPlaceholder?: React.ReactElement;
  /**
   * Indicates if the views are selectable.
   */
  isSelectable?: boolean;
  /**
   * Values selected. The list can be maintain internally or it can be passed (overwriting the internal).
   */
  selectedValues?: string[];
  /**
   * The selected view id.
   */
  selectedView?: string;
  /**
   * Defines whether the Asset Inventory includes the bulk actions component.
   */
  hasBulkActions?: boolean;
  /**
   * Defines whether the Asset Inventory includes the pagination component.
   */
  hasPagination?: boolean;
  /**
   * Enable or disable the server side pagination mechanism
   */
  paginationServerSide?: boolean;
  /**
   * Search callback.
   */
  onSearch?: (value: string) => void;
  /**
   * Sort callback.
   */
  onSortChange?: (value: ListValueProp) => void;
  /**
   * View change callback.
   */
  onViewChange?: (event: React.FormEvent<HTMLDivElement>, index: number) => void;
  /**
   * Visual indication of the sort applied. The id is given by the metadata.id+Asc or metadata.id+Desc.
   */
  sortOptionId?: string;
  /**
   * Visual indicator of the search string used.
   */
  searchString?: string;
  /**
   * Disable portal on the Sort dropdown
   */
  disablePortal?: boolean;
  /**
   * Other props passed to the searchbox.
   */
  searchProps?: object;
  /**
   * Other props passed to the Sort. If you want to control the aria-label
   * use the labels.sortBy, as it is mapped directly to the aria-label.
   */
  sortProps?: object;
  /**
   * Array of others prop passed to the created button. Each element must include the id of the view
   * and other props to pe passed to each button.
   */
  multibuttonProps?: object;
  /**
   * Other props passed to the pagination.
   */
  paginationProps?: HvPaginationCommonProps;
  /**
   * Component to the present when no data is available.
   */
  emptyComponent?: React.ReactNode;
}

export default function HvAssetInventory(props: HvAssetInventoryProps): JSX.Element | null;
