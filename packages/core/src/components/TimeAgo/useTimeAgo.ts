import { useEffect, useState } from "react";
import useTimeout from "./useTimeout";
import { formatTimeAgo } from "./formatUtils";

/**
 * Calls `formatTimeAgo` with timestamp conversion
 */
const fmt = (timestamp, locale, showSeconds) => {
  const timestampMs =
    String(timestamp).length > 11 ? timestamp : timestamp * 1000;
  return formatTimeAgo(new Date(timestampMs), locale, showSeconds);
};

export default function useTimeAgo(timestamp, options) {
  const { locale, disableRefresh = false, showSeconds = false } = options;
  const [timeAgo, setTimeAgo] = useState(fmt(timestamp, locale, showSeconds));
  const refreshTime = disableRefresh ? 0 : timeAgo.delay * 1000;

  useEffect(() => {
    const newTimeAgo = fmt(timestamp, locale, showSeconds);
    setTimeAgo(newTimeAgo);
  }, [timestamp, locale, showSeconds]);

  useTimeout(() => {
    const newTimeAgo = fmt(timestamp, locale, showSeconds);
    setTimeAgo(newTimeAgo);
  }, refreshTime);

  return timeAgo.timeAgo;
}
