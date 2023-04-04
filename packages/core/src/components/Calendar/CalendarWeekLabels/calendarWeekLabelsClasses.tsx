import { getClasses } from "~/utils";

export type HvCalendarWeekLabelsClasses = {
  calendarDay?: string;
};

const classKeys: string[] = ["calendarDay"];

const calendarWeekLabelsClasses = getClasses<HvCalendarWeekLabelsClasses>(
  classKeys,
  "HvCalendarWeekLabels"
);

export default calendarWeekLabelsClasses;
