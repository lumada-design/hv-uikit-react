import { StandardProps } from "@mui/material";
import { HvCharCounterProps } from "../Forms/CharCounter";

import { HvBaseInputProps, HvBaseInputValidationMessagesProps } from "../BaseInput";

import { HvFormStatus } from "../Forms/FormElement";

export type HvTextAreaClassKey =
  | "root"
  | "disabled"
  | "resizable"
  | "invalid"
  | "baseInput"
  | "input"
  | "inputResizable"
  | "labelContainer"
  | "label"
  | "description"
  | "characterCounter"
  | "error";

export interface HvTextAreaProps
  extends StandardProps<HvBaseInputProps, HvTextAreaClassKey, "onChange" | "onBlur"> {
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /**
   * @ignore
   */
  "aria-label"?: string;
  /**
   * @ignore
   */
  "aria-labelledby"?: string;
  /**
   * Provide additional descriptive text for the form element.
   */
  description?: React.ReactNode;

  /**
   * The status of the form element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;
  /**
   * Identifies the element that provides an error message for the textarea.
   *
   * Will only be used when the validation status is invalid.
   */
  "aria-errormessage"?: string;

  /**
   * Text between the current char counter and max value.
   */
  middleCountLabel?: string;

  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages?: HvBaseInputValidationMessagesProps;

  /**
   * The custom validation function, it receives the value and must return
   * either `true` for valid or `false` for invalid, default validations would only
   * occur if this function is null or undefined
   */
  validation?: (value: string) => boolean;

  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;

  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxCharQuantity?: number;
  /**
   * The minimum allowed length of the characters, if this value is null no check
   * will be perform.
   */
  minCharQuantity?: number;

  /**
   * The number of rows of the text area
   */
  rows?: number;
  /**
   * If `true` the component is resizable.
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
   * If `true` the character counter isn't shown even if maxCharQuantity is set.
   */
  hideCounter?: boolean;

  /**
   * Props passed to the char count.
   */
  countCharProps?: HvCharCounterProps;

  /**
   * Called back when the value is changed.
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  /**
   * Called back when the value is changed.
   */
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement>,
    value: string,
    validationState: string
  ) => void;
}

export default function HvTextArea(props: HvTextAreaProps): JSX.Element | null;
