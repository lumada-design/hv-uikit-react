declare module "@hv/uikit-react-core/dist" {
  export class HvTable extends React.Component<HvTableProps, any> {}

  export interface TableLabel {
    titleText?: string;
    subtitleText?: string;
  }

  export interface TableColumn {
    headerText?: string;
    accessor?: string | ((...args: any[]) => any);
    format?: (...args: any[]) => any;
    cellType?: string;
    style?: any;
    fixed?: string;
    Cell?: any;
    sortable?: boolean;
  }

  export interface SecondaryAction {
    label?: string;
    action?: (...args: any[]) => any;
  }

  export interface HvTableProps extends React.HTMLAttributes<HvTable> {
    /**
     * Unique class name used to identify the fixed table
     */
    uniqClassName?: string;

    /**
     * the classes object to be applied into the root object.
     */
    classes?: {
      /**
       * Styles applied to the component root.
       */
      root?: string;
      /**
       * Styles applied to the component thead.
       */
      thead?: string;
      /**
       * Styles applied to the component tr.
       */
      tr?: string;
      /**
       * Styles applied to the component sort icon.
       */
      rtSortIcon?: string;
      /**
       * Styles applied to the component when the sort icon is shown.
       */
      sortedIconShown?: string;
      /**
       * Styles applied to the component when the sort icon is hidden.
       */
      sortedIconHidden?: string;
      /**
       * Styles applied to the component pointer.
       */
      pointer?: string;
      /**
       * Styles applied to the component subtitle.
       */
      subtitle?: string;
      /**
       * Styles applied to the component title.
       */
      title?: string;
      /**
       * Styles applied to the component when type is link.
       */
      link?: string;
      /**
       * Styles applied to the component expander.
       */
      subComponentContainer?: string;
      /**
       * Styles applied to the component icon in the columns.
       */
      iconContainer?: string;
      /**
       * Styles applied to the component columns.
       */
      firstWithNumeric?: string;
    };
    /**
     * The labels inside the table.
     */
    labels?: TableLabel;

    /**
     * Title of the table.
     * @deprecated Instead use the labels property
     */
    titleText?: string;

    /**
     * Subtitle of the table.
     * @deprecated Instead use the labels property
     */
    subtitleText?: string;

    /**
         * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
         Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
         If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
         */
    columns: TableColumn[];

    /**
     * Array with the data elements to show
     */
    data: any[];

    /**
     * Boolean to show or hide the pagination controls
     */
    showPagination?: boolean;

    /**
     * Callback to notify when the page changes
     */
    onPageChange?: (...args: any[]) => any;

    /**
     * Boolean to show or hide the page size control
     */
    showPageSize?: boolean;

    /**
     * Numeric value to control the page size selected
     */
    pageSize?: number;

    /**
     * Callback to notify when the page size changes
     */
    onPageSizeChange?: (...args: any[]) => any;

    /**
     * Boolean to enable or disable the server side pagination mechanism
     */
    paginationServerSide?: boolean;

    /**
     * Numeric value to control the number of pages. Useful when Server side pagination data is enabled
     */
    pages?: number;

    /**
     * Callback with receives the page info and should fetch the data to show on the table
     */
    onFetchData?: (...args: any[]) => any;

    /**
     * Boolean to enable or disable the sort mechanism
     */
    sortable?: boolean;

    /**
     * An object describing what column is sorted by default on the table
     */
    defaultSorted?: any[];

    /**
     * Element to be shown in the expander.
     */
    subElementTemplate?: (...args: any[]) => any;

    /**
     * Property to be uses as unique row identifier. One of the fields of the data.
     */
    idForCheckbox?: string;

    /**
     * Function to overwrite the existed getTrProps
     */
    getTrProps?: (...args: any[]) => any;

    /**
     * Boolean to bind config back to function or not
     */
    useRouter?: boolean;

    /**
     * Callback which receives the checked state of all items in the list
     */
    onSelection?: (...args: any[]) => any;

    /**
     * Ids of preselected items in the list
     */
    selections?: any[];

    /**
     *  Secondary actions listed in menu dropdown. Label is displayed and action is executed on click.
     */
    secondaryActions?: SecondaryAction[];
  }
}
