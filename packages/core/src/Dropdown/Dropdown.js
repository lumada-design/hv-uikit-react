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
import ArrowUp from "@hv/uikit-react-icons/dist/DropDown.XS";
import ArrowDown from "@hv/uikit-react-icons/dist/DropUp.XS";
import List from "./List";

const defaultLabels = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "Selected",
  multiSelectionConjunction: "of"
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    const labels = {
      ...defaultLabels,
      ...props.labels
    };

    this.state = {
      isOpen: props.expanded,
      selectionLabel: props.multiSelect ? labels.selectAll : labels.select,
      labels
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  /**
   *  Closes the dropdown whenever there is a click outside the document.
   *
   * @param {Object} evt - the event produced by clicking outside.
   */
  handleClickOutside = evt => {
    if (!this.node.contains(evt.target)) {
      this.setState({ isOpen: false });
    }
  };

  /**
   *  Opens and closes the dropdown
   *
   * @param {Object} evt - the event produced by the click action.
   * @returns {undefined}
   * @memberof Main
   */
  handleToggle(evt) {
    const { disabled } = this.props;
    const { isOpen } = this.state;

    if (evt) evt.stopPropagation();
    if (disabled) return;

    this.setState({
      isOpen: !isOpen
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
    const { values, multiSelect, onChange } = this.props;
    const { labels } = this.state;
    const hasSelection = selection.length > 0;
    const isSingleSelection = selection.length === 1;

    let selectionLabel = multiSelect ? labels.selectAll : labels.select;

    if (commitChanges) {
      if (hasSelection && isSingleSelection) {
        selectionLabel = selection[0].label;
      } else if (hasSelection && multiSelect) {
        selectionLabel = `${labels.multiSelectionAction} ${selection.length} ${
          labels.multiSelectionConjunction
        } ${values.length}`;
      }

      this.setState({ selectionLabel });
    }

    if (toggle) this.handleToggle();
    if (notifyChanges) onChange(multiSelect ? selection : selection[0]);
  }

  renderLabel() {
    const { classes, label } = this.props;

    return <div className={classes.label}>{label}</div>;
  }

  renderHeader() {
    const { classes, disabled } = this.props;
    const { isOpen, selectionLabel } = this.state;

    return (
      <div
        id="header"
        className={classNames([
          classes.header,
          {
            [classes.headerDisabled]: disabled
          }
        ])}
        onClick={evt => this.handleToggle(evt)}
        role="presentation"
      >
        <div className={classNames([classes.selection, classes.truncate])}>
          {selectionLabel}
        </div>
        {isOpen ? (
          <ArrowDown className={classes.arrow} />
        ) : (
          <ArrowUp className={classes.arrow} />
        )}
      </div>
    );
  }

  renderList() {
    const {
      classes,
      values,
      multiSelect,
      showSearch,
      selectDefault,
      notifyChangesOnFirstRender
    } = this.props;
    const { isOpen, labels } = this.state;

    return (
      <div
        className={classNames([
          classes.list,
          classes.listClosed,
          {
            [classes.listOpen]: isOpen
          }
        ])}
      >
        <List
          values={values}
          multiSelect={multiSelect}
          isOpen={isOpen}
          showSearch={showSearch}
          onChange={(selected, commitChanges, toggle, notifyChanges) =>
            this.handleSelection(selected, commitChanges, toggle, notifyChanges)
          }
          labels={labels}
          selectDefault={selectDefault}
          notifyChangesOnFirstRender={notifyChangesOnFirstRender}
        />
      </div>
    );
  }

  render() {
    const { classes, label, disabled } = this.props;

    const { isOpen } = this.state;

    return (
      <React.Fragment>
        {label ? this.renderLabel() : null}
        <div
          className={classNames([
            classes.root,
            {
              [classes.rootDisabled]: disabled,
              [classes.rootActive]: isOpen
            }
          ])}
          ref={el => {
            this.node = el;
          }}
        >
          {this.renderHeader()}
          {this.renderList()}
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
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
   */
  label: PropTypes.string,
  /**
   * The list to be rendered by the dropdown.
   */
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
  expanded: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
   */
  onChange: PropTypes.func,
  /**
   * If 'true' the dropdown will notify changes everytime it re-renders.
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
  selectDefault: PropTypes.bool
};

Main.defaultProps = {
  label: null,
  values: null,
  multiSelect: false,
  showSearch: false,
  disabled: false,
  expanded: false,
  onChange() {},
  notifyChangesOnFirstRender: false,
  labels: {},
  selectDefault: true
};

export default Main;
