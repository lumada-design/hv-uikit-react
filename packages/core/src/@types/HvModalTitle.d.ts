declare module '@hv/uikit-react-core/dist' {
  export class HvModalTitle extends React.Component<HvModalTitleProps, any> {}

  export interface HvModalTitleProps
    extends React.HTMLAttributes<HvModalTitle> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the root of the component (container for the title).
       */
      root?: string
      /**
       * Style applied to the container of the title
       */
      messageContainer?: string
      /**
       * Style applied to the text when the icon is present.
       */
      textWithIcon?: string
      /**
       * Style applied to the icon.
       */
      icon?: string
    }

    /**
     * Variant of the modal.
     */
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default'

    /**
     * Controls if the associated icon to the variant should be shown.
     */
    showIcon?: boolean

    /**
     * Custom icon to replace the variant default.
     */
    customIcon?: React.ReactNode

    /**
     * The theme passed by the provider.
     */
    theme?: any
  }
}
