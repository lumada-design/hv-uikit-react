import { getClasses } from "@core/utils";

export interface HvSliderClasses {
  root?: string;
  rootRange?: string;
  labelContainer?: string;
  label?: string;
  handle?: string;
  handleContainer?: string;
  sliderBase?: string;
  sliderRoot?: string;
  trackDragging?: string;
  rootDisabled?: string;
  trackStandBy?: string;
  error?: string;
  handleHiddenContainer?: string;
  handleContainerDisabled?: string;
  labelIncluded?: string;
  onlyInput?: string;
  sliderTooltip?: string;
  sliderContainer?: string;
}

const classKeys: string[] = [
  "root",
  "rootRange",
  "labelContainer",
  "label",
  "handle",
  "handleContainer",
  "sliderBase",
  "sliderRoot",
  "trackDragging",
  "rootDisabled",
  "trackStandBy",
  "error",
  "handleHiddenContainer",
  "handleContainerDisabled",
  "labelIncluded",
  "onlyInput",
  "sliderTooltip",
  "sliderContainer",
];

const sliderClasses = getClasses<HvSliderClasses>(classKeys, "HvSlider");

export default sliderClasses;
