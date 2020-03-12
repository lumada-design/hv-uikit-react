declare module "@hv/uikit-react-core/dist" {
  export class HvBanner extends React.Component<HvBannerProps, any> {}

  export interface HvBannerProps extends React.HTMLAttributes<HvBanner> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string;
      /**
       * Styles applied to the component when define as top.
       */
      anchorOriginTopCenter?: string;
      /**
       * Styles applied to the component when define as bottom.
       */
      anchorOriginBottomCenter?: string;
    };

    /**
     *  If true, Snackbar is open.
     */
    open: boolean;

    /**
     * Callback fired when the component requests to be closed. Typically onClose is used to set state in the parent component, which is used to control the Snackbar open prop. The reason parameter can optionally be used to control the response to onClose, for example ignoring clickaway.
     */
    onClose: (...args: any[]) => any;

    /**
     * The message to display.
     */
    label?: string;

    /**
     * The message to display.
     * @deprecated. Instead use the label property
     */
    message?: string;

    /**
     *  The anchor of the Snackbar.
     */
    anchorOrigin?: "top" | "bottom";

    /**
     * Variant of the snackbar.
     */
    variant?: "success" | "warning" | "error" | "info" | "default";

    /**
     * Custom icon to replace the variant default.
     */
    customIcon?: React.ReactNode;

    /**
     * Controls if the associated icon to the variant should be shown.
     */
    showIcon?: boolean;

    /**
     * Actions to display on the right side.
     */
    action?: React.ReactNode;

    /**
     * Actions to display on message.
     */
    actionsOnMessage?: React.ReactNode;

    /**
     * How much the transition animation last in milliseconds, if 0 no animation is played.
     */
    transitionDuration?: number;

    /**
     * Direction of slide transition.
     */
    transitionDirection?: "up" | "down" | "left" | "right";
  }
}
