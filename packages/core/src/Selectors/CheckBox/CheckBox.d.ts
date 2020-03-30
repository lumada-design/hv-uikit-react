import { StandardProps, CheckboxProps, FormControlProps } from "@material-ui/core";
import { LabelPositions } from "..";

export interface HvCheckBoxProps extends StandardProps<CheckboxProps, HvCheckBoxClassKey> {
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
  labelPlacement?: LabelPositions;
  /**
   * Extra properties passed to the MUI FormControlLabel component.
   */
  formControlLabelProps?: FormControlProps;
}

export type HvCheckBoxClassKey =
  | "container"
  | "disableFocus"
  | "labelTypography"
  | "labelDisabled"
  | "labelEnd"
  | "labelStart"
  | "checkBox"
  | "icon";

export default function HvCheckBox(props: HvCheckBoxProps): JSX.Element | null;
