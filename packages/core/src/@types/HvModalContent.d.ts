declare module '@hv/uikit-react-core/dist' {
  export class HvModalContent extends React.Component<
    HvModalContentProps,
    any
  > {}

  export interface HvModalContentProps
    extends React.HTMLAttributes<HvModalContent> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the root of the component (container for the content).
       */
      root?: string
      /**
       * Style applied when the content is a string.
       */
      textContent?: string
    }
  }
}
