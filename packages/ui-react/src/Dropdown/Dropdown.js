/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import _ from "lodash";
import MultiSelect from "@kenshooui/react-multi-select";
import DropdownSearch from "./DropdownSearch";
import HvCheckBox from "../Selectors/CheckBox";
import HvButton, { buttonTypes } from "../Button";

const enter = 13;
const down = 40;
const space = 32;

class HvDropdown extends React.Component {
  constructor(props) {
    super(props);
    const { options, values, dropdownExpanded, disabled, multiSelect } = props;
    const temporarySelection = [];
    const selectedItems = [];
    let expanded = dropdownExpanded;
    let selectedItemsQuantity = 0;

    options.forEach((item, index) => {
      const temporaryItem = { ...item };
      const selectedItem = { ...item };
      if (_.findIndex(values, item) === -1) {
        temporaryItem.isChecked = false;
        selectedItem.isChecked = false;
        temporarySelection[index] = temporaryItem;
        selectedItems[index] = selectedItem;
      } else if (multiSelect) {
        temporaryItem.isChecked = true;
        selectedItem.isChecked = true;
        temporarySelection[index] = temporaryItem;
        selectedItems[index] = selectedItem;
      } else if (!multiSelect && selectedItemsQuantity < 1) {
        selectedItemsQuantity += 1;
        temporaryItem.isChecked = true;
        selectedItem.isChecked = true;
        temporarySelection[index] = temporaryItem;
        selectedItems[index] = selectedItem;
      } else {
        temporaryItem.isChecked = false;
        selectedItem.isChecked = false;
        temporarySelection[index] = temporaryItem;
        selectedItems[index] = selectedItem;
      }
    });

    if (disabled) {
      expanded = false;
    }

    this.state = {
      dropdownExpanded: expanded,
      items: options,
      selectedItems,
      temporarySelection
    };
  }

  /**
   *  Calculate the appropiate height for the dropdown based on the desired content.
   *
   * @param {Number} itemsQuantity - How many items are avaible if more than 10 the dropdown is fixed.
   * @param {Boolean} multiSelect - If ´true´ the dropdown is of type multi select, it will use checkboxes occupying more space.
   * @param {Boolean} showSearch - If ´true´ the searchbox is present it will occupy more space.
   * @returns {Number} - The appropiate height for the dropdown .
   */
  calculateDropdownResponsiveHeight = (
    itemsQuantity,
    multiSelect,
    showSearch
  ) => {
    let baseHeight = 98; // height without items
    let extraItems = 2; // this one will represent the space that the select all and search occupy
    if (multiSelect) {
      baseHeight = 114;
      extraItems = 2;
      if (showSearch) {
        baseHeight = 120;
        extraItems = 1;
      }
    } else if (showSearch) {
      baseHeight = 110;
      extraItems = 1;
    }

    const itemHeight = 32; // the pixel height of each item
    if (itemsQuantity > 10) {
      return baseHeight + (10 - extraItems) * itemHeight;
    }
    return baseHeight + (itemsQuantity - extraItems) * itemHeight;
  };

  /**
   *  Opens the dropdown if closed, Closes the dropdown if open,
   *  it will also reset the state to the last applied selection.
   *
   * @param {Object} event - The event produced when clicking or interacting with the dropdown button
   */
  toggleDropdown = event => {
    const { dropdownExpanded, selectedItems } = this.state;
    const { onToggle, disabled } = this.props;
    if (
      !disabled &&
      (!event.keyCode ||
        event.keyCode === enter ||
        event.keyCode === down ||
        event.keyCode === space)
    ) {
      const isOpen = !dropdownExpanded;
      onToggle(isOpen);
      const newSelectedItems = _.cloneDeep(selectedItems);
      const newTemporaryItems = _.cloneDeep(selectedItems);
      this.setState({
        dropdownExpanded: isOpen,
        selectedItems: newSelectedItems,
        temporarySelection: newTemporaryItems
      });
    }
  };

