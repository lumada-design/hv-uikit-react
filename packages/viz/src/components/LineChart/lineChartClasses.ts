import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvLineChartClasses {
  tooltipRoot?: string;
  tooltipTitleContainer?: string;
  tooltipTitle?: string;
  tooltipValuesContainer?: string;
  tooltipSeriesContainer?: string;
  tooltipSeriesNameContainer?: string;
  tooltipSeriesColor?: string;
  tooltipSeriesName?: string;
  tooltipSeriesValue?: string;
}

const classKeys: (keyof HvLineChartClasses)[] = [
  "tooltipRoot",
  "tooltipTitleContainer",
  "tooltipTitle",
  "tooltipValuesContainer",
  "tooltipSeriesContainer",
  "tooltipSeriesNameContainer",
  "tooltipSeriesColor",
  "tooltipSeriesName",
  "tooltipSeriesValue",
];

const lineChartClasses = getClasses(classKeys, "HvLineChart");

export default lineChartClasses;
