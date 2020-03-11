declare module "@hv/uikit-react-core/dist" {
  export class HvCheckBox extends React.Component<HvCheckBoxProps, any> {}

  export interface HvCheckBoxProps extends React.HTMLAttributes<HvCheckBox> {
    /**
     * A Jss Object used to override or extend the styles applied to the checkbox.
     */
    classes?: {
      /**
       * Styles applied to the component.
       */
      container?: string;
      /**
       * Styles applied to the label typography.
       */
      labelTypography?: string;
      /**
       * Styles applied to the component when the label is disable.
       */
      labelDisabled?: string;
      /**
       *  Styles applied to the label when the position is end.
       */
      labelEnd?: string;
      /**
       * Styles applied to the label when the position is start.
       */
      labelStart?: string;
      /**
       * Styles applied to the checkbox core element (material-ui).
       */
      checkBox?: string;
      /**
       * Styles applied to the icon.
       */
      icon?: string;
      /**
       * Styles applied to the icon when not selected.
       */
      iconEmpty?: string;
      /**
       * Styles applied to the icon when selected.
       */
      iconFull?: string;
      /**
       * Styles applied to the icon when disable.
       */
      iconDisable?: string;
      /**
       * Styles applied to the icon when indeterminate.
       */
      iconIndeterminate?: string;
    };

    /**
     * If `true` the checkbox is disabled and the onClick function will not be called.
     */
    disabled?: boolean;

    /**
     * The function executed when the checkbox is pressed.
     */
    onChange?: (...args: any[]) => any;

    /**
     * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
     * note: if this value is specified the state of the checkbox must be managed
     */
    checked?: boolean;

    /**
     * If `true` the checkbox uses the intermediate state, if set to `false` the checkbox will not use the intermediate state.
     */
    indeterminate?: boolean;

    /**
     * The value of the checkbox. This value will be returned in the event object generated for the onChange callback
     */
    value?: string;

    /**
     * The label to be added to the checkbox.
     */
    label?: string;

    /**
     * The position of the checkbox label.
     *  - Accepted values:
     *    --"start",
     *    --"end"
     *  - note: the labelPositions object should be used to set this value.
     */
    labelPlacement?: "start" | "end";

    /**
     * Extra properties passed to the MUI FormControlLabel component.
     */
    formControlLabelProps?: any;

    /**
     * @deprecated Instead use the formControlLabelProps property
     */
    propsIcon?: string;

    /**
     * Extra properties passed to the MUI Checkbox component.
     */
    checkboxProps?: any;

    /**
     * @deprecated Instead use the checkboxProps property
     */
    propsLabel?: string;

    /**
     * The theme passed by the provider.
     */
    theme?: any;
  }
}
