import { StandardProps } from "@material-ui/core";
import { HvTagProps } from "../Tag/Tag";
import { HvCharCounterProps } from "../Forms/CharCounter";

import { HvBaseInputProps } from "../BaseInput";

export type HvTagsInputClassKey =
  | "root"
  | "disabled"
  | "resizable"
  | "invalid"
  | "labelContainer"
  | "label"
  | "characterCounter"
  | "description";

export interface HvTagsInputProps
  extends StandardProps<HvBaseInputProps, HvTagsInputClassKey, "onChange" | "onBlur"> {
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
  disabled: boolean;
  /**
   * Indicates that the form element is not editable.
   */
  readOnly: boolean;

  /**
   * If `true` it should autofocus.
   */
  autoFocus?: boolean;

  /**
   * If `true` the component is resizable.
   */
  resizable?: boolean;

  /**
   * The placeholder value of the input.
   */
  placeholder: string;

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
  value: string[] | HvTagProps[];
  /**
   *  When uncontrolled, defines the initial input value.
   */
  defaultValue: string[] | HvTagProps[];

  /**
   * Props passed to the char count.
   */
  countCharProps?: HvCharCounterProps;

  /**
   * If `true` the component is in multiline mode.
   */
  multiline: boolean;

  /**
   * Called back when the value is changed.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function HvTagsInput(props: HvTagsInputProps): JSX.Element | null;
