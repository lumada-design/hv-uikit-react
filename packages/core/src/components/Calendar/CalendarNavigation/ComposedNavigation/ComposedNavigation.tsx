import { getMonthNamesList } from "../../utils";
import { NAV_OPTIONS, VIEW_MODE, REPRESENTATION_VALUES } from "../../enums";
import { setId } from "~/utils";
import { Navigation } from "../Navigation";
import clsx from "clsx";
import composedNavigationClasses, {
  HvComposedNavigationClasses,
} from "./composedNavigationClasses";
import {
  StyledNavigationContainer,
  StyledNavigationMonth,
} from "./ComposedNavigation.styles";
import { VisibilitySelectorActions } from "../../Calendar";

export const HvComposedNavigation = ({
  classes,
  id,
  locale,
  onChange,
  onViewModeChange,
  visibleYear,
  visibleMonth,
  ...others
}: HvComposedNavigationProps) => {
  const listMonthNamesLong = getMonthNamesList(
    locale,
    REPRESENTATION_VALUES.LONG
  );
  const monthName = listMonthNamesLong[visibleMonth - 1];

  return (
    <StyledNavigationContainer
      className={clsx(
        composedNavigationClasses.navigationContainer,
        classes?.navigationContainer
      )}
      {...others}
    >
      <StyledNavigationMonth
        className={clsx(
          composedNavigationClasses.navigationMonth,
          classes?.navigationMonth
        )}
      >
        <Navigation
          id={setId(id, "navigation-month")}
          navigationText={monthName}
          onNavigatePrevious={(event) => {
            onChange?.(event, NAV_OPTIONS.PREVIOUS_MONTH);
          }}
          onNavigateNext={(event) => {
            onChange?.(event, NAV_OPTIONS.NEXT_MONTH);
          }}
          onTextClick={() => {
            onViewModeChange(VIEW_MODE.MONTHLY);
          }}
          className={clsx(
            composedNavigationClasses.navigationMonth,
            classes?.navigationMonth
          )}
        />
      </StyledNavigationMonth>

      <Navigation
        id={setId(id, "navigation-year")}
        navigationText={visibleYear.toString()}
        onNavigatePrevious={(event) => {
          onChange?.(event, NAV_OPTIONS.PREVIOUS_YEAR);
        }}
        onNavigateNext={(event) => {
          onChange?.(event, NAV_OPTIONS.NEXT_YEAR);
        }}
      />
    </StyledNavigationContainer>
  );
};

export type HvComposedNavigationProps = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvComposedNavigationClasses;
  /**
   * Identifier.
   */
  id?: string;
  /**
   * Locale to be used by the calendar.
   */
  locale?: string;
  /**
   * Callback to define the input date.
   */
  onChange?: (event, action: VisibilitySelectorActions) => void;
  /**
   * Callback to define the view mode.
   */
  onViewModeChange: (viewMode: string) => void;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: number;
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear: number;
};
