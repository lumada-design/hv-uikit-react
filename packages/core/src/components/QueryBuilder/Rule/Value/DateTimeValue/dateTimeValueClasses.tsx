import { getClasses } from "@core/utils";

export interface HvDateTimeValueClasses {
  root?: string;
  row?: string;
  vertical?: string;
  horizontal?: string;
  datePicker?: string;
  timePicker?: string;
}

const classKeys: (keyof HvDateTimeValueClasses)[] = [
  "datePicker",
  "horizontal",
  "root",
  "row",
  "timePicker",
  "vertical",
];

const dateTimeValueClasses = getClasses(classKeys, "HvDateTimeValue");

export default dateTimeValueClasses;
