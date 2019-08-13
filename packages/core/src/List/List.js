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
import isNil from "lodash/isNil";
import NavIcon from "@hv/uikit-react-icons/dist/DawnTheme/DropRight.XS";
import HvLink from "../Link";
import HvTypography from "../Typography";
import HvCheckBox from "../Selectors/CheckBox";
import HvRadioButton from "../Selectors/RadioButton";

const DEFAULT_STATE = {
  values: [],
  list: [],
  selectionLabel: "",
  anySelected: false,
  allSelected: false,
  hasLeftIcon: false,
  isFocusDisabled: false
};

const DEFAULT_LABELS = {
  selectAll: "All",
  selectionConjunction: "of"
};

const isItemSelected = (item, newItem) => {
  const selectionKey = item && item.id ? "id" : "label";
  const selectionElement = item && item[selectionKey];
  return newItem[selectionKey] === selectionElement;
};

const prepareState = (list, labels, useSelector) => {
  const { selectAll, selectionConjunction } = labels;
  const hasLeftIcon = !!list.filter(elem => elem.leftIcon).length;
  const selection = list.filter(elem => elem.selected);
  const hasSelection = !!selection.length;
  const allSelected = selection.length === list.length;
  const selectionLabel = !hasSelection
    ? selectAll
    : `${selection.length} ${selectionConjunction} ${list.length}`;
  return {
    list,
    selectionLabel,
    anySelected: hasSelection && !allSelected,
    allSelected: hasSelection && allSelected,
    hasLeftIcon: !useSelector && hasLeftIcon,
    isFocusDisabled: true
  };
};

const parseSelection = (list, multiSelect, selectable, selectDefault, item) => {
  let isAnySelected = false;

  const newList = list.map(elem => {
    const newItem = { ...elem };
    let isSelected;
    if (multiSelect) {
      isSelected = isItemSelected(item, newItem);
    } else {
      isSelected = item ? isItemSelected(item, newItem) : elem.selected;
    }

    // reset elem selection
    if (!multiSelect || !selectable || !newItem.selected) {
      newItem.selected = false;
    }

    if (isSelected) {
      isAnySelected = true;
      newItem.selected = multiSelect ? !elem.selected : true;
    }

    return newItem;
  });

  // select first item when single select
  if (!multiSelect && !isAnySelected && selectable && selectDefault) {
    newList[0].selected = true;
  }

  return newList;
};

