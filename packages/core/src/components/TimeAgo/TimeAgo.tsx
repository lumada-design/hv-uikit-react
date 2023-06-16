import { HvTypography } from "@core/components";
import { HvBaseProps } from "@core/types";
import { clsx } from "clsx";
import isEmpty from "lodash/isEmpty";
import timeAgoClasses, { HvTimeAgoClasses } from "./timeAgoClasses";
import useTimeAgo from "./useTimeAgo";

export interface HvTimeAgoProps extends HvBaseProps<HTMLElement, "children"> {
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
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTimeAgoClasses;
}

/**
 * The HvTimeAgo component implements the Design System relative time format guidelines.
 */
export const HvTimeAgo = ({
  classes,
  timestamp,
  locale: localeProp = "en",
  component: Component = HvTypography,
  emptyElement = "—",
  disableRefresh = false,
  showSeconds = false,
  justText = false,
  ...others
}: HvTimeAgoProps) => {
  const locale = isEmpty(localeProp) ? "en" : localeProp;
  const timeAgo = useTimeAgo(timestamp, {
    locale,
    disableRefresh,
    showSeconds,
  });

  return justText && timestamp ? (
    <>timeAgo</>
  ) : (
    <Component className={clsx(classes?.root, timeAgoClasses.root)} {...others}>
      {!timestamp ? emptyElement : timeAgo}
    </Component>
  );
};
