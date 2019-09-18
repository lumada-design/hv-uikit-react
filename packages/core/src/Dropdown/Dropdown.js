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
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import { isKeypress, KeyboardCodes } from "@hv/uikit-common-utils/dist";
import ArrowUp from "@hv/uikit-react-icons/dist/DawnTheme/DropDown.XS";
import ArrowDown from "@hv/uikit-react-icons/dist/DawnTheme/DropUp.XS";
import HvTypography from "../Typography";
import List from "./List";
import { getSelectionLabel, getSelected } from "./utils";

const DEFAULT_LABELS = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "Selected",
  multiSelectionConjunction: "of"
};

const DEFAULT_STATE = {
  isOpen: false,
  selectionLabel: null,
  anchorEl: null,
  values: [],
  labels: DEFAULT_LABELS
};

class Main extends React.Component {
  state = DEFAULT_STATE;

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.values) {
      const labels = {
        ...DEFAULT_LABELS,
        ...props.labels
      };

      return {
        isOpen: props.expanded,
        selectionLabel: getSelectionLabel(
          props.values,
          labels,
          props.multiSelect
        ),
        anchorEl: null,
        values: props.values,
        labels
      };
    }

    return null;
  }

  /**
   *  Opens and closes the dropdown.
   *
   * @param {Object} evt - the event produced by the click action.
   * @returns {undefined}
   * @memberof Dropdown
   */
  handleToggle(evt) {
    const { disabled } = this.props;
    const { isOpen } = this.state;
    if (evt) evt.stopPropagation();

    // we are checking specifically for false because if "iskeypress" returns true or undefined it should continue
    if (disabled || isKeypress(evt, KeyboardCodes.Enter) === false) return;

    const anchor = evt ? evt.currentTarget : null;

    this.setState({
      isOpen: !isOpen,
      anchorEl: anchor
    });
  }

  /**
   * Applies the selected values to the state
   *
   * @param {Array} selection - An array containing the selected values.
   * @param {Boolean} commitChanges - If `true` the selection if finally committed the dropdown header text should reflect the new selection
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @param {Boolean} notifyChanges -If `true` the dropdown will call onChange.
   * @memberof Main
   */
  handleSelection(selection, commitChanges, toggle, notifyChanges = true) {
    const { multiSelect, onChange } = this.props;
    const { labels } = this.state;
    const selectionLabel = getSelectionLabel(selection, labels, multiSelect);
    const selected = getSelected(selection);

    if (commitChanges) this.setState({ selectionLabel });
    if (toggle) this.handleToggle();
    if (notifyChanges) onChange(multiSelect ? selected : selected[0]);
  }

  renderLabel() {
    const { classes, label, labels } = this.props;
    return <div className={classes.label}>{labels.title || label}</div>;
  }

  renderHeader() {
    const { classes, disabled, theme } = this.props;
    const { isOpen, selectionLabel } = this.state;

    const color = disabled
      ? ["none", theme.hv.palette.atmosphere.atmo7]
      : undefined;

    return (
      <div
        id="header"
        className={classNames([
          classes.header,
          {
            [classes.headerDisabled]: disabled
          }
        ])}
        onKeyDown={evt => this.handleToggle(evt)}
        onClick={evt => this.handleToggle(evt)}
        role="button"
        tabIndex={0}
      >
        <HvTypography
          variant="normalText"
          className={classNames([
            classes.selection,
            classes.truncate,
            {
              [classes.selectionDisabled]: disabled
            }
          ])}
        >
          {selectionLabel}
        </HvTypography>
        {isOpen ? (
          <ArrowDown className={classes.arrow} />
        ) : (
          <ArrowUp className={classes.arrow} color={color} />
        )}
      </div>
    );
  }

  renderList() {
    const {
      multiSelect,
      showSearch,
      selectDefault,
      notifyChangesOnFirstRender,
      disablePortal,
      hasTooltips
    } = this.props;
    const { isOpen, values, labels, anchorEl } = this.state;

    return (
      <List
        values={values}
        multiSelect={multiSelect}
        showSearch={showSearch}
        onChange={(selected, commitChanges, toggle, notifyChanges) =>
          this.handleSelection(selected, commitChanges, toggle, notifyChanges)
        }
        labels={labels}
        selectDefault={selectDefault}
        notifyChangesOnFirstRender={notifyChangesOnFirstRender}
        hasTooltips={hasTooltips}
        disablePortal={disablePortal}
        isOpen={isOpen}
        anchorEl={anchorEl}
      />
    );
  }

  render() {
    const { classes, className, id, label, labels, disabled } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        {label || labels.title ? this.renderLabel() : null}
        <div
          id={id}
          ref={el => {
            this.node = el;
          }}
          className={classNames([
            classes.root,
            {
              [classes.rootDisabled]: disabled,
              [classes.rootActive]: isOpen
            },
            className
          ])}
        >
          {this.renderHeader()}
          {this.renderList()}
        </div>
      </>
    );
  }
}

