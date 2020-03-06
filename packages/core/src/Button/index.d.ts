declare module '@hv/uikit-react-core/dist/Button' {
  import React from 'react'

  class HvButton extends React.Component<HvButtonProps, any> {}

  export default HvButton

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
    category?: 'primary' | 'secondary' | 'ghost' | 'ghostSecondary' | 'semantic' | 'icon'

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      
      /**
       * Styles applied to the component root class.
       */
      root?: string

      /**
       * Styles applied to the component root when category is icon.
       */
      rootIcon?: string

      /**
       * Styles applied to the primary button.
       */
      primary?: string

      /**
       * Styles applied to the primary button when it is disabled.
       */
      primaryDisabled?: string

      /**
       * Styles applied to the secondary button.
       */
      secondary?: string

      /**
       * Styles applied to the secondary button when it is disabled.
       */
      secondaryDisabled?: string

      /**
       * Styles applied to the ghost button.
       */
      ghost?: string

      /**
       * Styles applied to the ghost button when it is disabled.
       */
      ghostDisabled?: string

      /**
       * Styles applied to the secondary ghost button.
       */
      ghostSecondary?: string

      /**
       * Styles applied to the secondary ghost button when it is disabled.
       */
      ghostSecondaryDisabled?: string

      /**
       * Styles applied to the semantic button.
       */
      semantic?: string

      /**
       * Styles applied to the semantic button when it is disabled.
       */
      semanticDisabled?: string

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

      /**
       * Styles applied to the icon on the left.
       */
      startIcon?: string
    }

    /**
     * If `true` the button is disabled and the onClick function will not be called.
     */
    disabled?: boolean

    /**
     * The function executed when the button is pressed.
     */
    onClick?: (...args: any[]) => any

    /**
     * The icon to be rendered before the children.
     */
    startIcon?: React.ReactNode
  }
}
