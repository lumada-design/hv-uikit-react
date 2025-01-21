import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { useLabels } from "../hooks/useLabels";
import { HvBaseProps } from "../types/generic";
import { HvTypography } from "../Typography";
import { staticClasses, useClasses } from "./Kpi.styles";

export { staticClasses as kpiClasses };

export type HvKpiClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  /** The text at the top of the kpi. */
  title: "",
  /** The text in the middle of the kpi. */
  indicator: undefined as string | undefined,
  /** The text to the right of the indicator. */
  unit: undefined as string | undefined,
  /** The text to the right of the visual comparison. */
  comparisonIndicatorInfo: undefined as string | undefined,
};

export type HvKpiLabelProps = Partial<typeof DEFAULT_LABELS>;

export interface HvKpiProps extends HvBaseProps<HTMLDivElement, "children"> {
  /**
   * An Element that will be rendered to the left of the kpi indicator text.
   */
  trendIndicator?: React.ReactNode;
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
   */
  labels?: HvKpiLabelProps;
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorTextVariant?: "display" | "title1" | "title2";
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorUnitTextVariant?: "title2" | "body";
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes?: HvKpiClasses;
}

/**
 * Key Performance Indicator is a type of performance measurement. It monitors a business indicator
 * and its success/failure against a given target. KPIs are the first item read on a dashboard.
 * Communicates simple, immediate and vital information for operational decision making.
 * @deprecated build KPIs with `HvCard`, or with your custom layouts
 */
export const HvKpi = (props: HvKpiProps) => {
  const {
    trendIndicator = null,
    visualIndicator = null,
    visualComparison = null,
    indicatorUnitTextVariant = "title2",
    indicatorTextVariant = "title1",
    labels: labelsProp,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvKpi", props);

  const { classes, cx } = useClasses(classesProp);

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const InternalVisualComparison =
    typeof visualComparison === "string" ? HvTypography : "div";

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div>
        <HvTypography variant="label">{labels.title}</HvTypography>
      </div>
      <div className={classes.indicatorsContainer}>
        {visualIndicator && (
          <div
            className={cx(
              classes.visualIndicatorContainer,
              classes.spacingToTheRight,
            )}
          >
            {visualIndicator}
          </div>
        )}
        {labels.indicator && (
          <HvTypography
            className={cx(classes.spacingToTheRight, classes.indicatorText)}
            variant={indicatorTextVariant}
          >
            {labels.indicator}
          </HvTypography>
        )}
        {labels.unit && (
          <HvTypography
            className={classes.indicatorUnit}
            variant={indicatorUnitTextVariant}
          >
            {labels.unit}
          </HvTypography>
        )}
      </div>
      {visualComparison && (
        <div className={classes.comparisonComposition}>
          {trendIndicator && (
            <div className={cx(classes.trendLine, classes.spacingToTheRight)}>
              {trendIndicator}
            </div>
          )}
          <div>
            <div className={classes.comparisonContainer}>
              <InternalVisualComparison
                className={cx(classes.comparisons, classes.spacingToTheRight)}
                variant="label"
              >
                {visualComparison}
              </InternalVisualComparison>
            </div>
            <div className={classes.comparisonContainer}>
              <HvTypography className={classes.comparisons} variant="caption2">
                {labels.comparisonIndicatorInfo}
              </HvTypography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
