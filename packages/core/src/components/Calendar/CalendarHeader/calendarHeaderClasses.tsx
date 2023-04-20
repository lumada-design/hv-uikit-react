import { getClasses } from "@core/utils";

export interface HvCalendarHeaderClasses {
  root?: string;
  invalid?: string;
  headerDayOfWeek?: string;
  headerDate?: string;
  input?: string;
  inputBorderContainer?: string;
  invalidMessageStyling?: string;
}

const classKeys: string[] = [
  "root",
  "invalid",
  "headerDayOfWeek",
  "headerDate",
  "input",
  "inputBorderContainer",
  "invalidMessageStyling",
];

const calendarHeaderClasses = getClasses<HvCalendarHeaderClasses>(
  classKeys,
  "HvCalendarHeader"
);

export default calendarHeaderClasses;
