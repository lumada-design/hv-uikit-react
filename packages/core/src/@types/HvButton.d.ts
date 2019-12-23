declare module '@hv/uikit-react-core/dist' {
  export class HvButton extends React.Component<HvButtonProps, any> {}

  export interface HvButtonProps extends React.HTMLAttributes<HvButton> {
    /**
     * Type of button to use.
     *  - Accepted values:
     *    --"submit",
     *    --"reset",
     *    --"button"
     * @deprecated
     */
    type?: 'submit' | 'reset' | 'button'

    /**
     * Type of color of HvButton to use.
     *  - Accepted values:
     *    --"primary",
     *    --"secondary",
     *    --"link"
     *  - note: the buttonType object should be used to set this value.
     * @deprecated
     */
    colorType?: 'primary' | 'secondary' | 'link'

    /**
     * Category of button to use.
     *  - Accepted values:
     *    --"primary",
     *    --"secondary",
     *    --"ghost"
     *    --"ghostSecondary"
     *  - note: the buttonType object should be used to set this value.
     */
    category?: 'primary' | 'secondary' | 'ghost' | 'ghostSecondary'

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
      /**
       * Styles applied to the primary primary button.
       */
      primary?: string
      /**
       * Styles applied to the primary primary button when it is disabled.
       */
      primaryDisabled?: string
      /**
       * Styles applied to the primary secondary button.
       */
      secondary?: string
      /**
       * Styles applied to the primary secondary button when it is disabled.
       */
      secondaryDisabled?: string
      /**
       * Styles applied to the primary ghost button.
       */
      ghost?: string
      /**
       * Styles applied to the primary ghost button when it is disabled.
       */
      ghostDisabled?: string
      /**
       * Styles applied to the primary secondary ghost  button.
       */
      ghostSecondary?: string
      /**
       * Styles applied to the primary secondary ghost button when it is disabled.
       */
      ghostSecondaryDisabled?: string
      /**
       * Styles applied to the inspireRed primary button.
       */
      inspireRedPrimary?: string
      /**
       * Styles applied to the inspireRed primary button when it is disabled.
       */
      inspireRedPrimaryDisabled?: string
      /**
       * Styles applied to the inspireRed secondary button.
       */
      inspireRedSecondary?: string
      /**
       * Styles applied to the inspireRed secondary button when it is disabled.
       */
      inspireRedSecondaryDisabled?: string
      /**
       * Styles applied to the inspireRed ghost button.
       */
      inspireRedGhost?: string
      /**
       * Styles applied to the inspireRed ghost button when it is disabled.
       */
      inspireRedGhostDisabled?: string
      /**
       * Styles applied to the inspireRed secondary ghost  button.
       */
      inspireRedGhostSecondary?: string
      /**
       * Styles applied to the inspireRed secondary ghost button when it is disabled.
       */
      inspireRedGhostSecondaryDisabled?: string
    }

    /**
     * If `true` the button is disabled and the onClick function will not be called.
     */
    disabled?: boolean

    /**
     * The function executed when the button is pressed.
     */
    onClick?: (...args: any[]) => any
  }
}
