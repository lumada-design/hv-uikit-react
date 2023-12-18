import { forwardRef } from "react";

import isEmpty from "lodash/isEmpty";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";
import { HvTypography } from "@core/Typography";
import { PolymorphicComponentRef, PolymorphicRef } from "@core/types/generic";

import { staticClasses, useClasses } from "./TimeAgo.styles";
import useTimeAgo from "./useTimeAgo";

export { staticClasses as timeAgoClasses };

export type HvTimeAgoClasses = ExtractNames<typeof useClasses>;

export type HvTimeAgoProps<C extends React.ElementType = "p"> =
  PolymorphicComponentRef<
    C,
    {
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
       * The element to render when the timestamp is null or 0
       * Defaults to `—` (Em Dash)
       */
      emptyElement?: React.ReactNode;
      /** Disables periodic date refreshes */
      disableRefresh?: boolean;
      /** Whether to show seconds in the rendered time */
      showSeconds?: boolean;
      /**
       * Whether the component should render just the string
       * Consider using `useTimeAgo` instead
       */
      justText?: boolean;
      /** A Jss Object used to override or extend the styles applied to the component. */
      classes?: HvTimeAgoClasses;
    }
  >;

/**
 * The HvTimeAgo component implements the Design System relative time format guidelines.
 */
export const HvTimeAgo: <C extends React.ElementType = "p">(
  props: HvTimeAgoProps<C>
) => React.ReactElement | null = forwardRef(
  <C extends React.ElementType = "p">(
    props: HvTimeAgoProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      classes: classesProp,
      className,
      timestamp,
      locale: localeProp = "en",
      component: Component = HvTypography,
      emptyElement = "—",
      disableRefresh = false,
      showSeconds = false,
      justText = false,
      ...others
    } = useDefaultProps("HvTimeAgo", props);

    const { classes, cx } = useClasses(classesProp);
    const locale = isEmpty(localeProp) ? "en" : localeProp;
    const timeAgo = useTimeAgo(timestamp, {
      locale,
      disableRefresh,
      showSeconds,
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (justText && timestamp) return <>{timeAgo}</>;

    return (
      <Component ref={ref} className={cx(classes.root, className)} {...others}>
        {!timestamp ? emptyElement : timeAgo}
      </Component>
    );
  }
);
