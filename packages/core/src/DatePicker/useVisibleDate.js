import { useEffect, useState } from "react";

import { calculateConstrainedDates, validateDate } from "./utils";

export default function useVisibleDate(defaultDate) {
  const [visibleDate, setVisibleDate] = useState(validateDate(defaultDate));
  const [visibleMonth, setVisibleMonth] = useState(visibleDate?.getMonth() + 1);
  const [visibleYear, setVisibleYear] = useState(visibleDate?.getFullYear());

  const [rightVisibleMonth, setRightVisibleMonth] = useState(visibleDate?.getMonth() + 2);
  const [rightVisibleYear, setRightVisibleYear] = useState(visibleDate?.getFullYear());
  const [visibleDateUpdated, setVisibleDateUpdated] = useState(false);

  useEffect(() => {
    if (!visibleDateUpdated) return;
    const {
      updatedVisibleMonth,
      updatedVisibleYear,
      updatedRightVisibleMonth,
      updatedRightVisibleYear,
    } = calculateConstrainedDates(
      visibleDate?.getMonth(),
      visibleDate?.getFullYear(),
      rightVisibleMonth,
      rightVisibleYear,
      "left",
      "month",
      visibleDate?.getMonth() + 1
    );
    setVisibleMonth(updatedVisibleMonth);
    setVisibleYear(updatedVisibleYear);
    setRightVisibleMonth(updatedRightVisibleMonth);
    setRightVisibleYear(updatedRightVisibleYear);
    setVisibleDateUpdated(false);
  }, [
    visibleDate,
    visibleMonth,
    visibleYear,
    rightVisibleMonth,
    rightVisibleYear,
    visibleDateUpdated,
  ]);

  useEffect(() => {
    setVisibleDateUpdated(true);
  }, [visibleDate]);

  const handleVisibleDateChange = (event, action, index, direction) => {
    const {
      updatedVisibleMonth,
      updatedVisibleYear,
      updatedRightVisibleMonth,
      updatedRightVisibleYear,
    } = calculateConstrainedDates(
      visibleMonth,
      visibleYear,
      rightVisibleMonth,
      rightVisibleYear,
      direction,
      action,
      index
    );

    setVisibleMonth(updatedVisibleMonth);
    setVisibleYear(updatedVisibleYear);
    setRightVisibleMonth(updatedRightVisibleMonth);
    setRightVisibleYear(updatedRightVisibleYear);
  };

  return [
    { visibleMonth, visibleYear, rightVisibleMonth, rightVisibleYear },
    setVisibleDate,
    handleVisibleDateChange,
    setRightVisibleMonth,
  ];
}
