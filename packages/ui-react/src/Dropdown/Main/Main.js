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
import ArrowDown from "@hv-ui/icons/core/XS-icons/AngleUp12";
import ArrowUp from "@hv-ui/icons/core/XS-icons/AngleDown12";
import List from "../List";

const defaultLabels = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelection1: "Selected",
  multiSelection2: "of"
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
      selection: props.multiSelect ? labels.selectAll : labels.select,
      labels
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = evt => {
    if (!this.node.contains(evt.target)) {
      this.setState({ isOpen: false });
    }
  };

  handleToggle(evt) {
    const { disabled } = this.props;
    if (evt) evt.stopPropagation();
    if (disabled) return;

    const isOpen = this.state.isOpen;

    this.setState({
      isOpen: !isOpen
    });
  }

  handleSelection(selection, commitChanges, toggle) {
    const { values, multiSelect, onChange } = this.props;
    const { labels } = this.state;
    const hasSelection = selection.length > 0;
    const isSingleSelection = selection.length === 1;

    let selectionText = multiSelect ? labels.selectAll : labels.select;

    if (commitChanges) {
      if (hasSelection && isSingleSelection) {
        selectionText = selection[0].label;
      } else if (hasSelection && multiSelect) {
        selectionText = `${labels.multiSelection1} ${selection.length} ${
          labels.multiSelection2
        } ${values.length}`;
      }

      this.setState({ selection: selectionText });
    }

    if (toggle) this.handleToggle();

    onChange(multiSelect ? selection : selection[0]);
  }

  render() {
    const {
      classes,
      values,
      label,
      multiSelect,
      showSearch,
      disabled
    } = this.props;

    const { isOpen, selection, labels } = this.state;

    const renderLabel = () => <div className={classes.label}>{label}</div>;

    const renderHeader = () => (
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
          {selection}
        </div>
        {isOpen ? (
          <ArrowDown className={classes.arrow} />
        ) : (
          <ArrowUp className={classes.arrow} />
        )}
      </div>
    );

    const renderList = () => (
      <div
        className={classNames([
          classes.list,
          classes.listClosed,
          {
            [classes.open]: isOpen
          }
        ])}
      >
        <List
          values={values}
          multiSelect={multiSelect}
          isOpen={isOpen}
          showSearch={showSearch}
          onChange={(selected, commitChanges, toggle) =>
            this.handleSelection(selected, commitChanges, toggle)
          }
          labels={labels}
        />
      </div>
    );

    return (
      <React.Fragment>
        {label ? renderLabel() : null}
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
          {renderHeader()}
          {renderList()}
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Label to display
   */
  label: PropTypes.string,
  /**
   * The list to be rendered by the dropdown.
   */
  values: PropTypes.instanceOf(Array),
  /**
   * If the ´true´ the dropdown is multiselect if ´false´ the dropdown is single select.
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
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.instanceOf(Object)
};

Main.defaultProps = {
  label: null,
  values: null,
  multiSelect: false,
  showSearch: false,
  disabled: false,
  expanded: false,
  onChange() {},
  labels: {}
};

export default Main;
