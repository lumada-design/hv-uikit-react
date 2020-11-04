import { StandardProps } from "@material-ui/core";
import { HvInputLabelsProp, HvInputProps } from "../Input";

export interface HvTextAreaLabelsProp extends HvInputLabelsProp {
  /**
   * Text before the current char counter.
   */
  startCount: string;
  /**
   * Text between the current char counter and max value.
   */
  middleCount: string;
  /**
   * Text after the max value.
   */
  endCount: string;
}

export interface HvTextAreaProps extends StandardProps<HvInputProps, HvTextAreaClassKey, "labels"> {
  /**
   * An Object containing the various text associated with the input.
   */
  labels?: HvTextAreaLabelsProp;
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
  /**
   * If true it isn't possible to pass the `maxCharQuantity`
   */
  blockMax?: boolean;
  /**
   * Props passed to the char count.
   */
  countCharProps?: object;
  /**
   * Indicates that user input is required on the form element.
   */
  isRequired?: boolean;
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
