import { clsx } from "clsx";
import { StyledCalendarDay } from "./CalendarWeekLabels.styles";
import calendarWeekLabelsClasses, {
  HvCalendarWeekLabelsClasses,
} from "./calendarWeekLabelsClasses";

export const HvCalendarWeekLabel = ({
  classes,
  labels = [],
}: HvCalendarWeekLabelProps) => {
  return (
    <>
      {" "}
      {labels.map((dayName, index) => {
        const key = `${dayName}-${index}`;
        return (
          <StyledCalendarDay
            variant="label"
            className={clsx(
              calendarWeekLabelsClasses.calendarDay,
              classes?.calendarDay
            )}
            key={key}
          >
            {dayName}
          </StyledCalendarDay>
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
