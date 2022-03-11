import { StandardProps } from "@material-ui/core";
import { HvTagProps } from "../Tag/Tag";
import { HvCharCounterProps } from "../Forms/CharCounter";
import { HvFormStatus } from "../Forms/FormElement";

import { HvInputProps } from "..";
import { HvBaseInputValidationMessagesProps } from "../BaseInput";

export type HvTagsInputClassKey =
  | "root"
  | "disabled"
  | "resizable"
  | "invalid"
  | "labelContainer"
  | "label"
  | "characterCounter"
  | "description"
  | "error";

export interface HvTagsInputProps
  extends StandardProps<HvInputProps, HvTagsInputClassKey, "onChange" | "onBlur" | "onFocus"> {
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
   * @ignore
   */
  "aria-describedby"?: string;

  /**
   * Indicates that the form element is disabled.
   */
  disabled?: boolean;
  /**
   * Indicates that the form element is not editable.
   */
  readOnly?: boolean;
  /**
   * Indicates that the form element is required.
   */
  required?: boolean;

  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;

  /**
   * If `true` the component is resizable.
   */
  resizable?: boolean;

  /**
   * If `true` the character counter isn't shown even if maxTagsQuantity is set.
   */
  hideCounter?: boolean;
  /**
   * Text between the current char counter and max value.
   */
  middleCountLabel?: string;
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxTagsQuantity?: number;

  /**
   * The value of the form element.
   */
  value?: string[] | HvTagProps[];
  /**
   *  When uncontrolled, defines the initial input value.
   */
  defaultValue?: string[] | HvTagProps[];

  /**
   * Props passed to the char count.
   */
  countCharProps?: HvCharCounterProps;

  /**
   * If `true` the component is in multiline mode.
   */
  multiline?: boolean;

  /**
   * Called back when the value is changed.
   */
  onAdd?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEventHandler<HTMLElement>,
    value: HvTagProps,
    index: number
  ) => void;

  /**
   * The function that will be executed when a tag is deleted.
   */
  onDelete?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEventHandler<HTMLElement>,
    value: HvTagProps,
    index: number
  ) => void;

  /**
   * The function that will be executed when a tag is added.
   */
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEventHandler<HTMLElement>,
    value: HvTagProps[]
  ) => void;

  /**
   * The function that will be executed when the input is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>, value: string) => void;

  /**
   * The function that will be executed when the input is focused.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>, value: string) => void;

  /**
   * The status of the form element.
   */
  status?: HvFormStatus;
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;

  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages?: HvBaseInputValidationMessagesProps;

  /**
   * An array of strings that represent the character used to input a tag.
   * This character is the string representation of the event.code from the input event.
   */
  commitTagOn?: string[];
  /**
   * If `true` the tag will be commited when the blur event occurs.
   */
  commitOnBlur?: boolean;
}

export default function HvTagsInput(props: HvTagsInputProps): JSX.Element | null;
