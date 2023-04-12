import { getClasses } from "~/utils";

export type HvProgressBarClasses = {
  root?: string;
  progress?: string;
  progressBar?: string;
  progressBarLabel?: string;
  progressContainer?: string;
  progressDone?: string;
  progressBarContainer?: string;
  progressError?: string;
};

const classKeys: string[] = [
  "root",
  "progress",
  "progressBar",
  "progressBarLabel",
  "progressContainer",
  "progressDone",
  "progressBarContainer",
  "progressError",
];

const progressBarClasses = getClasses<HvProgressBarClasses>(
  classKeys,
  "HvProgressBar"
);

export default progressBarClasses;
