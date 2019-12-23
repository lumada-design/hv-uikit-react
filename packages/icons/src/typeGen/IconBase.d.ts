declare module '@hv/uikit-react-icons/dist' {
  class IconBase extends React.Component<IconBaseProps> { }
  interface IconBaseProps extends React.HTMLAttributes<IconBase> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root when it is extra small.
       */
      rootXs?: string

      /**
       * Styles applied to the component root when it is small.
       */
      rootS?: string

      /**
       * Styles applied to the component root when it is medium.
       */
      rootM?: string

      /**
       * Styles applied to the component root when it is large.
       */
      rootL?: string

      /**
       * Styles applied to the component root when it is extra large.
       */
      rootXL?: string
    }

    /**
     * An array of strings representing the colors to override in the icon.
     * Each element inside the array will override a diferent color.
     */
    color?: string[]

    /**
     * A string that will override the viewbox of the svg
     */
    viewbox?: string

    /**
     * A string that will override the height of the svg
     */
    height?: string

    /**
     * A string that will override the width of the svg
     */
    width?: string

    /**
     * Sets one of the standard sizes of the icons
     */
    iconSize?: 'XS' | 'S' | 'M' | 'L' | 'XL'

    /**
     * Sets one of the standard semantic palette colors of the icon
     */
    semantic?: 'sema1' | 'sema2' | 'sema3' | 'sema4' | 'sema5' | 'sema6' | 'sema7' | 'sema8' | 'sema9' | 'sema10' | 'sema11' | 'sema12' | 'sema13' | 'sema14' | 'sema15' | 'sema16' | 'sema17' | 'sema18' | 'sema19'

    /**
     * Inverts the background-foreground on semantic icons
     */
    inverted?: boolean

    /**
     * Styles applied to the box around the svg.
     */
    boxStyles?: any

  }
}