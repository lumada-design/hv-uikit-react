import { useEffect, useState } from "react";

import { formatTimeAgo } from "./formatUtils";
import type { HvTimeAgoProps } from "./TimeAgo";
import { useTimeout } from "./useTimeout";

/**
 * Calls `formatTimeAgo` with timestamp conversion
 */
const fmt = (timestamp: any, locale: any, showSeconds?: boolean) => {
  const timestampMs =
    String(timestamp).length > 11 ? timestamp : timestamp * 1000;
  return formatTimeAgo(timestampMs, locale, showSeconds);
};

export default function useTimeAgo(
  timestamp = Date.now(),
  options?: Pick<HvTimeAgoProps, "locale" | "disableRefresh" | "showSeconds">,
) {
  const { locale, disableRefresh = false, showSeconds = false } = options || {};
  const [timeAgo, setTimeAgo] = useState(() =>
    fmt(timestamp, locale, showSeconds),
  );
  const refreshTime = disableRefresh ? 0 : 10_000;

  useEffect(() => {
    const newTimeAgo = fmt(timestamp, locale, showSeconds);
    setTimeAgo(newTimeAgo);
  }, [timestamp, locale, showSeconds]);

  useTimeout(() => {
    const newTimeAgo = fmt(timestamp, locale, showSeconds);
    setTimeAgo(newTimeAgo);
  }, refreshTime);

  return timeAgo;
}
