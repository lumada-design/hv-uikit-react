import { getClasses } from "@hitachivantara/uikit-react-core";

export interface HvLineChartClasses {
  tooltipRoot?: string;
  tooltipTitleRoot?: string;
  tooltipTitle?: string;
  tooltipContentRoot?: string;
  tooltipSeriesRoot?: string;
  tooltipSeriesNameRoot?: string;
  tooltipSeriesNameColor?: string;
  tooltipSeriesName?: string;
  tooltipSeriesValue?: string;
}

const classKeys: (keyof HvLineChartClasses)[] = [
  "tooltipRoot",
  "tooltipTitleRoot",
  "tooltipTitle",
  "tooltipContentRoot",
  "tooltipSeriesRoot",
  "tooltipSeriesNameRoot",
  "tooltipSeriesNameColor",
  "tooltipSeriesName",
  "tooltipSeriesValue",
];

const lineChartClasses = getClasses(classKeys, "HvLineChart");

export default lineChartClasses;