  /**
   *  Creates the element to be rendered by the Kenshoo' multi select,
   *  if the dropdown if of type multiselect the item will be a HvCheckbox
   *  otherwise it will be a <div>
   *
   * @param {Object} subProps - The object sent by the kenshoo's multi select that contains the item to be rendered
   * @returns {Node} - The element that will represent every item inside the drop down
   */
  generateItemRenderer = subProps => {
    const { item, onKeyDown } = subProps;
    const { classes, multiSelect } = this.props;
    const { temporarySelection } = this.state;
    let itemClass = classes.singleItem;

    const index = this.findItem(item);

    if (temporarySelection[index].isChecked) {
      itemClass = classes.singleItemSelected;
    }
    let itemRenderer = (
      <div
        className={itemClass}
        onKeyDown={onKeyDown}
        onClick={() => {
          this.onSimpleSelectionClick(item);
        }}
        role="button"
        tabIndex={0}
      >
        <div className={classes.singleItemLabel}>{item.label}</div>
      </div>
    );

    if (multiSelect) {
      itemRenderer = (
        <HvCheckBox
          className={classes.checkBoxItem}
          label={item.label}
          value={item.id}
          onChange={() => {
            this.onMultipleSelection(item);
          }}
          checked={temporarySelection[index].isChecked}
        />
      );
    }

    return <div className={classes.itemContainer}>{itemRenderer}</div>;
  };

  /**
   *  Creates the select all element to be rendered by the Kenshoo' multi select,
   *  if the dropdown if of type multiselect the item will be a HvCheckbox
   *  otherwise it won't render anything
   *
   * @param {Object} subProps - The object sent by the kenshoo's multi select that contains the item to be rendered
   * @returns {Node|null} - The element that will represent every item inside the drop down
   */
  generateSelectAllRenderer = subProps => {
    const { selectAllMessage } = subProps;
    const { classes, multiSelect } = this.props;
    if (!multiSelect) {
      return null;
    }
    const selectAllState = this.isAllSelected();
    return (
      <div className={classes.itemContainer}>
        <HvCheckBox
          className={classes.checkBoxItemHighlight}
          label={selectAllMessage}
          checked={selectAllState.checked}
          indeterminate={selectAllState.indeterminate}
          onChange={this.onSelectAll}
        />
      </div>
    );
  };

  /**
   *  Creates the search bar element to be rendered by the Kenshoo' multi select,
   *
   * @param {Object} subProps - The object sent by the kenshoo's multi select that contains the item to be rendered
   * @returns {Node|null} - The element that will represent every item inside the drop down
   */
  generateSearchRenderer = subProps => {
    const { showSearch, classes } = this.props;
    const { onChange } = subProps;
    if (!showSearch) {
      return <div className={classes.blankSearch} />;
    }

    return <DropdownSearch onChange={onChange} />;
  };

