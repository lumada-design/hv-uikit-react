import * as React from "react";
import { StandardProps } from "@mui/material";

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
  | "dot"
  | "rail"
  | "knobInner"
  | "knobOuter"
  | "knobHidden"
  | "knobHiddenLast"
  | "track"
  | "mark"
  | "sliderTooltip";

export interface HvSliderProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvSliderClassKey, "onChange"> {
  /**
   * The object created by material to apply to the component.
   */
  theme?: any;

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
  knobProperties: KnobProperty[];

  /**
   * The object used to set the mark properties individually.
   */
  markProperties?: MarkProperty[];

  /**
   * the function executed before a change will ocurr in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onBeforeChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any;

  /**
   * the function executed while a change is ocurring in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any;

  /**
   * the function executed after a change ocurred in the slider.
   * it will receive an object like
   * {
   *   knobsPosition: [],
   *   knobsValues: []
   * }
   */
  onAfterChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any;

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
  formatMark?: (...args: any[]) => any;

  /**
   * a formatting function used to add format to the tooltip in the track,
   * the function receives the mark text
   */
  formatTooltip?: (...args: any[]) => any;

  /**
   * if `true` the knobs can't have the same value, if `false` knobs can have the same value.
   */
  noOverlap?: boolean;
}

export default function HvSlider(props: HvSliderProps): JSX.Element | null;
