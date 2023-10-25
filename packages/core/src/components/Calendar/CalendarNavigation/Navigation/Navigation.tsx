import {
  DropLeftXS as DropLeftIcon,
  DropRightXS as DropRightIcon,
} from "@hitachivantara/uikit-react-icons";

import { setId } from "@core/utils/setId";
import { HvButton } from "@core/components/Button";
import { HvBaseProps } from "@core/types/generic";

import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Navigation.styles";

export { staticClasses as navigationClasses };

export type HvNavigationClasses = ExtractNames<typeof useClasses>;

export const Navigation = ({
  id,
  classes: classesProp,
  onNavigatePrevious,
  onNavigateNext,
  onTextClick,
  navigationText = "n/a",
  isPreviousEnabled = true,
  isNextEnabled = true,
}: NavigationProps) => {
  const { classes, cx } = useClasses(classesProp);

  return (
    <div className={classes.root}>
      <HvButton
        icon
        disabled={!isPreviousEnabled}
        aria-label="Previous"
        id={setId(id, "left")}
        className={cx(classes.icon, {
          [classes.disabled]: !isPreviousEnabled,
        })}
        onClick={onNavigatePrevious}
      >
        <DropLeftIcon role="none" />
      </HvButton>

      <HvButton
        id={id}
        variant="secondaryGhost"
        onClick={onTextClick}
        component={onTextClick ? "button" : "div"}
        className={cx(classes.text, {
          [classes.textWithoutHover]: !onTextClick,
        })}
      >
        {navigationText}
      </HvButton>

      <HvButton
        icon
        disabled={!isNextEnabled}
        aria-label="Next"
        id={setId(id, "right")}
        className={cx(classes.icon, {
          [classes.disabled]: !isNextEnabled,
        })}
        onClick={onNavigateNext}
      >
        <DropRightIcon role="none" />
      </HvButton>
    </div>
  );
};

export interface NavigationProps extends HvBaseProps {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvNavigationClasses;
  /**
   * A function to be executed whenever the navigate previous action is triggered.
   */
  onNavigatePrevious: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * A function to be executed whenever the navigate next action is triggered.
   */
  onNavigateNext: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * A function to be executed whenever the text is clicked.
   */
  onTextClick?: () => void;
  /**
   * The text that will be shown between the navigation buttons.
   */
  navigationText?: string;
  /**
   * Flag stating if the previous button should be enabled or disabled.
   */
  isPreviousEnabled?: boolean;
  /**
   * Flag stating if the next button should be enabled or disabled.
   */
  isNextEnabled?: boolean;
}
