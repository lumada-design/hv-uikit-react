const isDateInPeriod = (
  timeAgoMs: number,
  period: "tomorrow" | "afterTomorrow",
  referenceDate = new Date(),
) => {
  const date = new Date(timeAgoMs);

  const startOfToday = new Date(referenceDate);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);
  const startOfDayAfterTomorrow = new Date(startOfTomorrow);
  startOfDayAfterTomorrow.setDate(startOfTomorrow.getDate() + 1);

  if (period === "tomorrow") {
    return date >= startOfTomorrow && date < startOfDayAfterTomorrow;
  }
  if (period === "afterTomorrow") {
    return date >= startOfDayAfterTomorrow;
  }
  return false;
};

/**
 * Relative time thresholds defined by
 * {@link https://xd.adobe.com/view/1b7df235-5cf8-4b51-a2f0-0be1bb591c55-4e2e/ Design System}
 */
export const formatTimeAgo = (
  timeAgoMs: number,
  locale: Intl.LocalesArgument,
  showSeconds = false,
  referenceDate = new Date(),
) => {
  const relFormatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const dayFormatter = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    second: showSeconds ? "numeric" : undefined,
  });
  const weekFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: showSeconds ? "numeric" : undefined,
  });
  const fullFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: showSeconds ? "numeric" : undefined,
  });
  const date = new Date(timeAgoMs);
  const secsInDay =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const secsInWeek = date.getDay() * 86400 + secsInDay;

  const secsAgo = Math.floor((referenceDate.getTime() - timeAgoMs) / 1000);
  const minsAgo = Math.floor(secsAgo / 60);

  switch (true) {
    case isDateInPeriod(timeAgoMs, "afterTomorrow", referenceDate):
      return fullFormatter.format(date);
    case isDateInPeriod(timeAgoMs, "tomorrow", referenceDate):
      return `${relFormatter.format(1, "days")}, ${dayFormatter.format(date)}`;
    case minsAgo < -60: // Future date more than 1 hour ahead
      return `${relFormatter.format(0, "days")}, ${dayFormatter.format(date)}`;
    case minsAgo < -2: // Future date more than 2 minutes ahead
      return relFormatter.format(-minsAgo, "minutes");
    case secsAgo < 0: // Future date within 1 minute
      return `${relFormatter.format(Math.abs(secsAgo), "seconds")}`;
    case secsAgo < 20:
      return relFormatter.format(0, "seconds");
    case minsAgo < 2:
      return relFormatter.format(-secsAgo, "seconds");
    case minsAgo < 60:
      return relFormatter.format(-minsAgo, "minutes");
    case secsAgo < secsInDay: // today
      return `${relFormatter.format(0, "days")}, ${dayFormatter.format(date)}`;
    case secsAgo < secsInDay + 86400: // yesterday
      return `${relFormatter.format(-1, "days")}, ${dayFormatter.format(date)}`;
    case secsAgo < secsInWeek: // this week
      return weekFormatter.format(date);
    default:
      return fullFormatter.format(date);
  }
};
