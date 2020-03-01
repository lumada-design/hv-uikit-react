declare module '@hv/uikit-react-core/dist/NewHeader' {
  import React from 'react'
  
  class HvHeader extends React.Component<HvHeaderProps, any> {}

  export default HvHeader

  export interface HvHeaderProps extends React.HTMLAttributes<HvHeader> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string

      /**
       * Styles applied to the component header class.
       */
      header?: string
    }

    /**
     * Position of the component.
     */
    position?: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'
  }

  export class HvHeaderBrand extends React.Component<HvHeaderBrandProps, any> {}

  export interface HvHeaderBrandProps
    extends React.HTMLAttributes<HvHeaderBrand> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string

      /**
       * Styles applied to the separator component class.
       */
      separator?: string
    }

    /**
     * The brand image node.
     */
    logo?: React.ReactNode

    /**
     * The brand name string.
     */
    name?: string
  }

  export class HvHeaderActions extends React.Component<
    HvHeaderActionsProps,
    any
  > {}

  export interface HvHeaderActionsProps
    extends React.HTMLAttributes<HvHeaderActions> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
    }
  }

  export interface HeaderNavigationData {
    id: string
    label: string
    data?: HeaderNavigationData[]
  }

  export class HvHeaderNavigation extends React.Component<
    HvHeaderNavigationProps,
    any
  > {}

  export interface HvHeaderNavigationProps
    extends React.HTMLAttributes<HvHeaderNavigation> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
    }

    /**
     * An array containing the data for each menu item.
     *
     * id - the id to be applied to the root element.
     * label - the label to be rendered on the menu item.
     */
    data?: HeaderNavigationData[]

    /**
     * Menu item id selected.
     */
    selected?: string

    /**
     * Callback triggered when any item is clicked.
     */
    onClick?: (e: MouseEvent, selectedItem: HeaderNavigationData) => void
  }
}
