import { getClasses } from "@core/utils";

export interface HvProgressBarClasses {
  root?: string;
  progress?: string;
  progressBar?: string;
  progressBarLabel?: string;
  progressContainer?: string;
  progressDone?: string;
  progressBarContainer?: string;
  progressError?: string;
}

const classKeys: (keyof HvProgressBarClasses)[] = [
  "root",
  "progress",
  "progressBar",
  "progressBarLabel",
  "progressContainer",
  "progressDone",
  "progressBarContainer",
  "progressError",
];

const progressBarClasses = getClasses(classKeys, "HvProgressBar");

export default progressBarClasses;
