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
