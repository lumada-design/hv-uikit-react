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
import NavIcon from "@hv/uikit-react-icons/dist/DawnTheme/DropRight.XS";
import HvTypography from "../Typography";
import HvCheckBox from "../Selectors/CheckBox";
import HvRadioButton from "../Selectors/RadioButton";

const DEFAULT_STATE = {
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

class List extends React.Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    const { values } = this.props;
    const parsedList = this.parseList(values);

    this.setState({ list: parsedList }, () => this.setSelection(false));
  }

  /**
   * Sets the selection state according to the list and props state and trigger the onChange callback.
   *
   * @param {Boolean} trigger - If true it will trigger the onChange callback.
   *
   * @memberof List
   */
  setSelection(trigger) {
    const { list } = this.state;
    const { labels, multiSelect, useSelector, onChange } = this.props;
    const { selectAll, selectionConjunction } = labels;

    const hasLeftIcon = !!list.filter(elem => elem.leftIcon).length;
    const selection = list.filter(elem => elem.selected);
    const hasSelection = !!selection.length;
    const allSelected = selection.length === list.length;
    const selectionLabel = !hasSelection
      ? selectAll
      : `${selection.length} ${selectionConjunction} ${list.length}`;

    this.setState({
      list,
      selectionLabel,
      anySelected: hasSelection && !allSelected,
      allSelected: hasSelection && allSelected,
      hasLeftIcon: !useSelector && hasLeftIcon,
      isFocusDisabled: true
    });

    if (trigger) onChange(multiSelect ? selection : selection[0]);
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
    let isAnySelected = false;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      const selectionKey = elem.id ? "id" : "label";
      const selectedElement = item && item[selectionKey];

      // reset elem selection
      if (!multiSelect || !selectable || !newElem.selected) {
        newElem.selected = false;
      }

      if (selectable && elem[selectionKey] === selectedElement) {
        isAnySelected = true;
        newElem.selected = multiSelect ? !elem.selected : true;
      }

      return newElem;
    });

    // select first item when single select
    if (!multiSelect && !isAnySelected && selectable && selectDefault) {
      newList[0].selected = true;
    }

    return newList;
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
      window.event.code !== "Enter"
    ) {
      this.setState({ isFocusDisabled: false });
      return;
    }

    const { list } = this.state;
    const parsedList = this.parseList(list, item);

    this.setState({ list: parsedList }, () => this.setSelection(true));
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

    this.setState({ list: newList }, () => this.setSelection(true));
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

  renderSingleSelect(elem) {
    const { classes, useSelector } = this.props;

    return useSelector ? (
      <HvRadioButton
        label={elem.label}
        checked={elem.selected}
        onChange={() => this.handleSelection(elem)}
        classes={{
          container: classes.selectorContainer,
          labelTypography: classes.truncate
        }}
      />
    ) : (
      this.renderItemText(elem)
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

  renderItem(key, elem) {
    const { isFocusDisabled } = this.state;
    const { classes, multiSelect, useSelector, condensed } = this.props;

    return (
      <li
        key={key}
        onClick={() => !useSelector && this.handleSelection(elem)}
        onKeyDown={() => !useSelector && this.handleSelection(elem)}
        role="option"
        aria-selected={elem.selected}
        tabIndex={useSelector ? null : 0}
        className={classNames([
          classes.listItem,
          {
            [classes.selected]: elem.selected && !useSelector,
            [classes.focusDisabled]: isFocusDisabled,
            [classes.condensed]: condensed
          }
        ])}
      >
        {!useSelector && this.rendereLeftIcon(elem)}

        {multiSelect
          ? this.renderMultiSelect(elem)
          : this.renderSingleSelect(elem)}

        {!useSelector && this.renderNavIcon(elem)}
      </li>
    );
  }

  renderItemText(elem) {
    const { hasLeftIcon } = this.state;
    const { classes } = this.props;

    return (
      <HvTypography
        variant="normalText"
        className={classNames([
          classes.typography,
          classes.truncate,
          {
            [classes.selected]: elem.selected,
            [classes.iconLeftPadding]: elem.leftIcon,
            [classes.noIconLeftPadding]: !elem.leftIcon && hasLeftIcon
          }
        ])}
        onChange={() => this.handleSelection(elem)}
      >
        {elem.label}
      </HvTypography>
    );
  }

  rendereLeftIcon(elem) {
    const { theme } = this.props;

    const iconColor = elem.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return elem.leftIcon ? elem.leftIcon({ color: ["none", iconColor] }) : null;
  }

  renderNavIcon(elem) {
    const { theme } = this.props;

    const iconColor = elem.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return elem.showNavIcon ? <NavIcon color={["none", iconColor]} /> : null;
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

List.propTypes = {
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
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - leftIcon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      leftIcon: PropTypes.func,
      showNavIcon: PropTypes.bool
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
   * Call back fired when list item is selected.
   */
  onChange: PropTypes.func,
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

List.defaultProps = {
  id: "",
  multiSelect: false,
  showSelectAll: false,
  labels: DEFAULT_LABELS,
  useSelector: false,
  onChange() {},
  selectable: true,
  selectDefault: true,
  condensed: false
};

export default List;
