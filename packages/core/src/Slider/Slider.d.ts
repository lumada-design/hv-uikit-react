import * as React from "react";
import { StandardProps } from "@mui/material";
import { SliderProps } from "rc-slider";
import { HvFormStatus } from "../Forms/FormElement";
import { HvInputProps } from "..";

export interface KnobProperty {
  color?: string;
  defaultValue?: number;
  hidden?: boolean;
  fixed?: boolean;
  hoverColor?: string;
  trackColor?: string;
  dragColor?: string;
}

export interface MarkProperty {
  position?: number;
  label?: string;
}

export type HvSliderClassKey =
  | "root"
  | "rootRange"
  | "labelContainer"
  | "label"
  | "handleContainer"
  | "sliderRoot"
  | "trackDragging"
  | "rootDisabled"
  | "trackStandBy"
  | "error"
  | "handleHiddenContainer"
  | "handleContainerDisabled"
  | "labelIncluded"
  | "onlyInput"
  | "dot"
  | "rail"
  | "knobInner"
  | "knobOuter"
  | "knobHidden"
  | "knobHiddenLast"
  | "track"
  | "mark"
  | "sliderTooltip"
  | "sliderContainer";

export interface HvSliderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSliderClassKey, "onChange"> {
  /**
   * The label of the slider element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;

  /**
   * The status of the slider element.
   *
   * Valid is correct, invalid is incorrect and standBy means no validations have run.
   *
   * When uncontrolled and unspecified it will default to "standBy" and change to either "valid"
   * or "invalid" after any change to the state.
   */
  status?: HvFormStatus | HvFormStatus[];
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage?: React.ReactNode;

  /**
   * Whether the slider is disabled.
   */
  disabled?: boolean;

  /**
   * The object created by material to apply to the component.
   */
  theme?: any;

  /**
   * Name of the form element.
   *
   * Part of a name/value pair, should be the name property of the undelying native input.
   */
  name?: string;

  /**
   * The values array to apply to the component
   */
  values?: number[];

  /**
   * The default values array to apply to the component
   */
  defaultValues?: number[];

  /**
   * The object used to set the knob properties,
   * for every item in the array a new knob will be created.
   */
  knobProperties?: KnobProperty[];

  /**
   * The object used to set the mark properties individually.
   */
  markProperties?: MarkProperty[];

  /**
   * the function executed before a change will occur in the slider.
   */
  onBeforeChange?: (value: number[]) => any;

  /**
   * the function executed while a change is occurring in the slider.
   */
  onChange?: (value: number[]) => any;

  /**
   * the function executed after a change ocurred in the slider.
   */
  onAfterChange?: (value: number[]) => any;

  /**
   * the separation in points between marks.
   * example: if 10 divisions and a markstep of 2 there will be 5 marks.
   */
  markStep?: number;

  /**
   * how many subdivisions there are in the slider.
   */
  divisionQuantity?: number;

  /**
   * the value of the first point in the slider from left to right.
   */
  minPointValue?: number;

  /**
   * the value of the last point in the slider from left to right.
   */
  maxPointValue?: number;

  /**
   * the nax number of decimals if no format function is applied
   */
  markDigits?: number;

  /**
   * a formatting function used to add format to the marks in the track,
   * the function receives the mark text
   */
  formatMark?: (label: React.ReactNode | string) => React.ReactNode | string;

  /**
   * a formatting function used to add format to the tooltip in the track,
   * the function receives the mark text
   */
  formatTooltip?: (label: React.ReactNode | string) => React.ReactNode | string;
  /**
   * if `true` the input that controls the slider is hidden.
   */
  hideInput?: boolean;

  /**
   * if `true` the knobs can't have the same value, if `false` knobs can have the same value.
   */
  noOverlap?: boolean;
  /**
   * Attributes applied to the input element.
   */
  inputProps?: HvInputProps[];
  /**
   * Attributes applied to the knob element.
   */
  knobProps?: React.HTMLAttributes<HTMLDivElement>[];
  /**
   * Attributes applied to the input element.
   */
  sliderProps?: SliderProps;
}

export default function HvSlider(props: HvSliderProps): JSX.Element | null;