  /**
   *  Creates and configures the dropdown using Kenshoo' multi select
   */
  generateDropdownRenderer = () => {
    const { dropdownExpanded, items, selectedItems } = this.state;
    const { classes, messages, disabled, multiSelect, showSearch } = this.props;
    const result = {
      buttonClasses: classes.dropdownButtonContainer,
      dropdownRenderer: null
    };
    const itemHeight = 32;
    let wrapperClassName = classes.dropdownSimpleSelection;

    if (dropdownExpanded) {
      let buttons = null;

      if (multiSelect) {
        buttons = (
          <div className={classes.buttonContainer}>
            <HvButton
              className={classes.button}
              colorType={buttonTypes.link}
              onClick={this.onCancelSelection}
            >
              {messages.cancelButtonText}
            </HvButton>
            <HvButton
              className={classes.button}
              colorType={buttonTypes.link}
              onClick={this.onApplySelection}
            >
              {messages.applyButtonText}
            </HvButton>
          </div>
        );
        if (showSearch) {
          wrapperClassName = classes.dropdownMultipleSelectionSearch;
        } else {
          wrapperClassName = classes.dropdownMultipleSelection;
        }
      } else if (showSearch) {
        wrapperClassName = classes.dropdownSimpleSelectionSearch;
      } else {
        wrapperClassName = classes.dropdownSimpleSelection;
      }

      const responsiveHeight = this.calculateDropdownResponsiveHeight(
        items.length,
        multiSelect,
        showSearch
      );

      result.dropdownRenderer = (
        <>
          <MultiSelect
            style={{
              position: "absolute"
            }}
            responsiveHeight={responsiveHeight}
            wrapperClassName={wrapperClassName}
            messages={messages}
            items={items}
            itemHeight={itemHeight}
            selectedItems={selectedItems}
            onChange={this.onChange}
            disabled={disabled}
            showSearch={showSearch}
            showSelectedItems={false}
            itemRenderer={this.generateItemRenderer}
            selectedItemRenderer={this.generateSelectedItemRenderer}
            selectAllRenderer={this.generateSelectAllRenderer}
            searchRenderer={this.generateSearchRenderer}
          />
          {buttons}
        </>
      );
      result.buttonClasses = classes.dropdownOpenButtonContainer;
    } else {
      return result;
    }
    return result;
  };

  /**
   * Selects a single item and updates the state
   *
   * @param {Object} item - the item that was clicked
   */
  onSimpleSelectionClick = item => {
    const { temporarySelection } = this.state;
    const newTemporarySelection = _.cloneDeep(temporarySelection);
    newTemporarySelection.forEach((temporaryItem, index) => {
      const newTemporaryItem = { ...temporaryItem };
      newTemporaryItem.isChecked = false;
      newTemporarySelection[index] = newTemporaryItem;
    });
    const index = this.findItem(item);
    newTemporarySelection[index].isChecked = true;
    this.setState({
      temporarySelection: newTemporarySelection,
      selectedItems: _.cloneDeep(newTemporarySelection),
      dropdownExpanded: false
    });
  };

  /**
   * Selects multiple item and updates the state, changing only the temporary selection
   * because for multiselections the final selection is not finished until applied.
   *
   * @param {Object} item - the item that was clicked
   */
  onMultipleSelection = item => {
    const { temporarySelection } = this.state;
    const itemIndex = this.findItem(item);

    const newTemporarySelection = _.cloneDeep(temporarySelection);

    newTemporarySelection[itemIndex].isChecked = !newTemporarySelection[
      itemIndex
    ].isChecked;

    this.setState({
      temporarySelection: newTemporarySelection
    });
  };

  onChange = (...args) => {
    const { onChange } = this.props;
    onChange(args);
  };

  /**
   * Applies the temporary selection to the final selection and closes the dropdown.
   */
  onApplySelection = () => {
    const { temporarySelection } = this.state;
    const { onApply } = this.props;
    const newSelection = _.cloneDeep(temporarySelection);
    const newTemporarySelection = _.cloneDeep(temporarySelection);
    onApply(this.pruneSelectedItems(_.cloneDeep(newSelection)));
    this.setState({
      selectedItems: newSelection,
      temporarySelection: newTemporarySelection,
      dropdownExpanded: false
    });
  };

  /**
   * Reset the temporary selection to the previous selected values and closes the dropdown.
   */
  onCancelSelection = () => {
    const { selectedItems } = this.state;
    const { onCancel } = this.props;
    const newSelection = _.cloneDeep(selectedItems);
    const newTemporarySelection = _.cloneDeep(selectedItems);
    onCancel(this.pruneSelectedItems(_.cloneDeep(newSelection)));
    this.setState({
      selectedItems: newSelection,
      temporarySelection: newTemporarySelection,
      dropdownExpanded: false
    });
  };

