declare module "@hv/uikit-react-core/dist" {
  export class HvModal extends React.Component<HvModalProps, any> {}

  export interface HvModalProps extends React.HTMLAttributes<HvModal> {
    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the background (outside) of the component.
       */
      background?: string;
      /**
       * Style applied to the component (root).
       */
      paper?: string;
      /**
       * Style applied to the close button.
       */
      closeButton?: string;
    };

    /**
     * Current state of the modal.
     */
    open: boolean;

    /**
     * Function executed on close.
     */
    onClose: (...args: any[]) => any;
  }
}
