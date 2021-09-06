export type UseTimeAgoOptions = {
  /**
   * Whether to show seconds in the rendered time
   */
  showSeconds: boolean;
};

export default function useTimeAgo(
  /**
   * The timestamp to format, in seconds or milliseconds
   */
  timestamp: number,
  /**
   * Options to format the time
   */
  options: UseTimeAgoOptions
): string;
