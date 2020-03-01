declare module "@hv/uikit-react-core/dist/Tab" {
  import React from 'react'
  
  class HvTab extends React.Component<HvTabProps, any> {}

  export default HvTab

  export interface HvTabProps extends React.HTMLAttributes<HvTab> {
    /**
     * A Jss Object used to override or extend the component styles.
     */
    classes?: {
      /**
       * Styles applied to the root element.
       */
      root: string;
      /**
       * Styles applied to the label container element if `label` is provided.
       */
      labelContainer: string;
      /**
       * Styles applied to the root element if `selected={true}` (controlled by the Tabs component).
       */
      selected: string;
      /**
       * Styles applied to the root element if `disabled={true}` (controlled by the Tabs component).
       */
      disabled: string;
    };
    /**
     * If `true`, the tab will be disabled.
     */
    disabled?: boolean;
    /**
     * The icon element.
     */
    icon?: string | React.ReactElement<any>;
    /**
     * The label element.
     */
    label?: React.ReactNode;
  }
}
