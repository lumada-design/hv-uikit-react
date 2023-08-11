import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./CalendarWeekLabels.styles";

export { staticClasses as calendarWeekLabelsClasses };

export type HvCalendarWeekLabelsClasses = ExtractNames<typeof useClasses>;

export const HvCalendarWeekLabel = ({
  classes: classesProp,
  labels = [],
}: HvCalendarWeekLabelProps) => {
  const { classes } = useClasses(classesProp);

  return (
    <>
      {" "}
      {labels.map((dayName, index) => {
        const key = `${dayName}-${index}`;
        return (
          <HvTypography
            variant="label"
            className={classes.calendarDay}
            key={key}
          >
            {dayName}
          </HvTypography>
        );
      })}{" "}
    </>
  );
};

export type HvCalendarWeekLabelProps = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvCalendarWeekLabelsClasses;
  /**
   * Localized day of week labels.
   */
  labels?: string[];
};
