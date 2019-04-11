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
import HvCheckBox from "../../Selectors/CheckBox";
import Search from "../Search";
import Actions from "../Actions";

const getSelection = list => (list ? list.filter(elem => elem.selected) : null);

class List extends React.Component {
  constructor(props) {
    super(props);

    const { selectAll } = props.labels;

    this.state = {
      list: props.values || [],
      prevList: props.values || [],
      anySelected: false,
      allSelected: false,
      searchStr: "",
      selectionLabel: selectAll
    };
  }

  componentWillMount() {
    const { values } = this.props;
    if (values) this.resetLists();
  }

  componentWillReceiveProps(nextProps) {
    const { values } = this.props;
    if (nextProps.values !== values) {
      this.setState({ list: values }, () => this.resetLists());
    }
  }

  /**
   * Apply the selection to the state.
   *
   * @param {Boolean} commitChanges - If `true` the selection if finally committed and should be applied to the state.
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @memberof List
   */

  setSelection(commitChanges, toggle) {
    const { list, searchStr } = this.state;
    const { onChange, labels } = this.props;
    const { selectAll, multiSelectionConjunction } = labels;
    const selection = getSelection(list);
    const hasSelection = selection.length > 0;
    const allSelected = selection.length === list.length;

    this.setState({
      anySelected: hasSelection && !allSelected,
      allSelected: hasSelection && allSelected,
      searchStr: commitChanges ? "" : searchStr
    });

    if (commitChanges) {
      this.setState({
        selectionLabel: !hasSelection
          ? selectAll
          : `${selection.length} ${multiSelectionConjunction} ${list.length}`
      });
    }

    onChange(selection, commitChanges, toggle);
  }

  /**
   * Reset lists and sets default selections according
   * to dropdown type and values selected.
   *
   */
  resetLists() {
    const { multiSelect, values, selectDefault } = this.props;
    const hasSelection = getSelection(values).length > 0;

    let allowMulti = true;
    const newList = values.map((elem, i) => {
      const selectFirst = selectDefault && !hasSelection && i === 0;
      const selectMultiple = allowMulti && elem.selected;

      const newElem = {
        ...elem,
        selected: selectFirst || selectMultiple || false,
        isResult: true
      };

      if (!multiSelect && elem.selected) allowMulti = false;

      return newElem;
    });

    this.setState({ list: newList, prevList: newList }, () =>
      this.setSelection(true)
    );
  }

  /**
   * Creates the selection list based on if simple or multiple selection.
   *
   * @param {Object} selectedElem - The element that was selected by the user.
   * @memberof List
   */
  handleSelection(selectedElem) {
    const { list } = this.state;
    const { multiSelect, selectDefault } = this.props;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      const selectionKey = elem.id ? "id" : "label";

      if (!multiSelect) {
        newElem.selected = false;
      }

      if (elem[selectionKey] === selectedElem[selectionKey]) {
        newElem.selected = multiSelect || !selectDefault ? !elem.selected : true;
      }

      return newElem;
    });

    this.setState({ list: newList }, () =>
      this.setSelection(!multiSelect, !multiSelect)
    );
  }

  /**
   * Select all the values inside the dropdown.
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

    this.setState({ list: newList }, () => this.setSelection(false));
  }

  /**
   * Sets the filtered values to the state.
   *
   * @param {String} str - The value that is being looked.
   * @param {Array} results - The result set it produced.
   * @memberof List
   */
  handleSearch(str, results) {
    const { list } = this.state;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.isResult = results.find(result => result.label === elem.label);
      return newElem;
    });

    this.setState({ list: newList, searchStr: str });
  }

  /**
   * Cancel the selection in case of no commit reverting the state to it's previous iteration.
   *
   * @memberof List
   */
  handleCancel() {
    const { prevList } = this.state;

    this.setState({ list: prevList, searchStr: "" }, () =>
      this.setSelection(true, true)
    );
  }

  /**
   * Commits the temporary selection to the state.
   *
   * @memberof List
   */
  handleApply() {
    const { list } = this.state;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.isResult = true;
      return newElem;
    });

    this.setState({ prevList: newList, searchStr: "" }, () =>
      this.setSelection(true, true)
    );
  }

  renderSearch() {
    const { values } = this.props;
    const { searchStr } = this.state;

    return (
      <Search
        value={searchStr}
        values={values}
        onChange={(str, results) => this.handleSearch(str, results)}
      />
    );
  }

  renderSelectAll() {
    const { classes } = this.props;
    const { anySelected, allSelected, selectionLabel } = this.state;

    return (
      <HvCheckBox
        label={selectionLabel}
        onChange={() => this.handleSelectAll()}
        classes={{ container: classes.selection }}
        className={classNames([classes.selectAll])}
        indeterminate={anySelected}
        checked={allSelected}
      />
    );
  }

  renderList() {
    const { multiSelect } = this.props;
    const { list } = this.state;

    return list.map((elem, i) =>
      multiSelect
        ? this.renderMultiSelect(i, elem)
        : this.renderSingleSelect(i, elem)
    );
  }

  renderMultiSelect(key, elem) {
    const { classes } = this.props;

    return (
      <div
        id="multi-select"
        key={key}
        className={classNames([
          classes.hidden,
          classes.multiSelection,
          {
            [classes.result]: elem.isResult
          }
        ])}
      >
        <HvCheckBox
          label={elem.label}
          onChange={() => this.handleSelection(elem)}
          checked={elem.selected}
          classes={{
            container: classes.selection,
            labelTypography: classes.truncate
          }}
        />
      </div>
    );
  }

  renderSingleSelect(key, elem) {
    const { classes } = this.props;

    return (
      <div
        id="single-select"
        key={key}
        onClick={() => this.handleSelection(elem)}
        onKeyDown={() => this.handleSelection(elem)}
        role="presentation"
        className={classNames([
          classes.hidden,
          classes.singleSelection,
          classes.truncate,
          {
            [classes.selected]: elem.selected
          },
          {
            [classes.result]: elem.isResult
          }
        ])}
      >
        {elem.label}
      </div>
    );
  }

  renderActions() {
    const { classes, labels } = this.props;
    return (
      <div className={classes.actions}>
        <Actions
          onCancel={() => this.handleCancel()}
          onApply={() => this.handleApply()}
          labels={labels}
          cancelLabel={labels.cancelLabel}
          applyLabel={labels.applyLabel}
        />
      </div>
    );
  }

  render() {
    const { classes, multiSelect, showSearch } = this.props;
    const { list } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.paddingRight}>
          {showSearch ? this.renderSearch() : null}
        </div>
        <div className={classNames([classes.selectAll, classes.paddingRight])}>
          {multiSelect ? this.renderSelectAll() : null}
        </div>
        <div
          className={classNames([
            classes.list,
            classes.paddingRight,
            {
              [classes.marginBottom]: !multiSelect
            }
          ])}
        >
          {list ? this.renderList() : null}
        </div>
        {multiSelect ? this.renderActions() : null}
      </div>
    );
  }
}

List.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The list to be rendered.
   */
  values: PropTypes.instanceOf(Array),
  /**
   * If true renders a multi select list.
   */
  multiSelect: PropTypes.bool,
  /**
   * If true renders the search component.
   */
  showSearch: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the list.
   */
  onChange: PropTypes.func,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.instanceOf(Object).isRequired,
  /**
   * If ´true´ and none element selected, 
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool
};

List.defaultProps = {
  values: [],
  multiSelect: false,
  showSearch: false,
  onChange() {},
  selectDefault: true
};

export default List;
