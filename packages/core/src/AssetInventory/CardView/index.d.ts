declare module '@hv/uikit-react-core/dist/AssetInventory/CardView' {
  import { HvCardProps } from '@hv/uikit-react-core/dist/Card'
  class HvCardView extends React.Component<HvCardViewProps> {}

  export default HvCardView

  export type HvCardViewBreakPointValue =
    | 'false'
    | 'auto'
    | 'true'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
  export interface HvCardViewBreakPoints {
    xs?: HvCardViewBreakPointValue
    sm?: HvCardViewBreakPointValue
    md?: HvCardViewBreakPointValue
    lg?: HvCardViewBreakPointValue
    xl?: HvCardViewBreakPointValue
  }

  export interface HvCardViewProps extends React.HTMLAttributes<HvCardView> {
    /**
     * Class names to be applied.
     */
    className?: string
    /**
     * Id to be applied to the root node.
     */
    id?: string
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      gridContainer: string
    }
    /**
     * Icon used in the multi button in the assert inventory.
     */
    icon?: React.ReactNode
    /**
     * Metadata associated with the values.
     */
    metadata?: {
      id?: string
      title?: string
      accessor?: string
      cellType?: 'alpha-numeric' | 'numeric' | 'date' | 'node'
      sortable?: boolean
      sortFunction?: (...args: any[]) => any
      searchable?: boolean
      searchFunction?: (...args: any[]) => any
    }[]
    /**
     * Values to be passed to the card render.
     */
    values: HvCardProps[]
    /**
     * Selected values.
     */
    selectedValues?: string[]
    /**
     * Custom render for the cards.
     */
    renderer?: (value: HvCardProps) => any
    /**
     * innerCardContent to be passed to the standard render.
     */
    innerCardContent?: (value: HvCardProps) => any
    /**
     * Configuration settings for the view.
     */
    viewConfiguration?: {
      /**
       * Callback evoked in the selection of the card.
       */
      onSelection?: (...args: any[]) => any
      /**
       * Defines if the view allows selections.
       */
      isSelectable?: boolean
      /**
       * List of actions to be passed to the cards.
       */
      actions?: {
        id?: string
        iconCallback?: (...args: any[]) => React.ReactNode
        disabled?: boolean
      }[]
      /**
       *  The callback function ran when an action is triggered, receiving ´action´ as param
       */
      actionsCallback?: (...args: any[]) => any
      /**
       *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
       */
      maxVisibleActions?: number
      /**
       * Defines the number of columns the component is going to use. Check the
       * Grid component for possible values
       */
      breakpoints?: HvCardViewBreakPoints
    }
  }
}
