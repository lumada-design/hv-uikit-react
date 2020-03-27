/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import DropLeftIcon from "@hv/uikit-react-icons/dist/Generic/DropLeftXS";
import DropRightIcon from "@hv/uikit-react-icons/dist/Generic/DropRightXS";
import HvTypography from "../../../Typography";

import styles from "./styles";

const Navigation = ({
  id,
  classes,
  onNavigatePrevious,
  onNavigateNext,
  onTextClick,
  navigationText,
  isPreviousEnabled,
  isNextEnabled
}) => {
  const onkeyDownHandler = (event, funcAction) => {
    if (
      isKeypress(event, KeyboardCodes.Enter) ||
      isKeypress(event, KeyboardCodes.Space)
    ) {
      event.preventDefault();
      funcAction(event);
    }
  };

  return (
    <div className={classes.root}>
      <DropLeftIcon
        id={`${id}-left`}
        className={`${classes.icon} ${
          isPreviousEnabled ? "" : classes.disabled
        }`}
        onClick={isPreviousEnabled ? onNavigatePrevious : undefined}
        onKeyDown={event =>
          isNextEnabled
            ? onkeyDownHandler(event, onNavigatePrevious)
            : undefined
        }
        tabIndex={0}
      />

      <div
        id={id}
        className={`${
          typeof onTextClick === "function"
            ? classes.text
            : classes.textWithoutHover
        }`}
        role="presentation"
        onClick={onTextClick}
        onKeyDown={
          onTextClick && (event => onkeyDownHandler(event, onTextClick))
        }
        tabIndex={onTextClick ? 0 : -1}
      >
        <HvTypography variant="normalText">{navigationText}</HvTypography>
      </div>

      <DropRightIcon
        id={`${id}-right`}
        className={`${classes.icon} ${isNextEnabled ? "" : classes.disabled}`}
        onClick={isNextEnabled ? onNavigateNext : undefined}
        onKeyDown={event =>
          isNextEnabled ? onkeyDownHandler(event, onNavigateNext) : undefined
        }
        tabIndex={0}
      />
    </div>
  );
};

Navigation.propTypes = {
  /**
   * Identifier.
   */
  id: PropTypes.string.isRequired,
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
  isNextEnabled: PropTypes.bool
};

Navigation.defaultProps = {
  onNavigatePrevious: undefined,
  onNavigateNext: undefined,
  onTextClick: undefined,
  navigationText: "n/a",
  isPreviousEnabled: true,
  isNextEnabled: true
};

export default withStyles(styles, { name: "HvDatePickerNavigation" })(
  Navigation
);