class HvList extends React.Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    const { values } = this.props;
    const parsedList = this.parseList(values);
    this.setSelection(parsedList, false);
    this.setState({
      values
    });
  }

  /**
   * Used for when the values prop is changed and the values must be updated in the list.
   *
   * @param nextProps
   * @param prevState
   * @returns {null|{isFocusDisabled: boolean, selectionLabel: *, hasLeftIcon: boolean, anySelected: boolean, list: *, allSelected: boolean}}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      values: nextValue,
      labels: nextLabels,
      useSelector: nextUseSelector,
      multiSelect: nextMultiSelect,
      selectable: nextSelectable,
      selectDefault: nextSelectDefault
    } = nextProps;
    const { values: oldValues, list: oldList } = prevState;
    if (isNil(nextValue) || oldValues === nextValue) {
      return null;
    }
    const nextParsedList = parseSelection(
      nextValue,
      nextMultiSelect,
      nextSelectable,
      nextSelectDefault
    );
    const preparedState = prepareState(
      nextParsedList,
      nextLabels,
      nextUseSelector
    );
    preparedState.values = nextValue;
    if (nextParsedList !== undefined && preparedState.list !== oldList) {
      return preparedState;
    }
    return null;
  }

  /**
   * Sets the selection state according to the list and props and trigger the onChange callback.
   *
   * @param {Array} list - The list to set the selection according.
   * @param {Boolean} trigger - If true it will trigger the onChange callback.
   *
   * @memberof List
   */
  setSelection(list, trigger) {
    const {
      labels,
      multiSelect,
      useSelector,
      onChange,
      selectable
    } = this.props;

    const preparedState = prepareState(list, labels, useSelector);
    const selection = list.filter(elem => elem.selected);
    this.setState(preparedState);

    // only triggers the onChange callback if the list is selectable
    if (trigger && selectable) onChange(multiSelect ? selection : selection[0]);
  }

  /**
   *  Parse list and normalize it according to item selected and props.
   *
   * @param {Array} list - the list to be parsed.
   * @param {Array} item - the item selected.
   * @returns {Array}
   * @memberof List
   */
  parseList(list, item) {
    const { multiSelect, selectable, selectDefault } = this.props;
    return parseSelection(list, multiSelect, selectable, selectDefault, item);
  }

  /**
   * Handles list item selection.
   * It will update the list state according to the selection.
   *
   * @param {Object} item - The list item selected.
   * @memberof List
   */
  handleSelection(item) {
    if (
      window &&
      window.event &&
      window.event.type !== "click" &&
      window.event.type !== "mousedown" &&
      window.event.code !== "Enter"
    ) {
      this.setState({ isFocusDisabled: false });
      return;
    }

    const { list } = this.state;
    const { onClick } = this.props;
    const parsedList = this.parseList(list, item);

    onClick(item);

    // need to defer the state update because list was being updated before triggering the link (when available).
    const delay = item.path ? 150 : 0;
    setTimeout(() => this.setSelection(parsedList, true), delay);
  }

  /**
   * Handles select all selection.
   * It will update the list state marking all the items as selected.
   *
   * @memberof List
   */
  handleSelectAll() {
    const { list, allSelected } = this.state;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.selected = !allSelected;
      return newElem;
    });

    this.setSelection(newList, true);
  }

  /**
   * It will manage the selected list item state on mouse up.
   *
   * @memberof List
   */
  handleMouseUp(item) {
    const { list } = this.state;
    const { selectable } = this.props;

    const newList = list.map(elem => {
      const newItem = { ...elem };

      if (!selectable) {
        newItem.selected = false;
      }

      return newItem;
    });

    // need to defer the state update because list was being updated before triggering the link (when avaialable).
    const delay = item.path ? 150 : 0;
    setTimeout(() => this.setSelection(newList, true), delay);
  }

  renderMultiSelect(item) {
    const { classes, useSelector } = this.props;

    return useSelector ? (
      <HvCheckBox
        label={item.label}
        checked={item.selected}
        onChange={() => this.handleSelection(item)}
        classes={{
          container: classes.selectorContainer,
          labelTypography: classes.truncate
        }}
      />
    ) : (
      this.renderItemText(item)
    );
  }

  renderSingleSelect(item) {
    const { classes, useSelector } = this.props;

    return useSelector ? (
      <HvRadioButton
        label={item.label}
        checked={item.selected}
        onChange={() => this.handleSelection(item)}
        classes={{
          container: classes.selectorContainer,
          labelTypography: classes.truncate
        }}
      />
    ) : (
      this.renderItemText(item)
    );
  }

  renderSelectAll() {
    const { classes } = this.props;
    const { selectionLabel, anySelected, allSelected } = this.state;

    return (
      <HvCheckBox
        label={selectionLabel}
        onChange={() => this.handleSelectAll()}
        classes={{ container: classes.selectorContainer }}
        className={classNames([classes.selectAll])}
        indeterminate={!allSelected && anySelected}
        checked={allSelected}
      />
    );
  }

  renderItem(key, item) {
    const { isFocusDisabled } = this.state;
    const { classes, multiSelect, useSelector, condensed } = this.props;

    return (
      <li
        key={key}
        onKeyDown={() => !useSelector && this.handleSelection(item)}
        onMouseDown={() => !useSelector && this.handleSelection(item)}
        onMouseUp={() => !useSelector && this.handleMouseUp(item)}
        role="option"
        aria-selected={item.selected}
        tabIndex={item.path || useSelector ? null : 0}
        className={classNames([
          classes.listItem,
          {
            [classes.selected]: item.selected && !useSelector,
            [classes.focusDisabled]: isFocusDisabled,
            [classes.condensed]: condensed
          }
        ])}
      >
        {!useSelector && this.renderLeftIcon(item)}

        {multiSelect
          ? this.renderMultiSelect(item)
          : this.renderSingleSelect(item)}

        {!useSelector && this.renderNavIcon(item)}
      </li>
    );
  }

  renderItemText(item) {
    const { hasLeftIcon } = this.state;
    const { classes, useRouter } = this.props;

    const ItemText = () => (
      <HvTypography
        variant={item.selected ? "selectedText" : "normalText"}
        className={classNames([
          classes.typography,
          classes.truncate,
          {
            [classes.selected]: item.selected,
            [classes.iconLeftPadding]: item.leftIcon,
            [classes.noIconLeftPadding]: !item.leftIcon && hasLeftIcon
          }
        ])}
      >
        {item.label}
      </HvTypography>
    );

    return item.path ? (
      <HvLink
        route={item.path}
        params={item.params || {}}
        useRouter={useRouter}
      >
        <ItemText />
      </HvLink>
    ) : (
      <ItemText />
    );
  }

  renderLeftIcon(item) {
    const { theme } = this.props;

    const iconColor = item.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return item.leftIcon ? item.leftIcon({ color: ["none", iconColor] }) : null;
  }

  renderNavIcon(item) {
    const { theme } = this.props;

    const iconColor = item.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return item.showNavIcon ? <NavIcon color={["none", iconColor]} /> : null;
  }

  render() {
    const { classes, id, multiSelect, showSelectAll } = this.props;
    const { list } = this.state;

    return (
      <>
        {list && (
          <ul id={id} className={classes.root} role="listbox">
            {multiSelect && showSelectAll ? this.renderSelectAll() : null}
            {list.map((item, i) => this.renderItem(i, item))}
          </ul>
        )}
      </>
    );
  }
}

