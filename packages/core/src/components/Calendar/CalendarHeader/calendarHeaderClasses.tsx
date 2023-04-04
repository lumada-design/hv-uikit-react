import { getClasses } from "~/utils";

export type HvCalendarHeaderClasses = {
  root?: string;
  invalid?: string;
  headerDayOfWeek?: string;
  headerDate?: string;
  input?: string;
  inputBorderContainer?: string;
  invalidMessageStyling?: string;
};

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
