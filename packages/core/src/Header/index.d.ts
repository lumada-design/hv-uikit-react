declare module '@hv/uikit-react-core/dist/Header' {
  import React from 'react'
  
  class HvHeader extends React.Component<HvHeaderProps, any> {}

  export default HvHeader

  export interface NavigationStructure {
    showSearch?: boolean
    data?: NavigationStructureData[]
  }

  export interface NavigationStructureData {
    id?: string
    label: string
    selected?: boolean
    isHidden?: boolean
    leftIcon?: (...args: any[]) => any
    iconCallback?: (arg: { isSelected: boolean }) => any
    showNavIcon?: boolean
    path?: string
    params?: any
    subData?: {
      data: {
        label?: string
        path?: string
      }[]
    }
  }

  export interface NavigationData {
    label?: string
    path?: string
    subData?: {
      label?: string
      path?: string
    }[]
  }

  export interface UserData {
    name?: string
    role?: string
  }

  export interface HeaderLabel {
    productName?: string
    tenantName?: string
  }

  export interface ResponsivenessConfig {
    showHbMenus?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    showNavigation?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    showUser?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    showActions?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    centerAlignElement?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }

  export interface ActionValue {
    id?: string
    label: string
    selected?: boolean
    isHidden?: boolean
    leftIcon?: (...args: any[]) => any
    iconCallback?: (...args: any[]) => any
    showNavIcon?: boolean
    subData?: any
    path?: string
    onVerticalClick?: (...args: any[]) => any
    params?: any
    horizontalItemAction?: React.ReactNode
  }

  export interface HvHeaderProps extends React.HTMLAttributes<HvHeader> {
    /**
     * The theme passed by the provider.
     */
    theme?: any

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      shadowPadding?: string
      root?: string
      navButton?: string
      verticalNavigationContainer?: string
      verticalNavigationSeparation?: string
    }

    /**
     * The position property of the header.
     */
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative'

    /**
     * Company logo. Can be a path for a image or a component.
     */
    companyLogo?: React.ReactNode

    /**
     * Product logo. Can be a path for a image or a component.
     */
    productLogo?: React.ReactNode

    /**
     * Product text.
     * @deprecated Instead use the label property
     */
    productText?: string

    /**
     * Product text.
     */
    label?: string

    /**
     * Props passed to the navigation component
     */
    navigationStructure?: NavigationStructure

    /**
     * The index of the selected navigation item.
     */
    selected?: number | number[]

    /**
     * The data used for creating the navigation item.
     * @deprecated
     */
    navigationData?: NavigationData[]

    /**
     * Path to be as base to be concatenated with the pat of the navigation data.
     */
    basePath?: string

    /**
     * Indicates if the router should be used.
     */
    useRouter?: boolean

    /**
     * Function when the navigation item detects a keydown. It returns the index.
     */
    onNavigationKeyDown?: (...args: any) => any

    /**
     * Function when the navigation item is click. It returns the selected index.
     */
    onNavigationClick?: (...args: any) => any

    /**
     * Object containing the text to be present
     */
    userData?: UserData

    /**
     * Object containing the labels to be present
     */
    labels?: HeaderLabel

    /**
     * Image to be render. If a path is passed an image is render, otherwise the component itself.
     */
    userIcon?: React.ReactNode

    /**
     * Function to be triggered by clicking in any point of container.
     */
    userClick?: (...args: any[]) => any

    /**
     * Array with the components to be render.
     * @deprecated
     */
    itemActions?: React.ReactElement[]

    /**
     * Array with responsiveness breakpoints for components.
     * *  - Accepted values:
     *    --"xs",
     *    --"sm",
     *    --"md",
     *    --"lg",
     *    --"xl",
     */
    responsivenessConfig?: ResponsivenessConfig

    /**
     * Property set for actions to be displayed in the Vertical Navigation.
     */
    actionValues?: ActionValue[]

    fixVerticalNavigation?: boolean
  }
}