Main.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component when is open.
     */
    rootActive: PropTypes.string,
    /**
     * Styles applied to the component when is disable.
     */
    rootDisabled: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the header.
     */
    header: PropTypes.string,
    /**
     * Styles applied to the selection
     */
    selection: PropTypes.string,
    /**
     * Styles applied to the arrow
     */
    arrow: PropTypes.string,
    /**
     * Styles applied when the header is disable.
     */
    headerDisabled: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    list: PropTypes.string,
    /**
     * Styles applied when the list is closed.
     */
    listClosed: PropTypes.string,
    /**
     * Styles applied when the list is open.
     */
    open: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied for truncating the list elements.
     */
    truncate: PropTypes.string
  }).isRequired,
  /**
   * Label to display
   * @deprecated Instead use the labels property
   */
  label: deprecatedPropType(
    PropTypes.string,
    "Instead use the labels title property"
  ),
  /**
   * The list to be rendered by the dropdown.
   */
  // needed to disable eslint because:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1751
  // https://github.com/yannickcr/eslint-plugin-react/issues/2028
  // eslint-disable-next-line react/no-unused-prop-types
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool
    })
  ),
  /**
   * If ´true´ the dropdown is multiselect, if ´false´ the dropdown is single select.
   */
  multiSelect: PropTypes.bool,
  /**
   * If ´true´ the dropdown is rendered with a search bar, if ´false´ there won't be a search bar.
   */
  showSearch: PropTypes.bool,
  /**
   * If ´true´ the dropdown is disabled unable to be interacted, if ´false´ it is enabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the dropdown starts opened if ´false´ it starts closed.
   */
  // needed to disable eslint because:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1751
  // https://github.com/yannickcr/eslint-plugin-react/issues/2028
  // eslint-disable-next-line react/no-unused-prop-types
  expanded: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
   */
  onChange: PropTypes.func,
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   *
   * - select: The default when there are no options avaible.
   * - selectAll: The label used for the All checkbox action.
   * - cancelLabel: The label used for the cancel button.
   * - applyLabel: The label used for the apply button.
   * - multiSelectionAction: The label used preceding the multiselection count.
   * - multiSelectionConjunction: The label used in the middle of the multiselection count.
   */
  labels: PropTypes.shape({
    title: PropTypes.string,
    select: PropTypes.string,
    selectAll: PropTypes.string,
    cancelLabel: PropTypes.string,
    applyLabel: PropTypes.string,
    multiSelectionAction: PropTypes.string,
    multiSelectionConjunction: PropTypes.string
  }),
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool
};

Main.defaultProps = {
  className: "",
  id: undefined,
  label: undefined,
  values: null,
  multiSelect: false,
  showSearch: false,
  disabled: false,
  expanded: false,
  onChange() {},
  notifyChangesOnFirstRender: false,
  labels: {},
  selectDefault: true,
  theme: null,
  disablePortal: false,
  hasTooltips: false
};

export default Main;
