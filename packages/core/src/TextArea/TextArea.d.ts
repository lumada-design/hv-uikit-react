import { StandardProps } from "@material-ui/core";
import { HvInputProps } from "../Input";

export interface HvTextAreaProps extends StandardProps<HvInputProps, HvTextAreaClassKey> {
  /**
   * The number of rows of the text area
   */
  rows?: number;
  /**
   * If ´true´ the component is resizable.
   */
  resizable?: boolean;
  /**
   * Auto-scroll: automatically scroll to the end on value changes.
   * Will stop if the user scrolls up and resume if scrolled to the bottom.
   */
  autoScroll?: boolean;
}

export type HvTextAreaClassKey =
  | "root"
  | "input"
  | "resize"
  | "inputRoot"
  | "inputRootDisabled"
  | "inputRootFocused"
  | "defaultWith"
  | "characterCounter"
  | "inline"
  | "separator"
  | "maxCharacter"
  | "currentCounter"
  | "disabled"
  | "container";

export default function HvTextArea(props: HvTextAreaProps): JSX.Element | null;
