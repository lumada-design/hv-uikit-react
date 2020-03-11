declare module "@hv/uikit-react-core/dist" {
  export class HvKpi extends React.Component<HvKpiProps, any> {}

  export interface KpiTextConfiguration {
    title?: string;
    indicator?: string;
    unit?: string;
    comparisonIndicatorInfo?: string;
  }

  export interface KpiLabels {
    title?: string;
    indicator?: string;
    unit?: string;
    comparisonIndicatorInfo?: string;
  }

  export interface HvKpiProps extends React.HTMLAttributes<HvKpi> {
    /**
     * A Jss Object used to override or extend the component styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      kpiContainer?: string;
      /**
       * Styles applied to the component visual indicator.
       */
      visualIndicatorContainer?: string;
      /**
       * Styles applied to the component comparison.
       */
      comparisonContainer?: string;
      /**
       * Styles applied to the component indicators.
       */
      indicatorsContainer?: string;
      /**
       * Styles applied to the component indicators text.
       */
      indicatorText?: string;
      /**
       * Styles applied to the component indicators unit.
       */
      indicatorUnit?: string;
      /**
       * Styles applied to the component comparison container right spacing.
       */
      spacingToTheRight?: string;
      /**
       * Styles applied to the component visual comparison.
       */
      comparisons?: string;
    };

    /**
     * An Element that will be rendered to the left of the kpi indicator text.
     */
    visualIndicator?: React.ReactNode;

    /**
     * An Element that will be rendered below the kpi indicator text.
     */
    visualComparison?: React.ReactNode;

    /**
     * The object that contains the different labels inside the kpi.
     *
     * - Title: The text at the top of the kpi.
     * - Indicator: The text in the middle of the kpi.
     * - Unit: The text to the right of the indicator.
     * - comparisonIndicatorInfo: the text to the right of the visual comparison.
     * @deprecated Instead use the labels property
     */
    kpiTextConfiguration?: KpiTextConfiguration;

    /**
     * The object that contains the different labels inside the kpi.
     *
     * - Title: The text at the top of the kpi.
     * - Indicator: The text in the middle of the kpi.
     * - Unit: The text to the right of the indicator.
     * - comparisonIndicatorInfo: the text to the right of the visual comparison.
     */
    labels?: KpiLabels;

    /**
     *  The typography variant used in the main text indicator of the KPI
     */
    indicatorTextVariant?: "5xlTitle" | "xxlTitle" | "lTitle" | "sTitle";

    /**
     *  The typography variant used in the main text indicator of the KPI
     */
    indicatorUnitTextVariant?: "sText" | "infoText";
  }
}
