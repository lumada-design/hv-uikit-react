import {
  DropLeftXS as DropLeftIcon,
  DropRightXS as DropRightIcon,
} from "@hitachivantara/uikit-react-icons";

import { isKey } from "@core/utils/keyboardUtils";
import { setId } from "@core/utils/setId";
import { HvTypography } from "@core/components/Typography";
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

  const onkeyDownHandler = (event, funcAction) => {
    if (isKey(event, "Enter") || isKey(event, "Space")) {
      event.preventDefault();
      funcAction(event);
    }
  };

  const onTextClickIsFunction = typeof onTextClick === "function";

  return (
    <div className={classes.root}>
      <DropLeftIcon
        id={setId(id, "left")}
        className={cx(classes.icon, {
          [classes.disabled]: !isPreviousEnabled,
        })}
        onClick={
          isPreviousEnabled ? (event) => onNavigatePrevious(event) : undefined
        }
        onKeyDown={(event) =>
          isNextEnabled
            ? onkeyDownHandler(event, onNavigatePrevious)
            : undefined
        }
        tabIndex={0}
      />

      <div
        id={id}
        className={cx({
          [classes.text]: onTextClickIsFunction,
          [classes.textWithoutHover]: !onTextClickIsFunction,
        })}
        role="presentation"
        onClick={onTextClick}
        onKeyDown={
          onTextClick && ((event) => onkeyDownHandler(event, onTextClick))
        }
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={onTextClick ? 0 : -1}
      >
        <HvTypography variant="body">{navigationText}</HvTypography>
      </div>

      <DropRightIcon
        id={setId(id, "right")}
        className={cx(classes.icon, {
          [classes.disabled]: !isNextEnabled,
        })}
        onClick={isNextEnabled ? (event) => onNavigateNext(event) : undefined}
        onKeyDown={(event) =>
          isNextEnabled ? onkeyDownHandler(event, onNavigateNext) : undefined
        }
        tabIndex={0}
      />
    </div>
  );
};

export interface NavigationProps extends HvBaseProps {
  /**
   * Identifier.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvNavigationClasses;
  /**
   * A function to be executed whenever the navigate previous action is triggered.
   */
  onNavigatePrevious: (event: React.MouseEvent<any>) => void;
  /**
   * A function to be executed whenever the navigate next action is triggered.
   */
  onNavigateNext: (event: React.MouseEvent<any>) => void;
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
