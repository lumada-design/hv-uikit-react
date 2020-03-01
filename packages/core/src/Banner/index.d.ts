declare module '@hv/uikit-react-core/dist/Banner' {
  class HvBanner extends React.Component<HvBannerProps, any> {}

  export default HvBanner

  export interface BannerAction {
    id: string
    label: string
    icon?: (...args: any[]) => any
    disabled?: boolean
  }

  export interface HvBannerProps extends React.HTMLAttributes<HvBanner> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
      /**
       * Styles applied to the component when define as top.
       */
      anchorOriginTopCenter?: string
      /**
       * Styles applied to the component when define as bottom.
       */
      anchorOriginBottomCenter?: string
    }

    /**
     *  If true, Snackbar is open.
     */
    open?: boolean

    /**
     * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
     */
    onClose?: (...args: any[]) => any

    /**
     * The message to display.
     */
    label?: string

    /**
     *  The anchor of the Snackbar.
     */
    anchorOrigin?: 'top' | 'bottom'

    /**
     * Variant of the snackbar.
     */
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default'

    /**
     * Custom icon to replace the variant default.
     */
    customIcon?: React.ReactNode

    /**
     * Controls if the associated icon to the variant should be shown.
     */
    showIcon?: boolean

    /**
     * Actions to display on the right side.
     */
    actions?: React.ReactNode | BannerAction[]

    /**
     *  The callback function ran when an action is triggered, receiving ´action´ as param
     */
    actionsCallback?: (...args: any[]) => any

    /**
     * The position property of the header.
     */
    actionsPosition?: 'auto' | 'inline' | 'bottom-right'

    /**
     * How much the transition animation last in milliseconds, if 0 no animation is played.
     */
    transitionDuration?: number

    /**
     * Direction of slide transition.
     */
    transitionDirection?: 'up' | 'down' | 'left' | 'right'

    /**
     * Offset from top/bottom of the page, in px. Defaults to 60px.
     */
    offset?: number

    // deprecated:
    /**
     * The message to display.
     * @deprecated. Instead use the label property
     */
    message?: string

    /**
     * Actions to display on the right side.
     * @deprecated. Instead use the actions property
     */
    action?: React.ReactNode

    /**
     * Actions to display on message.
     * @deprecated. Instead use the actions property together with actionsPosition="inline"
     */
    actionsOnMessage?: React.ReactNode
  }
}
