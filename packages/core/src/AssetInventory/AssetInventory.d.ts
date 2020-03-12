import * as React from "react";
import { StandardProps } from "@material-ui/core";
import {Action} from "@hv/uikit-react-core/Actions";

export type AssetInventoryMetadata = {
  /**
   * TODO: improve type
   */
  id?: string;
  /**
   * TODO: improve type
   */
  title?: string;
  /**
   * TODO: improve type
   */
  accessor?: string;
  /**
   * TODO: improve type
   */
  cellType?: "alpha-numeric" | "numeric" | "date" | "node";
  /**
   * TODO: improve type
   */
  sortable?: boolean;
  /**
   * TODO: improve type
   * @param value1
   * @param value2
   */
  sortFunction?: (value1: any, value2: any) => boolean;
  /**
   * TODO: improve type
   */
  searchable?: boolean;
  /**
   * TODO: improve type
   * @param value1
   * @param value2
   */
  searchFunction?: (value1: any, value2: any) => boolean;
}

export interface HvAssetInventoryProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ClassKey> {
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: {
    /**
     * Styles applied to the controls container.
     */
    controlsContainer?: string;
    /**
     * Styles applied to the search container.
     */
    search?: string;
    /**
     * Styles applied to the right controls container.
     */
    rightControls?: string;
    /**
     *  Styles applied to the multiButtons.
     */
    multiButtons?: string;
    /**
     * Styles applied to the view container.
     */
    viewContainer?: string;
    /**
     * Styles applied to the search box container.
     */
    searchBoxContainer?: string;
    /**
     * Styles applied to the sort container.
     */
    sortContainer?: string;
    /**
     * Styles applied to the pagination component.
     */
    pagination?: string;
  };
  /**
   * Views components.
   */
  children: React.ReactNode | React.ReactNode[];
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
    sortBy?: string;
  };
  /**
   * Contains the metadata for the values and the necessary configuration for the views,
   * check the views for the specific view configuration.
   */
  configuration: {
    metadata: AssetInventoryMetadata[];
    viewConfiguration: object;
  };
  /**
   * Callback evoked in the selection of the card.
   */
  onSelection?: () => void;
  /**
   * List of actions to be passed to the views.
   */
  actions?: Action[];
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: (id: string, action: Action) => void;
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions?: number;
  /**
   * Extra filters
   */
  FilterPlaceholder?: React.ReactElement;
  /**
   * Indicates if the views are selectable.
   */
  isSelectable?: boolean;
  /**
   * An Object containing the various text associated with the search box.
   *
   * - inputLabel: the label on top of the search box.
   * - placeholder: the placeholder value of the search box.
   */
  searchBoxLabels?: {
    inputLabel?: string;
    placeholder?: string;
  };
  /**
   * Values selected. The list can be maintain internally or it can be passed (overwriting the internal).
   */
  selectedValues?: string[];
  /**
   * The selected view id.
   */
  selectedView?: string;
  /**
   * Defines if it has pagination.
   */
  hasPagination?: boolean;
  /**
   * Enable or disable the server side pagination mechanism
   */
  paginationServerSide?: boolean;
  /**
   * The array of possible page sizes for the dropdown.
   */
  pageSizeOptions?: number[];
  /**
   * Page size.
   */
  pageSize?: number;
  /**
   * The currently selected page (0-indexed).
   */
  page?: number;
  /**
   * The number of pages the component has.
   */
  pages?: number;
  /**
   * Page change callback.
   * //TODO: improve type
   */
  onPageChange?: Function;
  /**
   * Page size change callback.
   * //TODO: improve type
   */
  onPageSizeChange?: Function;
  /**
   * Search callback.
   * //TODO: improve type
   */
  onSearch?: Function;
  /**
   * Sort callback.
   * //TODO: improve type
   */
  onSortChange?: Function;
  /**
   * View change callback.
   * //TODO: improve type
   */
  onViewChange?: Function;
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
}

type ClassKey =
  | "controlsContainer"
  | "search"
  | "rightControls"
  | "multiButtons"
  | "viewContainer"
  | "sortContainer"
  | "searchBoxContainer"
  | "pagination";

export default function HvAssetInventory(props: HvAssetInventoryProps): JSX.Element | null;
