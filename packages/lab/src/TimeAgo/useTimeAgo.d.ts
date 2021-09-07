export type UseTimeAgoOptions = {
  /**
   * Whether to show seconds in the rendered time
   */
  showSeconds?: boolean;
  /**
   * The locale to be used. Should be on of the dayjs supported locales
   * @see https://day.js.org/docs/en/i18n/i18n
   */
  locale?: string;
  /**
   * Disables periodic date refreshes
   */
  disableRefresh?: boolean;
};

export default function useTimeAgo(
  /**
   * The timestamp to format, in seconds or milliseconds
   */
  timestamp: number,
  /**
   * Options to format the time
   */
  options?: UseTimeAgoOptions
): string;
