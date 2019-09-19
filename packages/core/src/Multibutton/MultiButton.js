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

import settings from "./settings";

class Multibutton extends React.Component {
  constructor(props) {
    super(props);

    const { buttonsDefinitions } = this.props;

    let hasError = false;

    // iterate over elements - remove optional definitions
    // compare remaining objects
    const items = map(buttonsDefinitions, o => Object.keys(o));

    const filtered = map(items, i => difference(i, [
        "isSelected",
        "isMultiSelectable",
        "vertical",
        "isEnforced"
      ]));

    const firstItem = filtered.shift();

    each(filtered, item => {
      if (!isEqual(firstItem, item)) {
        hasError = true;
        return -1;
      }
      return 1;
    });

    const initialCompState = filter(
      map(buttonsDefinitions, item =>
        item.isSelected !== undefined ? item.id : null
      ),
      item => item !== null
    );

    this.state = {
      checkedItems: initialCompState,
      hasError
    };

    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let clickedTarget;
    const { checkedItems } = this.state;
    const {
      onChange,
      isMultiSelectable,
      minSelection,
      buttonsDefinitions
    } = this.props;

    const { target } = e;

    if (target.nodeName === "SPAN") {
      clickedTarget = target.parentNode;
    } else if (target.nodeName === "path" || e.target.nodeName === "svg") {
      clickedTarget = target.parentNode.parentNode;
    } else {
      clickedTarget = target;
    }

    let newState;

    const btnClickableProps = filter(buttonsDefinitions, btnProp => {
      if (btnProp.id === clickedTarget.id) {
        return btnProp.isEnforced;
      }
      return false;
    });

    const btnClickable = map(btnClickableProps, i => i.isEnforced)[0];

    if (btnClickable) {
      return -1;
    }

    if (
      checkedItems.length === minSelection &&
      checkedItems.indexOf(clickedTarget.id) !== -1
    ) {
      return -1;
    }

    if (isMultiSelectable) {
      // check if item has not been clicked
      if (checkedItems.indexOf(clickedTarget.id) === -1) {
        // handle state change
        newState = [...checkedItems, clickedTarget.id];
        target.dataset.selectionindicator = "isSelected";
      } else {
        const itemToRemove = checkedItems.indexOf(clickedTarget.id);
        newState = checkedItems.filter((_, i) => i !== itemToRemove);
        target.dataset.selectionindicator = "notSelected";
      }
    } else if (checkedItems.indexOf(clickedTarget.id) !== -1) {
        // handle state change
        newState = [];
        target.dataset.selectionindicator = "notSelected";
      } else {
        newState = [clickedTarget.id];
        clickedTarget.dataset.selectionindicator = "isSelected";
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

    const calculatedBtnWidth = () =>
      buttonsDefinitions.reduce((a, b) =>
        a.value.length > b.value.length ? a : b
      ).value.length *
        settings.WIDTH_PER_CHAR +
      (settings.PADDING_DIM * 2 + settings.BORDER_DIM * 2) +
      (buttonsDefinitions[0].icon ? settings.ICON_WIDTH : 0);

    const btnWidth = () => {
      if (buttonType === "icon") {
        return settings.ICON_BTN_WIDTH;
      }
      return calculatedBtnWidth() < settings.BTN_MIN_WIDTH
        ? settings.BTN_MIN_WIDTH
        : calculatedBtnWidth();
    };

    const multiBtnContainerWidth =
      btnWidth() * (vertical ? 1 : buttonsDefinitions.length) + 2;

    const inlineStylesGenerator = () => ({ minWidth: btnWidth(), padding: 0 });

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
          onClick={e => this.handleClick(e)}
          className={classNames(classes.btnBase, classes.btnSecondary, {
            [classes.isSelected]: checkedItems.indexOf(button.id) !== -1,
            [classes.isUnselected]: !(checkedItems.indexOf(button.id) !== -1)
          }, className)}
          category={button.isSelected ? "secondary" : "ghost"}
          style={inlineStylesGenerator(button)}
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

Multibutton.propTypes = {
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
   * Specify mininum number of selections in component
   */
  minSelection: PropTypes.number
};

Multibutton.defaultProps = {
  className:"",
  vertical: false,
  isMultiSelectable: false,
  onChange: () => {},
  minSelection: 0
};

export default Multibutton;
