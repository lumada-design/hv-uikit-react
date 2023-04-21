import { getClasses } from "@core/utils";

export interface HvCalendarWeekLabelsClasses {
  calendarDay?: string;
}

const classKeys: string[] = ["calendarDay"];

const calendarWeekLabelsClasses = getClasses<HvCalendarWeekLabelsClasses>(
  classKeys,
  "HvCalendarWeekLabels"
);

export default calendarWeekLabelsClasses;
