declare module '@hv/uikit-react-core/dist/NewVerticalNavigation' {
  import React from 'react'
  
  class HvVerticalNavigation extends React.Component<
    HvVerticalNavigationProps,
    any
  > {}

  export default HvVerticalNavigation

  export interface HvVerticalNavigationProps
    extends React.HTMLAttributes<HvVerticalNavigation> {
    /**
     * A Jss Object used to override or extend the styles applied to the component.
     */
    classes?: {
      /**
       * Style applied to the root of the component.
       */
      root?: string
    }

    /**
     * Sets if the navigation should have a button to hide itself.
     */
    isCollapsable?: boolean

    /**
     * Is the navigation open.
     */
    isOpen?: boolean

    /**
     * Callback when the navigation toggles between open and close.
     */
    toggleOpenCallback?: (any) => any // TODO

    /**
     * Position of the component.
     */
    position?: 'static' | 'relative' | 'fixed' | 'absolute'

    /**
     * Defines if the navigation should close when losing focus / clicking outside.
     */
    closeOnExit?: boolean
  }

  export class Navigation extends React.Component<NavigationProps, any> {}

  export interface NavigationData {
    id: string
    label: string
    icon?: ReactNode
    data?: NavigationData[]
  }

  export interface NavigationProps extends React.HTMLAttributes<Navigation> {
    /**
     * The theme passed by the provider.
     */
    theme?: any

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the component.
       */
      root?: string
    }

    /**
     * Label.
     */
    label?: string

    /**
     * An array containing the data for each menu item.
     *
     * id - the id to be applied to the root element.
     * label - the label to be rendered on the menu item.
     */
    data?: NavigationData[]

    /**
     * Menu item id selected.
     */
    selected?: string

    /**
     * Callback triggered when any item is clicked.
     */
    onClick?: (e: MouseEvent, selectedItem: NavigationData) => void
  }
}