  /**
   * Selects All items and updates the state,
   * if all the items were previously selected it instead deselect all,
   * only the temporary selection state is affected
   * because for multiselections the final selection is not finished until applied.
   */
  onSelectAll = () => {
    const { temporarySelection } = this.state;
    const { onSelectAll, multiSelect } = this.props;
    const newTemporarySelection = temporarySelection.slice();
    const isAllSelectedState = this.isAllSelected();
    if (!multiSelect) {
      return;
    }
    if (isAllSelectedState.checked && !isAllSelectedState.indeterminate) {
      newTemporarySelection.forEach((temporaryItem, index) => {
        const newTemporaryItem = { ...temporaryItem };
        newTemporaryItem.isChecked = false;
        newTemporarySelection[index] = newTemporaryItem;
      });
    } else {
      newTemporarySelection.forEach((temporaryItem, index) => {
        const newTemporaryItem = { ...temporaryItem };
        newTemporaryItem.isChecked = true;
        newTemporarySelection[index] = newTemporaryItem;
      });
    }
    onSelectAll();
    this.setState({
      temporarySelection: newTemporarySelection
    });
  };

  /**
   * Check if the all button is selected by analyzing the state.
   * 
   * @returns {Object} - The object that contains the properties necessary to determine the all button state.
   */
  isAllSelected = () => {
    const { temporarySelection, items } = this.state;

    let selectedCounts = 0;

    temporarySelection.forEach(temporaryItem => {
      if (temporaryItem.isChecked) {
        selectedCounts += 1;
      }
    });

    if (selectedCounts === items.length) {
      return {
        indeterminate: false,
        checked: true
      };
    }

    if (selectedCounts > 0) {
      return {
        indeterminate: true,
        checked: true
      };
    }

    return {
      indeterminate: false,
      checked: false
    };
  };

  /**
   *  Look for an item inside the temporary selection.
   *
   * @param {Object} item - the object to be found inside the temporary selection it checks for label and id.
   * @returns {Number} the index of the item if found, -1 if not found.
   */
  findItem = item => {
    const { temporarySelection } = this.state;
    return _.findIndex(
      temporarySelection,
      temporaryItem =>
        temporaryItem.id === item.id && temporaryItem.label === item.label
    );
  };

  /**
   *  Removes unchecked items from the selected items list.
   *
   * @param {Array} selectedItems - The array items to be clean.
   * @returns {Array} The array with the unchecked items eliminated.
   */
  pruneSelectedItems = selectedItems =>
    _.remove(selectedItems, item => item.isChecked);

  render() {
    const {
      classes,
      dropdownClassname,
      buttonClassName,
      disabled,
      messages,
      multiSelect
    } = this.props;
    const { dropdownExpanded, selectedItems } = this.state;

    let iconButton = classNames([classes.icon, classes.chevronDown]);

    if (dropdownExpanded) {
      iconButton = classNames([classes.icon, classes.chevronUp]);
    }

    const dropdown = this.generateDropdownRenderer();
    const dropdownContainer = classNames([
      classes.dropdownContainer,
      dropdownClassname
    ]);
    let containerButtonClasses = classNames([
      dropdown.buttonClasses,
      buttonClassName
    ]);
    let dropdownButtonClasses = classes.dropdownButton;
    let buttonText = classes.dropdownButtonText;

    if (disabled) {
      containerButtonClasses = classNames([
        containerButtonClasses,
        classes.buttonDisabled,
        classes.dropdownButtonContainerDisabled
      ]);
      iconButton = classNames([classes.icon, classes.chevronDownDisabled]);
      dropdownButtonClasses = classNames([
        dropdownButtonClasses,
        classes.buttonDisabled
      ]);
      buttonText = classes.dropdownButtonTextDisabled;
    }

    let buttonMessage = messages.defaultTextValue;

    if (!multiSelect) {
      const index = _.findIndex(selectedItems, item => item.isChecked);
      if (index !== -1) {
        buttonMessage = selectedItems[index].label;
      }
    } else {
      let selectedItemsQuantity = 0;
      let itemIndex = -1;
      selectedItems.forEach((item, index) => {
        if (item.isChecked) {
          selectedItemsQuantity += 1;
          itemIndex = index;
        }
      });
      if (selectedItemsQuantity > 1) {
        buttonMessage = `${selectedItemsQuantity} ${
          messages.multipleSelectionConjuctionMessage
        } ${selectedItems.length}`;
      } else if (itemIndex !== -1 && selectedItemsQuantity > 0) {
        buttonMessage = selectedItems[itemIndex].label;
      }
    }

    return (
      <>
        <p className={classes.label}>{messages.dropdownLabel}</p>
        <div
          className={containerButtonClasses}
          onKeyDown={this.toggleDropdown}
          onClick={this.toggleDropdown}
          role="button"
          tabIndex={0}
        >
          <div className={dropdownButtonClasses}>
            <div className={buttonText}>{buttonMessage}</div>
          </div>

          <div className={classes.iconContainer}>
            <div className={iconButton} />
          </div>
        </div>
        <div className={dropdownContainer}>{dropdown.dropdownRenderer}</div>
      </>
    );
  }
}

