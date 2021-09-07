import { StandardProps } from "@material-ui/core";

export type HvTimeAgoClassKey = "root";

export interface HvTimeAgoProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, HvTimeAgoClassKey> {
  /**
   * The timestamp to format, in seconds or milliseconds.
   * Defaults to `emptyElement` if value is null or 0
   */
  timestamp?: number;
  /**
   * The locale to be used. Should be on of the dayjs supported locales and explicitly imported
   * @see https://day.js.org/docs/en/i18n/i18n
   */
  locale?: string;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `HvTypography`.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * The element to render when the timestamp is null or 0
   * Defaults to `—` (Em Dash)
   */
  emptyElement?: React.ReactNode;
  /**
   * Disables periodic date refreshes
   */
  disableRefresh?: boolean;
  /**
   * Whether to show seconds in the rendered time
   */
  showSeconds?: boolean;
  /**
   * Whether the component should render just the string
   * Consider using `useTimeAgo` instead
   */
  justText?: boolean;
}

export default function HvTimeAgo(props: HvTimeAgoProps): JSX.Element | null;
