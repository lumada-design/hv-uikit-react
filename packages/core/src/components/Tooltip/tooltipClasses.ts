import { getClasses } from "utils";

export type HvTooltipClasses = {
  /** Styles applied to the tooltip root class. */
  root?: string;
  /** Styles applied to the tooltip class when it is single. */
  tooltip?: string;
  /** Styles applied to the tooltip class when it is multi. */
  tooltipMulti?: string;
  /** Styles applied to the popper component. */
  popper?: string;
  /** Styles applied to the title. */
  title?: string;
  /** Styles applied to the values container. */
  valuesContainer?: string;
  /** Styles applied to the values. */
  values?: string;
  /** Styles applied to the color. */
  color?: string;
  /** Styles applied to the separator between color and title. */
  separatorColor?: string;
  /** Styles applied to the separator. */
  separator?: string;
  /** Styles applied to the values wrapper. */
  valueWrapper?: string;
};

const classKeys: string[] = [
  "root",
  "tooltip",
  "tooltipMulti",
  "popper",
  "title",
  "valuesContainer",
  "values",
  "color",
  "separatorColor",
  "separator",
  "valueWrapper",
];

const tooltipClasses = getClasses<HvTooltipClasses>(classKeys, "HvTooltip");

export default tooltipClasses;
