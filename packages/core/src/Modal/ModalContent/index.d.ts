declare module '@hv/uikit-react-core/dist/Modal/ModalContent' {
  import React from 'react'
  
  class HvModalContent extends React.Component<
    HvModalContentProps,
    any
  > {}

  export default HvModalContent

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