HvList.propTypes = {
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object).isRequired,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the list item.
     */
    listItem: PropTypes.string,
    /**
     * Styles applied to the list item when condensed.
     */
    condensed: PropTypes.string,
    /**
     * Styles applied to the selected list item.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to disabled list item focus.
     */
    focusDisabled: PropTypes.string,
    /**
     * Styles applied to the list item text.
     */
    typography: PropTypes.string,
    /**
     * Styles applied to the list item icon left padding
     */
    iconLeftPadding: PropTypes.string,
    /**
     * Styles applied to the list item padding when no left icon
     */
    noIconLeftPadding: PropTypes.string,
    /**
     * Styles applied to the list item right nav icon.
     */
    navIcon: PropTypes.string,
    /**
     * Styles applied to the list item selector container.
     */
    selectorContainer: PropTypes.string,
    /**
     * Styles applied to the select all option when multiselect.
     */
    selectAll: PropTypes.string,
    /**
     * Styles applied when the list item text when truncate.
     */
    truncate: PropTypes.string
  }).isRequired,
  /**
   * The id of the root element
   */
  id: PropTypes.string,
  /**
   * A list containing the elements to be rendered.
   *
   * - id: the id of the item.
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - leftIcon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   * - path: The path to navigate to.
   * - params: The params to pass to the router.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      leftIcon: PropTypes.func,
      showNavIcon: PropTypes.bool,
      path: PropTypes.string,
      params: PropTypes.instanceOf(Object)
    })
  ).isRequired,
  /**
   * If true renders a multi select list.
   */
  multiSelect: PropTypes.bool,
  /**
   * If true renders select all option for multi selection lists with selectors.
   * note: It will only be rendered if multiSelect and useSelector props are set to true.
   */
  showSelectAll: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   *
   * - selectAll: The label used for the All checkbox action.
   * - selectionConjunction: The label used in the middle of the multiselection count.
   */
  labels: PropTypes.shape({
    selectAll: PropTypes.string,
    selectionConjunction: PropTypes.string
  }),
  /**
   * If true renders list itens with radio or checkbox selectors.
   */
  useSelector: PropTypes.bool,
  /**
   * Indicates if the router should be used.
   */
  useRouter: PropTypes.bool,
  /**
   * Call back fired when list item is selected. Returns selection state.
   */
  onChange: PropTypes.func,
  /**
   * Call back fired when list item is selected. Returns selected item.
   */
  onClick: PropTypes.func,
  /**
   * If ´true´ the list items will show the selection state.
   */
  selectable: PropTypes.bool,
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool,
  /**
   * If ´true´ the list will be rendered without vertical spacing.
   */
  condensed: PropTypes.bool
};

HvList.defaultProps = {
  id: "",
  multiSelect: false,
  showSelectAll: false,
  labels: DEFAULT_LABELS,
  useSelector: false,
  useRouter: false,
  onChange() {},
  onClick() {},
  selectable: true,
  selectDefault: true,
  condensed: false
};

export default HvList;
