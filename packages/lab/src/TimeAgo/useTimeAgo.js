import { useEffect, useState } from "react";
import useTimeout from "./useTimeout";
import { formatTimeAgo } from "./formatUtils";

/**
 * Calls `formatTimeAgo` with timestamp conversion
 */
const fmt = (timestamp, showSeconds) => {
  const timestampMs = String(timestamp).length > 11 ? timestamp : timestamp * 1000;
  return formatTimeAgo(new Date(timestampMs), showSeconds);
};

export default function useTimeAgo(timestamp, { showSeconds = false }) {
  const [timeAgo, setTimeAgo] = useState(fmt(timestamp, showSeconds));

  useEffect(() => {
    const newTimeAgo = fmt(timestamp, showSeconds);
    setTimeAgo(newTimeAgo);
  }, [timestamp, showSeconds]);

  useTimeout(() => {
    const newTimeAgo = fmt(timestamp, showSeconds);
    setTimeAgo(newTimeAgo);
  }, timeAgo.delay * 1000);

  return timeAgo.timeAgo;
}
