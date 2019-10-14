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
import classNames from "classnames";
import { map, filter } from "lodash";
import HvButton from "../Button";

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
      return ;
    }

    if (
      checkedItems.length === minSelection &&
      checkedItems.indexOf(clickedBtnId) !== -1
    ) {
      return ;
    }

    if (
      checkedItems.length === maxSelection &&
      checkedItems.indexOf(clickedBtnId) === -1
    ) {
      return ;
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
      return ;
    }

    this.setState({
      checkedItems: newState
    });
    onChange(newState);
    
  }

  render() {
    const { className, classes, vertical, type, buttons } = this.props;

    /**
     * This function checks if the clicked button is stored in state, if so
     * it then takes into account if the button is in a vertical or horizontal
     * positioning. It return s string that maps to a css class that applies
     * styling that fine tunes the component display
     *
     * @param {node} button - clicked button.
     */
    const selectionIndicator = button => {
      const { checkedItems } = this.state;

      let indicatorProp;
      if (vertical) {
        indicatorProp =
          checkedItems.indexOf(button.id) !== -1 ? "isSelectedVertical" : "";
      } else {
        indicatorProp =
          checkedItems.indexOf(button.id) !== -1 ? "isSelected" : "";
      }
      return indicatorProp;
    };

    /**
     * Generate button content elements to render the component itself
     */

    const generateBtnContents = (btnType, button) => {
      let btnStruct;
      if (btnType === "icon") {
        btnStruct = <>{button.icon}</>;
      }
      if (btnType === "text") {
        btnStruct = (
          <>
            <div className={classes.labelText}>{button.value}</div>
          </>
        );
      } else {
        btnStruct = (
          <>
            {button.icon}
            <div className={classes.labelText}>{button.value}</div>
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
          className={classNames(
            classes.btnBase,
            classes.btnSecondary,
            {
              [classes.isSelected]: checkedItems.indexOf(button.id) !== -1,
              [classes.isUnselected]: !(checkedItems.indexOf(button.id) !== -1)
            },
            className
          )}
          category={button.selected ? "secondary" : "ghost"}
          data-selectionindicator={selectionIndicator(button)}
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
       * he button id
       */
      id: PropTypes.string.isRequired,
      /**
       * the button label
       */
      value: PropTypes.string,
      /**
       * icon in button
       */
      icon: PropTypes.node,
      /**
       * If the button is selected
       */
      selected: PropTypes.bool,
      /**
       * Specify if item can be toggled or not
       */
      enforced: PropTypes.bool
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

export default MultiButton;
