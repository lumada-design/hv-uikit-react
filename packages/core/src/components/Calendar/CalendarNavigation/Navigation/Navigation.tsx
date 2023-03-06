import clsx from "clsx";
import { isKeypress, keyboardCodes, setId } from "utils";
import { HvTypography } from "components";
import { HvBaseProps } from "../../../../types";
import {
  StyledDropLeftIcon,
  StyledDropRightIcon,
  StyledRoot,
  StyledText,
} from "./Navigation.styles";
import navigationClasses, { HvNavigationClasses } from "./navigationClasses";

export const Navigation = ({
  id,
  classes,
  onNavigatePrevious,
  onNavigateNext,
  onTextClick,
  navigationText = "n/a",
  isPreviousEnabled = true,
  isNextEnabled = true,
}: NavigationProps) => {
  const onkeyDownHandler = (event, funcAction) => {
    if (
      isKeypress(event, keyboardCodes.Enter) ||
      isKeypress(event, keyboardCodes.Space)
    ) {
      event.preventDefault();
      funcAction(event);
    }
  };

  const onTextClickIsFunction = typeof onTextClick === "function";

  return (
    <StyledRoot className={clsx(navigationClasses.root, classes?.root)}>
      <StyledDropLeftIcon
        id={setId(id, "left")}
        className={clsx(
          navigationClasses.icon,
          classes?.icon,
          !isPreviousEnabled &&
            clsx(navigationClasses.disabled, classes?.disabled)
        )}
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

      <StyledText
        id={id}
        className={clsx(
          onTextClickIsFunction && clsx(navigationClasses.text, classes?.text),
          !onTextClickIsFunction &&
            clsx(navigationClasses.textWithoutHover, classes?.textWithoutHover)
        )}
        role="presentation"
        onClick={onTextClick}
        onKeyDown={
          onTextClick && ((event) => onkeyDownHandler(event, onTextClick))
        }
        tabIndex={onTextClick ? 0 : -1}
      >
        <HvTypography variant="normalText">{navigationText}</HvTypography>
      </StyledText>

      <StyledDropRightIcon
        id={setId(id, "right")}
        className={`${clsx(navigationClasses.icon, classes?.icon)} ${
          isNextEnabled
            ? ""
            : clsx(navigationClasses.disabled, classes?.disabled)
        }`}
        onClick={isNextEnabled ? (event) => onNavigateNext(event) : undefined}
        onKeyDown={(event) =>
          isNextEnabled ? onkeyDownHandler(event, onNavigateNext) : undefined
        }
        tabIndex={0}
      />
    </StyledRoot>
  );
};

export type NavigationProps = HvBaseProps & {
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
  onNavigatePrevious: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * A function to be executed whenever the navigate next action is triggered.
   */
  onNavigateNext: (event: React.MouseEvent<HTMLDivElement>) => void;
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
};
