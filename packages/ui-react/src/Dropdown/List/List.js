/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import _ from "lodash";
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

    this.state = {
      list: props.values || [],
      prevList: props.values || [],
      anySelected: false,
      allSelected: false,
      searchStr: ""
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

  setSelection(commitChanges, toggle) {
    const { list, searchStr } = this.state;
    const { onChange } = this.props;
    const selection = getSelection(list);
    const hasSelection = selection.length > 0;
    const isSameSize = selection.length === list.length;

    this.setState({
      anySelected: hasSelection && !isSameSize,
      allSelected: hasSelection && isSameSize,
      searchStr: commitChanges ? "" : searchStr
    });

    onChange(selection, commitChanges, toggle);
  }

  /**
   * Reset lists and sets default selections according
   * to dropdown type and values selected.
   *
   */
  resetLists() {
    const { multiSelect, values } = this.props;
    const hasSelection = getSelection(values).length > 0;

    let allowMulti = true;
    const newList = values.map((elem, i) => {
      const selectFirst = !hasSelection && i === 0;
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

  handleSelection(selectedElem) {
    const { list } = this.state;
    const { multiSelect } = this.props;

    const newList = list.map(elem => {
      const newElem = { ...elem };

      if (!multiSelect) {
        newElem.selected = false;
      }

      if (elem.label === selectedElem.label) {
        newElem.selected = !elem.selected;
      }

      return newElem;
    });

    this.setState({ list: newList }, () =>
      this.setSelection(!multiSelect, !multiSelect)
    );
  }

  handleSelectAll() {
    const { list, allSelected } = this.state;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.selected = !allSelected;
      return newElem;
    });

    this.setState({ list: newList }, () => this.setSelection(false));
  }

  handleSearch(str, results) {
    const { list } = this.state;

    const newList = list.map(elem => {
      const newElem = { ...elem };
      const isResult = results.find(result => result.label === elem.label);
      newElem.isResult = isResult;
      return newElem;
    });

    this.setState({ list: newList, searchStr: str });
  }

  handleCancel() {
    const { prevList } = this.state;

    this.setState({ list: prevList, searchStr: "" }, () =>
      this.setSelection(true, true)
    );
  }

  handleApply() {
    const { list } = this.state;

    this.setState({ prevList: list, searchStr: "" }, () =>
      this.setSelection(true, true)
    );
  }

  render() {
    const { classes, values, multiSelect, showSearch, labels } = this.props;
    const { list, anySelected, allSelected, searchStr } = this.state;

    const renderSearch = () => (
      <Search
        value={searchStr}
        values={values}
        onChange={(str, results) => this.handleSearch(str, results)}
      />
    );

    const renderMultiSelect = (key, elem) => (
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

    const renderSingleSelect = (key, elem) => (
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

    const renderSelectAll = () => (
      <HvCheckBox
        label={labels.selectAll}
        onChange={() => this.handleSelectAll()}
        classes={{ container: classes.selection }}
        className={classNames([classes.selectAll])}
        indeterminate={anySelected}
        checked={allSelected}
      />
    );

    const renderActions = () => (
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

    const renderList = () =>
      list.map((elem, i) =>
        multiSelect ? renderMultiSelect(i, elem) : renderSingleSelect(i, elem)
      );

    return (
      <div className={classes.root}>
        <div className={classes.paddingRight}>
          {showSearch ? renderSearch() : null}
        </div>
        <div className={classNames([classes.selectAll, classes.paddingRight])}>
          {multiSelect ? renderSelectAll() : null}
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
          {list ? renderList() : null}
        </div>
        {multiSelect ? renderActions() : null}
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
  labels: PropTypes.instanceOf(Object).isRequired
};

List.defaultProps = {
  values: [],
  multiSelect: false,
  showSearch: false,
  onChange() {}
};

export default List;
