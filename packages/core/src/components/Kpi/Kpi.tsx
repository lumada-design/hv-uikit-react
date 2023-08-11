import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { useLabels } from "@core/hooks/useLabels";
import { HvBaseProps } from "@core/types/generic";
import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Kpi.styles";

export { staticClasses as kpiClasses };

export type HvKpiClasses = ExtractNames<typeof useClasses>;

export interface HvKpiLabelProps {
  /**
   * The text at the top of the kpi.
   */
  title?: string;
  /**
   * The text in the middle of the kpi.
   */
  indicator?: string;
  /**
   * The text to the right of the indicator.
   */
  unit?: string;
  /**
   * The text to the right of the visual comparison.
   */
  comparisonIndicatorInfo?: string;
}

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

const DEFAULT_LABELS = {
  title: "",
  indicator: undefined,
  unit: undefined,
  comparisonIndicatorInfo: undefined,
};

/**
 * Key Performance Indicator is a type of performance measurement. It monitors a business indicator
 * and its success/failure against a given target. KPIs are the first item read on a dashboard.
 * Communicates simple, immediate and vital information for operational decision making.
 */
export const HvKpi = (props: HvKpiProps) => {
  const {
    trendIndicator = null,
    visualIndicator = null,
    visualComparison = null,
    indicatorUnitTextVariant = "title2",
    indicatorTextVariant = "title1",
    labels,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvKpi", props);

  const { classes, cx } = useClasses(classesProp);

  const mergedLabels = useLabels(DEFAULT_LABELS, labels);

  const InternalVisualComparison =
    typeof visualComparison === "string" ? HvTypography : "div";

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div>
        <HvTypography variant="label">{mergedLabels?.title}</HvTypography>
      </div>
      <div className={classes.indicatorsContainer}>
        {visualIndicator && (
          <div
            className={cx(
              classes.visualIndicatorContainer,
              classes.spacingToTheRight
            )}
          >
            {visualIndicator}
          </div>
        )}
        {mergedLabels?.indicator && (
          <HvTypography
            className={cx(classes.spacingToTheRight, classes.indicatorText)}
            variant={indicatorTextVariant}
          >
            {mergedLabels.indicator}
          </HvTypography>
        )}
        {mergedLabels?.unit && (
          <HvTypography
            className={classes.indicatorUnit}
            variant={indicatorUnitTextVariant}
          >
            {mergedLabels.unit}
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
                {mergedLabels?.comparisonIndicatorInfo}
              </HvTypography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
