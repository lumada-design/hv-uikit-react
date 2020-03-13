declare module '@hv/uikit-react-core/dist/Pagination' {
  class HvPagination extends React.Component<HvPaginationProps> {}

  export default HvPagination

  export interface HvPaginationProps
    extends React.HTMLAttributes<HvPagination> {
    /**
     * The theme passed by the provider.
     */
    theme: object
    /**
     * A JSS Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
      /**
       * Styles applied to the page size selector container.
       */
      pageSizeOptions?: string
      /**
       * Styles applied to the page size selector dropdown element.
       */
      pageSizeOptionsSelect?: string
      /**
       * Styles applied to the page navigation container.
       */
      pageNavigator?: string
      /**
       * Styles applied to the central page information container.
       */
      pageInfo?: string
      /**
       * Styles applied to the page selector input container.
       */
      pageJump?: string
      /**
       * Styles passed down to the page selector Input component as `input`.
       */
      pageSizeInput?: string
      /**
       * Styles passed down to the page selector Input component as `inputRoot` .
       */
      pageSizeInputRoot?: string
      /**
       * Styles passed down to the page selector Input component as `container`.
       */
      pageSizeInputContainer?: string
      /**
       * Styles applied to each navigation `IconButton` icon container.
       */
      iconContainer?: string
      /**
       * Styles applied to each navigation icon.
       */
      icon?: string
      /**
       * Styles applied to the page size dropdown icon.
       */
      selectDownIcon?: string
    }
    /**
     * The number of pages the component has.
     */
    pages?: number
    /**
     * The currently selected page (0-indexed).
     */
    page?: number
    /**
     * Controls whether the left page size mechanism should be visible.
     */
    showPageSizeOptions?: boolean
    /**
     * The array of possible page sizes for the dropdown.
     */
    pageSizeOptions?: number[]
    /**
     * The currently selected page size.
     */
    pageSize?: number
    /**
     * Controls whether the central page changing mechanism should be visible.
     */
    showPageJump?: boolean
    /**
     * Controls whether the previous/first page buttons are enabled.
     */
    canPrevious?: boolean
    /**
     * Controls whether the next/last page buttons are enabled.
     */
    canNext?: boolean
    /**
     * Function called when the page changes.
     */
    onPageChange?: (page: number) => void
    /**
     * Function called when the page size changes.
     */
    onPageSizeChange?: (pageSize: number) => void
    /**
     * Class names to be applied.
     */
    className?: string
    /**
     * Id to be applied to the root node.
     */
    id?: string
    /**
     * An object containing all the labels for the component.
     *
     */
    labels?: {
      pageSizePrev?: string
      pageSizeEntryName?: string
      pageSizeSelectorDescription?: string
      pagesSeparator?: string
      pagesIndeterminate?: string
    }
  }
}
