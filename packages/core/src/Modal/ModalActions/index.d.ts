declare module '@hv/uikit-react-core/dist/Modal/ModalActions' {
  import React from 'react'

  class HvModalActions extends React.Component<
    HvModalActionsProps,
    any
  > {}

  export default HvModalActions

  export interface HvModalActionsProps
    extends React.HTMLAttributes<HvModalActions> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the root of the component (container for the actions).
       */
      root?: string
      /**
       * Style applied to each child action.
       */
      action?: string
    }
  }
}
