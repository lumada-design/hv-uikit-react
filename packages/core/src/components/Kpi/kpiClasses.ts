import { getClasses } from "~/utils";

export type HvKpiClasses = {
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
};

const classKeys: string[] = [
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

const kpiClasses = getClasses<HvKpiClasses>(classKeys, "HvKpi");

export default kpiClasses;
