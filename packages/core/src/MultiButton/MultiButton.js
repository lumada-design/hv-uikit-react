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

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import { map, filter } from "lodash";
import HvButton from "../Button";

import styles from "./styles";

class MultiButton extends React.Component {
  constructor(props) {
    super(props);

    const { buttons } = this.props;

    /**
     * parse button properties and if any buttons are preset as selected
     * set the state with their ids
     * */
    const initialCompState = filter(
      map(buttons, item => (item.selected !== undefined ? item.id : null)),
      item => item !== null
    );
    /**
     * set state; if button properties are mismatched set hasError prop
     * in order to throw error in component and alert for the need to correctly
     * set the button props
     */
    this.state = {
      checkedItems: initialCompState
    };
  }

  handleClick(e, idx) {
    const { checkedItems } = this.state;
    const { onChange, multi, minSelection, maxSelection, buttons } = this.props;

    let newState;

    const clickedBtnDefs = buttons[idx];
    const btnClickable =
      clickedBtnDefs.enforced !== undefined ? clickedBtnDefs : false;

    const clickedBtnId = buttons[idx].id;
    const clickedBtnPositionInState = checkedItems.indexOf(clickedBtnId);

    if (btnClickable) {
      return;
    }

    if (
      checkedItems.length === minSelection &&
      checkedItems.indexOf(clickedBtnId) !== -1
    ) {
      return;
    }

    if (
      checkedItems.length === maxSelection &&
      checkedItems.indexOf(clickedBtnId) === -1
    ) {
      return;
    }

    if (multi) {
      // check if item has not been clicked
      if (clickedBtnPositionInState === -1) {
        // handle state change
        newState = [...checkedItems, buttons[idx].id];
      } else {
        const itemToRemove = clickedBtnPositionInState;
        newState = checkedItems.filter((_, i) => i !== itemToRemove);
      }
    } else if (clickedBtnPositionInState === -1) {
      // handle state change
      // this enforces that the change happens only when we click on
      // a deselected element mimicking the behavior of the button component
      newState = [clickedBtnId];
    } else {
      return;
    }

    this.setState({
      checkedItems: newState
    });
    onChange(newState);
  }

  render() {
    const {
      className,
      classes,
      vertical,
      type,
      buttons,
      ...other
    } = this.props;

    /**
     * Generate button content elements to render the component itself
     */

    const generateBtnContents = (btnType, button) => {
      let btnStruct;
      if (btnType === "icon") {
        btnStruct = <>{button.icon}</>;
      } else if (btnType === "text") {
        btnStruct = (
          <>
            <div className={classes.labelText}>{button.value}</div>
          </>
        );
      } else {
        btnStruct = (
          <>
            {button.icon}
            <div
              className={classNames(classes.labelText, classes.labelPadding)}
            >
              {button.value}
            </div>
          </>
        );
      }

      return btnStruct;
    };

    const buttonList = buttons.map((button, idx) => {
      const { checkedItems } = this.state;
      return (
        <HvButton
          key={`btnkey_${idx + 1}`}
          id={button.id}
          onClick={e => this.handleClick(e, idx)}
          aria-pressed={checkedItems.indexOf(button.id) !== -1}
          className={classNames(
            classes.btnBase,
            classes.btnSecondary,
            {
              [classes.iconWidth]: type === "icon",
              [classes.isSelected]: checkedItems.indexOf(button.id) !== -1,
              [classes.isUnselected]: !(checkedItems.indexOf(button.id) !== -1)
            },
            className
          )}
          category={button.selected ? "secondary" : "ghost"}
          {...button.buttonProps}
        >
          {generateBtnContents(type, button)}
        </HvButton>
      );
    });

    return (
      <div
        className={classNames(classes.root, {
          [classes.rootVertical]: vertical
        })}
        {...other}
      >
        {buttonList}
      </div>
    );
  }
}

MultiButton.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the multibutton root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * If the multibutton is to be displayed vertically.
   */
  vertical: PropTypes.bool,
  /**
   * If the multibutton is multi selectable.
   */
  multi: PropTypes.bool,
  /**
   * Type of button display.
   *  - Accepted values:
   *    --"label": displays just a text label,
   *    --"icon": displays just an icon,
   *    --"mixed": displays both a label and an icon
   */
  type: PropTypes.oneOf(["text", "icon", "mixed"]).isRequired,
  /**
   * Buttons definitions
   */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * the button id.
       */
      id: PropTypes.string.isRequired,
      /**
       * the button label.
       */
      value: PropTypes.string,
      /**
       * icon in button.
       */
      icon: PropTypes.node,
      /**
       * If the button is selected.
       */
      selected: PropTypes.bool,
      /**
       * Specify if item can be toggled or not.
       */
      enforced: PropTypes.bool,
      /**
       * Values to be passed onto the button.
       */
      buttonProps: PropTypes.object
    })
  ).isRequired,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * Specify minimum number of selections in component
   */
  minSelection: PropTypes.number,
  /**
   * Specify maximum number of selections in component
   */
  maxSelection: PropTypes.number
};

MultiButton.defaultProps = {
  className: "",
  vertical: false,
  multi: false,
  onChange: () => {},
  minSelection: 0,
  maxSelection: null
};

export default withStyles(styles, { name: "HvMultiButton" })(MultiButton);