HvDropdown.propTypes = {
  /** 
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /** 
   * The avaible options inside the dropdown.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string
    })
  ).isRequired,
  /** 
   * The options that are pre-selected when the dropdown renders.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string
    })
  ),
  /** 
   * If the ´true´ the dropdown is multiselect if ´false´ the dropdown is single select.
   */
  multiSelect: PropTypes.bool,
  /** 
   * An object containing all the labels for the dropdown.
   */
  messages: PropTypes.shape({
    searchPlaceholder: PropTypes.string,
    noItemsMessage: PropTypes.string,
    noneSelectedMessage: PropTypes.string,
    selectedMessage: PropTypes.string,
    selectAllMessage: PropTypes.string,
    clearAllMessage: PropTypes.string,
    applyButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    defaultTextValue: PropTypes.string,
    multipleSelectionConjuctionMessage: PropTypes.string,
    dropdownLabel: PropTypes.string
  }).isRequired,
  /** 
   * If ´true´ the dropdown starts opened if ´false´ it starts closed.
   */
  dropdownExpanded: PropTypes.bool,
  /** 
   * If ´true´ the dropdown is disabled unable to be interacted, if ´false´ it is enabled.
   */
  disabled: PropTypes.bool,
  /** 
   * If ´true´ the dropdown is rendered with a search bar, if ´false´ there won't be a search bar.
   */
  showSearch: PropTypes.bool,
  /** 
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item.
   */
  onChange: PropTypes.func,
  /** 
   * A function to be executed whenever the apply button is clicked, the function receives all selected items.
   */
  onApply: PropTypes.func,
  /** 
   * A function to be executed whenever the cancel button is clicked, the function receives all selected items.
   */
  onCancel: PropTypes.func,
  /** 
   * A function to be executed whenever the dropdown toggle button is clicked.
   */
  onToggle: PropTypes.func,
  /** 
   * A class name to be appended to in the root of the dropdown.
   */
  dropdownClassname: PropTypes.string,
  /** 
   * A class name to be appended to in the root of the dropdown.
   */
  buttonClassName: PropTypes.string,
  /** 
   * A function to be executed whenever the select all button is clicked.
   */
  onSelectAll: PropTypes.func
};

HvDropdown.defaultProps = {
  multiSelect: false,
  showSearch: false,
  values: [],
  disabled: false,
  dropdownExpanded: false,
  dropdownClassname: "",
  buttonClassName: "",
  onChange: () => {},
  onApply: () => {},
  onCancel: () => {},
  onToggle: () => {},
  onSelectAll: () => {}
};

export default HvDropdown;
