import { StandardProps } from "@material-ui/core";
import { HvFormElementProps } from "@hitachivantara/uikit-react-core";

export type HvColorPickerClassKey = "root";

export interface HvColorPickerProps
  extends StandardProps<HvFormElementProps, HvColorPickerClassKey, "onChange"> {
  /**
   * The value color, in HEX format.
   */
  value?: string;
  /**
   * The default value color, in HEX format.
   */
  defaultValue?: string;
  /**
   * If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled.
   */
  disabled?: boolean;
  /**
   * If `true` the dropdown starts opened if `false` it starts closed.
   */
  expanded?: boolean;
  /**
   * When uncontrolled, defines the initial expanded state.
   */
  defaultExpanded?: boolean;
  /**
   * A function to be executed whenever the color changes.
   */
  onChange?: (color: string) => void;
}

export default function HvColorPicker(props: HvColorPickerProps): JSX.Element | null;
