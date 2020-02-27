declare module "@hv/uikit-react-core/dist" {
  export class HvTabs extends React.Component<HvTabsProps, any> {}

  export interface HvTabsProps extends React.Component<HvTabs> {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * A Jss Object used to override or extend the component styles.
     */
    classes: {
      /**
       * Styles applied to the root element.
       */
      root: string;
      /**
       * Styles applied to the flex container element.
       */
      flexContainer: string;
      /**
       * Styles applied to the `TabIndicator` component.
       */
      indicator: string;
    };
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback
     * @param {number} value We default to the index of the child
     */
    onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
    /**
     * 	The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to `false`.
     */
    value: any;
  }
}
