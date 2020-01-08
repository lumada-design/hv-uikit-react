declare module '@hv/uikit-react-lab/dist' {
  export class HvSlider extends React.Component<HvSliderProps, any> {}

  export interface KnobProperty {
    color?: string
    defaultValue?: number
    hidden?: bool
    fixed?: bool
    hoverColor?: string
    trackColor?: string
    dragColor?: string
  }

  export interface MarkProperty {
    position?: number
    label?: string
  }

  export interface HvSliderProps extends React.HTMLAttributes<HvSlider> {
    /**
     * The object created by material to apply to the component.
     */
    theme?: any

    /**
     * The values array to apply to the component
     */
    values?: number[]

    /**
     * The default values array to apply to the component
     */
    defaultValues?: number[]

    /**
     * The object used to set the knob properties,
     * for every item in the array a new knob will be created.
     */
    knobProperties: KnobProperty[]

    /**
     * The object used to set the mark properties individually.
     */
    markProperties?: MarkProperty[]

    /**
     * the function executed before a change will ocurr in the slider.
     * it will receive an object like
     * {
     *   knobsPosition: [],
     *   knobsValues: []
     * }
     */
    onBeforeChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any

    /**
     * the function executed while a change is ocurring in the slider.
     * it will receive an object like
     * {
     *   knobsPosition: [],
     *   knobsValues: []
     * }
     */
    onChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any

    /**
     * the function executed after a change ocurred in the slider.
     * it will receive an object like
     * {
     *   knobsPosition: [],
     *   knobsValues: []
     * }
     */
    onAfterChange?: (args: { knobsPosition: any[]; knobsValues: any[] }) => any

    /**
     * the separation in points between marks.
     * example: if 10 divisions and a markstep of 2 there will be 5 marks.
     */
    markStep?: number

    /**
     * how many subdivisions there are in the slider.
     */
    divisionQuantity?: number

    /**
     * the value of the first point in the slider from left to right.
     */
    minPointValue?: number

    /**
     * the value of the last point in the slider from left to right.
     */
    maxPointValue?: number

    /**
     * the nax number of decimals if no format function is applied
     */
    markDigits?: number

    /**
     * a formatting function used to add format to the marks in the track,
     * the function receives the mark text
     */
    formatMark?: (...args: any[]) => any

    /**
     * a formatting function used to add format to the tooltip in the track,
     * the function receives the mark text
     */
    formatTooltip?: (...args: any[]) => any

    /**
     * if `true` the knobs can't have the same value, if `false` knobs can have the same value.
     */
    noOverlap?: boolean

    /**
     * the classes object to be applied into the root object.
     */
    classes?: {
      /**
       * Style applied to the root of the component.
       */
      root?: string
      /**
       * Style applied to the dot.
       */
      dot?: string
      /**
       * Style applied to the rail.
       */
      rail?: string
      /**
       * Style applied to the inner of the knob.
       */
      knobInner?: string
      /**
       * Style applied to the outside of the knob.
       */
      knobOuter?: string
      /**
       * Style applied when the knob is hidden.
       */
      knobHidden?: string
      /**
       * Style applied  last hidden knob.
       */
      knobHiddenLast?: string
      /**
       * Style applied to the track.
       */
      track?: string
      /**
       * Style applied to the mark.
       */
      mark?: string
      /**
       * Style applied to the tooltip.
       */
      sliderTooltip?: string
    }
  }
}
