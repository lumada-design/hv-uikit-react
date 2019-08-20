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
import Tooltip from "@material-ui/core/Tooltip";
import HvCheckBox from "../../Selectors/CheckBox";
import Search from "../Search";
import Actions from "../Actions";
import HvTypography from "../../Typography";

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
      selectionLabel: selectAll,
      isOverflow: false
    };
  }

  componentWillMount() {
    const { values, notifyChangesOnFirstRender } = this.props;
    if (values) this.resetLists(notifyChangesOnFirstRender);
  }

  /**
   * Apply the selection to the state.
   *
   * @param {Boolean} commitChanges - If `true` the selection if finally committed and should be applied to the state.
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state.
   * @param {Boolean} notifyChanges - If `true` it will execute the onChange function.
   * @memberof List
   */

  setSelection(commitChanges, toggle, notifyChanges = true) {
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
    onChange(selection, commitChanges, toggle, notifyChanges);
  }

  textOnMouseEnter(e) {
    const { isOverflow } = this.state;
    if (!isOverflow && e.target.scrollWidth > e.target.clientWidth)
      this.setState({ isOverflow: true });
  }

  textOnMouseLeave() {
    this.setState({ isOverflow: false });
  }

  /**
   * Reset lists and sets default selections according
   * to dropdown type and values selected.
   * @param {Boolean} notifyChangesOnFirstRender - If `true` it will execute the onChange function.
   */
  resetLists(notifyChangesOnFirstRender = false) {
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
      this.setSelection(true, false, notifyChangesOnFirstRender)
    );
  }

  /**
   * Creates the selection list based on if simple or multiple selection.
   * When multiselect the notificationChange should be set to false.
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
        newElem.selected =
          multiSelect || !selectDefault ? !elem.selected : true;
      }

      return newElem;
    });

    this.setState({ list: newList }, () =>
      this.setSelection(!multiSelect, !multiSelect, !multiSelect)
    );
  }

  /**
   * Select all the values inside the dropdown.
   * When multiselect the notificationChange should be set to false.
   *
   * @memberof List
   */
  handleSelectAll() {
    const { list, allSelected } = this.state;
    const { multiSelect } = this.props;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.selected = !allSelected;
      return newElem;
    });

    this.setState({ list: newList }, () =>
      this.setSelection(false, undefined, !multiSelect)
    );
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
      this.setSelection(true, true, false)
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
      this.setSelection(true, true, true)
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
    const { classes, hasTooltips } = this.props;
    const { isOverflow } = this.state;

    const LabelComponent = props => <div {...props}>{elem.label}</div>;

    return (
      <div
        id="single-select"
        key={key}
        onClick={() => this.handleSelection(elem)}
        onKeyDown={() => this.handleSelection(elem)}
        role="presentation"
      >
        <HvTypography
          variant="normalText"
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
          {hasTooltips && isOverflow ? (
            <Tooltip
              className={classes.truncate}
              disableFocusListener
              disableTouchListener
              title={elem.label}
            >
              <LabelComponent onMouseLeave={() => this.textOnMouseLeave()} />
            </Tooltip>
          ) : (
            <div
              className={classes.truncate}
              onMouseEnter={e => this.textOnMouseEnter(e)}
            >
              {elem.label}
            </div>
          )}
        </HvTypography>
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
        <div className={classes.padding}>
          {showSearch ? this.renderSearch() : null}
        </div>
        <div className={classNames([classes.selectAll, classes.padding])}>
          {multiSelect ? this.renderSelectAll() : null}
        </div>
        <div
          className={classNames([
            classes.list,
            classes.padding,
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
  selectDefault: PropTypes.bool,
  /**
   * If 'true' the dropdown will notify changes everytime it re-renders.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool
};

List.defaultProps = {
  values: [],
  multiSelect: false,
  showSearch: false,
  notifyChangesOnFirstRender: false,
  onChange() {},
  selectDefault: true,
  hasTooltips: false
};

export default List;
