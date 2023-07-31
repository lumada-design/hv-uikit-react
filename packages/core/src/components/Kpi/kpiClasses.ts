import { getClasses } from "@core/utils/classes";

export interface HvKpiClasses {
  root?: string;
  visualIndicatorContainer?: string;
  comparisons?: string;
  comparisonContainer?: string;
  comparisonComposition?: string;
  indicatorsContainer?: string;
  indicatorText?: string;
  indicatorUnit?: string;
  spacingToTheRight?: string;
  trendLine?: string;
}

const classKeys: (keyof HvKpiClasses)[] = [
  "root",
  "visualIndicatorContainer",
  "comparisons",
  "comparisonContainer",
  "comparisonComposition",
  "indicatorsContainer",
  "indicatorText",
  "indicatorUnit",
  "spacingToTheRight",
  "trendLine",
];

const kpiClasses = getClasses(classKeys, "HvKpi");

export default kpiClasses;
