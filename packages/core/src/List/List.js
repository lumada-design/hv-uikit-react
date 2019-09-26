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
import DropRight from "@hv/uikit-react-icons/dist/DawnTheme/DropRight.XS";
import { parseList, parseState } from "./utils";
import HvCheckBox from "../Selectors/CheckBox";
import HvRadioButton from "../Selectors/RadioButton";
import HvTypography from "../Typography";
import withTooltip from "../withTooltip";
import HvLink from "../Link";
import Focus from "../Focus";

const DEFAULT_STATE = {
  list: [],
  values: [],
  hasLeftIcons: false,
  allSelected: false,
  anySelected: false,
  selectionLabel: ""
};

const DEFAULT_LABELS = {
  selectAll: "All",
  selectionConjunction: "of"
};

class List extends React.Component {
  state = DEFAULT_STATE;

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.values) {
      const { labels, values } = props;

      const parsedList = parseList(values, null, props);
      const parsedState = parseState(parsedList, labels || DEFAULT_LABELS);

      return {
        values,
        ...parsedState
      };
    }

    return null;
  }

  handleSelect(evt, item) {
    if (!item.path) evt.preventDefault();
    if (item.disabled) return;
    
    const { list, labels } = this.state;
    const { onChange, onClick } = this.props;
    
    const parsedList = parseList(list, item, this.props);
    const parsedState = parseState(parsedList, labels);

    this.setState({ ...parsedState });

    onClick(item);
    onChange(parsedList);
  }

  handleSelectAll() {
    const { list, labels, allSelectableSelected } = this.state;
    const { onChange } = this.props;

    const parsedList = parseList(list, null, this.props, !allSelectableSelected);
    const parsedState = parseState(parsedList, labels);

    this.setState({ ...parsedState });

    onChange(parsedList);
  }

  renderSelectAll = () => {
    const { classes } = this.props;
    const { selectionLabel, allSelected, anySelected } = this.state;

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
  };

  renderListItem = (item, i) => {
    const { classes, multiSelect, useSelector, condensed } = this.props;

    return (
      <Focus key={i} focusOnClick={false}>
        <li
          role="option"
          aria-selected={item.selected}
          onClick={evt => this.handleSelect(evt, item)}
          onKeyDown={() => {}}
          className={classNames([
            classes.listItem,
            {
              [classes.selected]: item.selected && !useSelector,
              [classes.condensed]: condensed,
              [classes.selector]: useSelector,
              [classes.disabled]: item.disabled,
            }
          ])}
        >
          {!useSelector && item.leftIcon && this.renderLeftIcon(item)}

          {multiSelect
            ? this.renderMultiSelectItem(item)
            : this.renderSingleSelectItem(item)}

          {item.showNavIcon && this.renderNavIcon(item)}
        </li>
      </Focus>
    );
  };

  renderMultiSelectItem = item => {
    const { classes, useSelector } = this.props;

    return useSelector ? (
      <HvCheckBox
        label={item.label}
        checked={item.selected}
        onChange={evt => this.handleSelect(evt, item)}
        classes={{
          container: classes.selectorContainer,
          labelTypography: classes.truncate
        }}
      />
    ) : (
      this.renderItemText(item)
    );
  };

  renderSingleSelectItem = item => {
    const { classes, useSelector } = this.props;

    return useSelector ? (
      <HvRadioButton
        label={item.label}
        checked={item.selected}
        classes={{
          container: classes.selectorContainer,
          labelTypography: classes.truncate
        }}
      />
    ) : (
      this.renderItemText(item)
    );
  };

  renderItemText = item => {
    const { multiSelect, useRouter, hasTooltips } = this.props;
    const Text = () => this.renderText(item);
    const ItemText = hasTooltips ? withTooltip(Text, item.label) : Text;

    return !multiSelect && item.path ? (
      <HvLink
        key={item.label}
        route={item.path}
        params={item.params || {}}
        useRouter={useRouter}
      >
        <ItemText />
      </HvLink>
    ) : (
      <ItemText />
    );
  };

  renderText = item => {
    const { classes } = this.props;
    const { hasLeftIcons } = this.state;

    return (
      <HvTypography
        variant={item.selected ? "selectedText" : "normalText"}
        className={classNames([
          classes.label,
          classes.truncate,
          {
            [classes.selected]: item.selected,
            [classes.labelIconLeftPadding]: item.leftIcon,
            [classes.noIconLeftPadding]: !item.leftIcon && hasLeftIcons
          }
        ])}
      >
        {item.label}
      </HvTypography>
    );
  };

  renderNavIcon = item => {
    const { theme } = this.props;

    const iconColor = item.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return <DropRight color={["none", iconColor]} />;
  };

  renderLeftIcon = item => {
    const { theme } = this.props;

    const iconColor = item.selected
      ? theme.hv.palette.atmosphere.atmo1
      : theme.hv.palette.accent.acce1;

    return item.leftIcon({ color: ["none", iconColor] });
  };

  render() {
    const { classes, id, multiSelect, useSelector, showSelectAll } = this.props;
    const { list } = this.state;

    return (
      <>
        {multiSelect && useSelector && showSelectAll && this.renderSelectAll()}

        {list && (
          <ul id={id} className={classes.root} role="listbox">
            {list.map(
              (item, i) => !item.isHidden && this.renderListItem(item, i)
            )}
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
     * Styles applied to the list item when disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the list item selector container.
     */
    selectorContainer: PropTypes.string,
    /**
     * Styles applied to the selected list item.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the select all option when multiselect.
     */
    selectAll: PropTypes.string,
    /**
     * Styles applied to the list item icon left padding
     */
    labelIconLeftPadding: PropTypes.string,
    /**
     * Styles applied to the list item padding when no left icon
     */
    noIconLeftPadding: PropTypes.string,
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
   * - disabled: The disabled state of the element.
   * - leftIcon: The icon node to be rendered on the left.
   * - showNavIcon: If true renders the navigation icon on the right.
   * - path: The path to navigate to.
   * - params: The params to pass to the router.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      isHidden: PropTypes.bool,
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
   * Indicates if the router should be used when item has path.
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
  selectable: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /**
   * If ´true´, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /**
   * If ´true´ the list will be rendered without vertical spacing.
   */
  condensed: PropTypes.bool,
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool
};

List.defaultProps = {
  id: "",
  multiSelect: false,
  hasTooltips: false,
  showSelectAll: false,
  labels: DEFAULT_LABELS,
  useSelector: false,
  useRouter: false,
  selectable: true,
  selectDefault: false,
  singleSelectionToggle: true,
  condensed: false,
  onChange() {},
  onClick() {}
};

export default List;
