import { useEffect, useState } from "react";
import { NAV_OPTIONS } from "./enums";
import { validateDate } from "../DatePicker/utils";

export default function useVisibleDate(defaultDate) {
  const [visibleDate, setVisibleDate] = useState(validateDate(defaultDate));
  const [visibleMonth, setVisibleMonth] = useState(visibleDate?.getMonth() + 1);
  const [visibleYear, setVisibleYear] = useState(visibleDate?.getFullYear());

  useEffect(() => {
    setVisibleMonth(visibleDate?.getMonth() + 1);
    setVisibleYear(visibleDate?.getFullYear());
  }, [visibleDate]);

  const handleVisibleDateChange = (event, action, index) => {
    switch (action) {
      case NAV_OPTIONS.PREVIOUS_MONTH: {
        const previousMonth = visibleMonth - 1;
        if (previousMonth < 1) {
          setVisibleMonth(12);
          setVisibleYear(visibleYear - 1);
        } else {
          setVisibleMonth(previousMonth);
        }
        break;
      }
      case NAV_OPTIONS.NEXT_MONTH: {
        const nextMonth = visibleMonth + 1;
        if (nextMonth > 12) {
          setVisibleMonth(1);
          setVisibleYear(visibleYear + 1);
        } else {
          setVisibleMonth(nextMonth);
        }
        break;
      }
      case NAV_OPTIONS.PREVIOUS_YEAR:
        setVisibleYear(visibleYear - 1);
        break;
      case NAV_OPTIONS.NEXT_YEAR:
        setVisibleYear(visibleYear + 1);
        break;
      case NAV_OPTIONS.MONTH:
        setVisibleMonth(index);
        break;
      default:
        break;
    }
  };

  return [{ visibleMonth, visibleYear }, setVisibleDate, handleVisibleDateChange];
}
