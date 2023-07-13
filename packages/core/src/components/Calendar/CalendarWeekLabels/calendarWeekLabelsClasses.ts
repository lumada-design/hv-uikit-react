import { getClasses } from "@core/utils/classes";

export interface HvCalendarWeekLabelsClasses {
  calendarDay?: string;
}

const classKeys: (keyof HvCalendarWeekLabelsClasses)[] = ["calendarDay"];

const calendarWeekLabelsClasses = getClasses(classKeys, "HvCalendarWeekLabels");

export default calendarWeekLabelsClasses;
