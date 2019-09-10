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
import { map, filter, difference, isEqual, each } from "lodash";
import HvButton from "../Button";

import calculatedBtnWidth from "./auxiliaryFunctions";

class MultiButton extends React.Component {
  constructor(props) {
    super(props);

    const { buttonsDefinitions } = this.props;

    let hasError = false;

    const items = map(buttonsDefinitions, o => Object.keys(o));
    /**
     * the contents of filtered are buttons properties, which are optional
     * and can be omitted when we are validating that the buttons to be rendered
     * are of the same visual type
     * */
    const filtered = map(items, i =>
      difference(i, ["isSelected", "isMultiSelectable", "isEnforced"])
    );

    /**
     * All buttons in multibutton should be consistent: i.e, all should be of the same type
     * icon, text or mixed
     * compare the properties of the first element with all the remaining
     * elements in properties set. If there is a mismatch an error is thrown
     * */
    const firstItem = filtered.shift();
    each(filtered, item => {
      if (!isEqual(firstItem, item)) {
        hasError = true;
        return -1;
      }
      return 1;
    });

    /**
     * parse button properties and if any buttons are preset as selected
     * set the state with their ids
     * */
    const initialCompState = filter(
      map(buttonsDefinitions, item =>
        item.isSelected !== undefined ? item.id : null
      ),
      item => item !== null
    );
    /**
     * set state; if button properties are mismatched set hasError prop
     * in order to throw error in component and alert for the need to correctly
     * set the button props
     */
    this.state = {
      checkedItems: initialCompState,
      hasError
    };
  }

  handleClick(e, idx) {
    const { checkedItems } = this.state;
    const {
      onChange,
      isMultiSelectable,
      minSelection,
      buttonsDefinitions
    } = this.props;

    const { target } = e;

    let newState;

    const clickedBtnDefs = buttonsDefinitions[idx];
    const btnClickable =
      clickedBtnDefs.isEnforced !== undefined ? clickedBtnDefs : false;

    const clickedBtnId = buttonsDefinitions[idx].id;
    const clickedBtnPositionInState = checkedItems.indexOf(clickedBtnId);

    if (btnClickable) {
      return -1;
    }

    if (
      checkedItems.length === minSelection &&
      checkedItems.indexOf(clickedBtnId) !== -1
    ) {
      return -1;
    }

    if (isMultiSelectable) {
      // check if item has not been clicked
      if (clickedBtnPositionInState === -1) {
        // handle state change
        newState = [...checkedItems, buttonsDefinitions[idx].id];
        target.dataset.selectionindicator = "isSelected";
      } else {
        const itemToRemove = clickedBtnPositionInState;
        newState = checkedItems.filter((_, i) => i !== itemToRemove);
        target.dataset.selectionindicator = "notSelected";
      }
    } else if (clickedBtnPositionInState !== -1) {
      // handle state change
      newState = [];
      target.dataset.selectionindicator = "notSelected";
    } else {
      newState = [clickedBtnId];
      target.dataset.selectionindicator = "isSelected";
    }

    this.setState({
      checkedItems: newState
    });
    onChange(newState);

    return 1;
  }

  render() {
    const {
      className,
      classes,
      vertical,
      buttonType,
      buttonsDefinitions,
      isMultiSelectable,
      minSelection
    } = this.props;

    const { hasError } = this.state;

    if (hasError) {
      throw new Error(
        "Button Definitions in Component are inconsistent! Buttons should be consistent"
      );
    }

    /**
     * btnWidth is calculated taking into account the longest name
     * in the buttons props, and then calculating the number of characters in the string
     * by an arbitrary value that is defined in the settings file.
     * The calculation is handled by calculatedBtnWidth in the auxiliary functions file
     * */
    const btnWidth = calculatedBtnWidth(buttonsDefinitions, buttonType);
    /**
     * we need to calculate the width of the container that will
     * contain the button in a vertical display
     * as the button width can vary this has to be calculated taking into
     * account the display mode and the length of the elements to display in
     * the multibutton component
     * */
    const multiBtnContainerWidth =
      btnWidth * (vertical ? 1 : buttonsDefinitions.length) + 2;

    /**
     * this function applies a minimum width to each button dynamically as there is
     * variability due to the button types: icon has a min width of 32, all other types
     * should have a minimum width of 70, however in ideal scenarios the minimum width
     * should be the same width as the calculated width for the button
     * */
    const inlineStylesGenerator = () => ({ minWidth: btnWidth, padding: 0 });

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

    const buttons = buttonsDefinitions.map((button, idx) => {
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
          category={button.isSelected ? "secondary" : "ghost"}
          style={inlineStylesGenerator()}
          data-selectionindicator={selectionIndicator(button)}
        >
          {buttonType === "icon" && <>{button.icon}</>}
          {buttonType === "text" && <>{button.value}</>}
          {buttonType === "mixed" && (
            <>
              {button.icon}
              {button.value}
            </>
          )}
        </HvButton>
      );
    });

    return (
      <div
        className={classNames(classes.root, {
          [classes.rootVertical]: vertical
        })}
        style={{ width: multiBtnContainerWidth }}
        isMultiSelectable={isMultiSelectable}
        minSelection={minSelection}
      >
        {buttons}
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
  isMultiSelectable: PropTypes.bool,
  /**
   * Type of button display.
   *  - Accepted values:
   *    --"label": displays just a text label,
   *    --"icon": displays just an icon,
   *    --"mixed": displays both a label and an icon
   */
  buttonType: PropTypes.oneOf(["text", "icon", "mixed"]).isRequired,
  /**
   * Buttons definitions
   */
  buttonsDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Buttons definitions
       */
      id: PropTypes.string.isRequired,
      /**
       * Buttons definitions
       */
      value: PropTypes.string,
      /**
       * Buttons definitions
       */
      icon: PropTypes.node,
      /**
       * Specify if item can be toggled or not
       */
      isEnforced: PropTypes.bool
    })
  ).isRequired,
  /**
   * Callback function to be triggered when the input value is changed
   */
  onChange: PropTypes.func,
  /**
   * Specify minimum number of selections in component
   */
  minSelection: PropTypes.number
};

MultiButton.defaultProps = {
  className: "",
  vertical: false,
  isMultiSelectable: false,
  onChange: () => {},
  minSelection: 0
};

export default MultiButton;
