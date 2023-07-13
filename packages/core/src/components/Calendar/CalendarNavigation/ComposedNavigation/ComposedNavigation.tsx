import { setId } from "@core/utils/setId";

import { clsx } from "clsx";

import { getMonthNamesList } from "../../utils";
import { ViewMode } from "../../enums";
import { Navigation } from "../Navigation";
import composedNavigationClasses, {
  HvComposedNavigationClasses,
} from "./composedNavigationClasses";
import {
  StyledNavigationContainer,
  StyledNavigationMonth,
} from "./ComposedNavigation.styles";
import { VisibilitySelectorActions } from "../../types";

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
  const listMonthNamesLong = getMonthNamesList(locale, "long");
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
            onChange?.(event, "previous_month");
          }}
          onNavigateNext={(event) => {
            onChange?.(event, "next_month");
          }}
          onTextClick={() => {
            onViewModeChange("monthly");
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
          onChange?.(event, "previous_year");
        }}
        onNavigateNext={(event) => {
          onChange?.(event, "next_year");
        }}
      />
    </StyledNavigationContainer>
  );
};

export interface HvComposedNavigationProps {
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
  onViewModeChange: (viewMode: ViewMode) => void;
  /**
   * Controls the visible month of the Calendar
   */
  visibleMonth: number;
  /**
   * Controls the visible month of the Calendar
   */
  visibleYear: number;
}
