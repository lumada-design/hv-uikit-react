/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import {
  DropLeftXS as DropLeftIcon,
  DropRightXS as DropRightIcon,
} from "@hitachivantara/uikit-react-icons";
import { isKeypress, KeyboardCodes, setId } from "../../../utils";
import HvTypography from "../../../Typography";
import styles from "./styles";

const Navigation = ({
  id,
  classes,
  onNavigatePrevious,
  onNavigateNext,
  onTextClick,
  navigationText = "n/a",
  isPreviousEnabled = true,
  isNextEnabled = true,
}) => {
  const onkeyDownHandler = (event, funcAction) => {
    if (isKeypress(event, KeyboardCodes.Enter) || isKeypress(event, KeyboardCodes.Space)) {
      event.preventDefault();
      funcAction(event);
    }
  };

  const onTextClickIsFunction = typeof onTextClick === "function";

  return (
    <div className={classes.root}>
      <DropLeftIcon
        id={setId(id, "left")}
        className={clsx(classes.icon, {
          [classes.disabled]: !isPreviousEnabled,
        })}
        onClick={isPreviousEnabled ? (event) => onNavigatePrevious(event) : undefined}
        onKeyDown={(event) =>
          isNextEnabled ? onkeyDownHandler(event, onNavigatePrevious) : undefined
        }
        tabIndex={0}
      />

      <div
        id={id}
        className={clsx({
          [classes.text]: onTextClickIsFunction,
          [classes.textWithoutHover]: !onTextClickIsFunction,
        })}
        role="presentation"
        onClick={onTextClick}
        onKeyDown={onTextClick && ((event) => onkeyDownHandler(event, onTextClick))}
        tabIndex={onTextClick ? 0 : -1}
      >
        <HvTypography variant="normalText">{navigationText}</HvTypography>
      </div>

      <DropRightIcon
        id={setId(id, "right")}
        className={`${classes.icon} ${isNextEnabled ? "" : classes.disabled}`}
        onClick={isNextEnabled ? (event) => onNavigateNext(event) : undefined}
        onKeyDown={(event) => (isNextEnabled ? onkeyDownHandler(event, onNavigateNext) : undefined)}
        tabIndex={0}
      />
    </div>
  );
};

Navigation.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * A function to be executed whenever the navigate previous action is triggered.
   */
  onNavigatePrevious: PropTypes.func,
  /**
   * A function to be executed whenever the navigate next action is triggered.
   */
  onNavigateNext: PropTypes.func,
  /**
   * A function to be executed whenever the text is clicked.
   */
  onTextClick: PropTypes.func,
  /**
   * The text that will be shown between the navigation buttons.
   */
  navigationText: PropTypes.string,
  /**
   * Flag stating if the previous button should be enabled or disabled.
   */
  isPreviousEnabled: PropTypes.bool,
  /**
   * Flag stating if the next button should be enabled or disabled.
   */
  isNextEnabled: PropTypes.bool,
};

export default withStyles(styles, { name: "HvCalendarNavigation" })(Navigation);
