import clsx from "clsx";
import { useLabels } from "hooks";
import { HvTypography } from "../../components";
import { HvBaseProps } from "../../types";
import {
  StyledComparisonComposition,
  StyledComparisonContainer,
  StyledIndicatorsContainer,
  StyledIndicatorText,
  StyledIndicatorUnit,
  StyledInternalVisualComparisonDiv,
  StyledInternalVisualComparisonTypography,
  StyledRoot,
  StyledTrendIndicator,
  StyledVisualIndicator,
} from "./Kpi.styles";
import kpiClasses, { HvKpiClasses } from "./kpiClasses";

export type HvKpiLabelProps = {
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
};

export type HvKpiProps = HvBaseProps<HTMLDivElement, { children }> & {
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
};

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
export const HvKpi = ({
  trendIndicator = null,
  visualIndicator = null,
  visualComparison = null,
  indicatorUnitTextVariant = "title2",
  indicatorTextVariant = "title1",
  labels,
  classes,
  className,
  ...others
}: HvKpiProps) => {
  const mergedLabels = useLabels(DEFAULT_LABELS, labels);

  const InternalVisualComparison =
    typeof visualComparison === "string"
      ? StyledInternalVisualComparisonTypography
      : StyledInternalVisualComparisonDiv;

  return (
    <StyledRoot
      className={clsx(classes?.root, className, kpiClasses.root)}
      {...others}
    >
      <div>
        <HvTypography variant="label">{mergedLabels?.title}</HvTypography>
      </div>
      <StyledIndicatorsContainer
        className={clsx(
          kpiClasses.indicatorsContainer,
          classes?.indicatorsContainer
        )}
      >
        {visualIndicator && (
          <StyledVisualIndicator
            className={clsx(
              kpiClasses.visualIndicatorContainer,
              kpiClasses.spacingToTheRight,
              classes?.visualIndicatorContainer,
              classes?.spacingToTheRight
            )}
          >
            {visualIndicator}
          </StyledVisualIndicator>
        )}
        {mergedLabels?.indicator && (
          <StyledIndicatorText
            className={clsx(
              kpiClasses.spacingToTheRight,
              kpiClasses.indicatorText,
              classes?.spacingToTheRight,
              classes?.indicatorText
            )}
            variant={indicatorTextVariant}
          >
            {mergedLabels.indicator}
          </StyledIndicatorText>
        )}
        {mergedLabels?.unit && (
          <StyledIndicatorUnit
            className={clsx(kpiClasses.indicatorUnit, classes?.indicatorUnit)}
            variant={indicatorUnitTextVariant}
          >
            {mergedLabels.unit}
          </StyledIndicatorUnit>
        )}
      </StyledIndicatorsContainer>
      {visualComparison && (
        <StyledComparisonComposition
          className={clsx(
            kpiClasses.comparisonComposition,
            classes?.comparisonComposition
          )}
        >
          {trendIndicator && (
            <StyledTrendIndicator
              className={clsx(
                kpiClasses.trendLine,
                kpiClasses.spacingToTheRight,
                classes?.trendLine,
                classes?.spacingToTheRight
              )}
            >
              {trendIndicator}
            </StyledTrendIndicator>
          )}
          <div>
            <StyledComparisonContainer
              className={clsx(
                kpiClasses.comparisonContainer,
                classes?.comparisonContainer
              )}
            >
              <InternalVisualComparison
                className={clsx(
                  kpiClasses.comparisons,
                  kpiClasses.spacingToTheRight,
                  classes?.comparisons,
                  classes?.spacingToTheRight
                )}
                variant="label"
              >
                {visualComparison}
              </InternalVisualComparison>
            </StyledComparisonContainer>
            <StyledComparisonContainer
              className={clsx(
                kpiClasses.comparisonContainer,
                classes?.comparisonContainer
              )}
            >
              <HvTypography
                className={clsx(kpiClasses.comparisons, classes?.comparisons)}
                variant="caption2"
              >
                {mergedLabels?.comparisonIndicatorInfo}
              </HvTypography>
            </StyledComparisonContainer>
          </div>
        </StyledComparisonComposition>
      )}
    </StyledRoot>
  );
};
