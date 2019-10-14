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
import find from "lodash/find";
import isNil from "lodash/isNil";
import findIndex from "lodash/findIndex";
import MultiButton from "./Multibutton/Multibutton";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Grid from "../Grid";

/**
 * Asset inventory component.
 */
class AssetInventory extends React.Component {
  constructor(props) {
    super(props);
    const { values } = this.props;
    this.state = {
      selectedViewIndex: 0,
      viewValues: values
    };
  }

  /**
   * Change between views.
   *
   * @param id a array with the selected ids.
   */
  changeView = id => {
    const { children } = this.props;
    const selectedId = id[0];

    this.setState({
      selectedViewIndex: findIndex(
        children,
        element => element.props.id === selectedId
      )
    });
  };

  /**
   * Set the values to be shown in the views.
   *
   * @param returnedViewValues
   */
  setViewValues = returnedViewValues =>
    this.setState({ viewValues: returnedViewValues });

  /**
   * Show the search component.
   *
   * @returns {*}
   */
  renderSearch = () => {
    const { values, classes, searchBoxLabels, configuration } = this.props;
    return (
      <div className={classes.searchBoxContainer}>
        <Search
          values={values}
          metadata={configuration.metadata}
          onFilter={this.setViewValues}
          searchBoxLabels={searchBoxLabels}
        />
      </div>
    );
  };

  /**
   * Sort the view values according the received sort function.
   *
   * @param sortFunc
   */
  onSort = sortFunc => {
    const { viewValues } = this.state;
    viewValues.sort(sortFunc);

    this.setViewValues(viewValues);
  };

  /**
   * Show the sort component.
   *
   * @returns {*}
   */
  renderSort = () => {
    const { id, labels, configuration, classes } = this.props;
    const dropDownLabel = {
      title: labels.sortBy
    };
    return (
      <div className={classes.sortContainer}>
        <Sort
          id={id}
          labels={dropDownLabel}
          metadata={configuration.metadata}
          onSelection={this.onSort}
        />
      </div>
    );
  };

  /**
   * Auxiliary function.
   *
   * @param source
   * @param target
   * @param propName
   * @param value
   */
  propsFiller = (source, target, propName, value) => {
    if (isNil(source.props[propName])) {
      // eslint-disable-next-line no-param-reassign
      target[propName] = value;
    }
  };

  /**
   * Pass the props on the component into the children's.
   *
   * @param child
   */
  fillChildProp(child) {
    const {
      onSelection,
      isSelectable,
      actions,
      maxVisibleActions,
      actionsCallback,
      configuration
    } = this.props;

    let childProps = {};

    if (!isNil(configuration) && !isNil(configuration.viewConfiguration)) {
      childProps = { ...configuration.viewConfiguration };
    }
    if (!isNil(child.props) && !isNil(child.props.viewConfiguration)) {
      childProps = { ...child.props.viewConfiguration };
    }

    this.propsFiller(child, childProps, "onSelection", onSelection);

    this.propsFiller(child, childProps, "isSelectable", isSelectable);

    this.propsFiller(child, childProps, "actions", actions);

    this.propsFiller(child, childProps, "maxVisibleActions", maxVisibleActions);

    this.propsFiller(child, childProps, "actionsCallback", actionsCallback);

    return childProps;
  }

  /**
   * Render the view.
   *
   * @returns {*}
   */
  renderView() {

    const { selectedViewIndex, viewValues } = this.state;
    const { children } = this.props;

    const view = Array.isArray(children)
      ? children[selectedViewIndex]
      : children;

    const childProps = this.fillChildProp(view);

    return React.cloneElement(view, {
      values: viewValues,
      viewConfiguration: childProps
    });
  }

  /**
   * Render the passed filter placeholder.
   *
   * @returns {*}
   */
  renderFilterPlaceholder() {
    const { FilterPlaceholder } = this.props;

    return <FilterPlaceholder onSelection={this.setViewValues} />;
  }

  render() {
    const {
      classes,
      className,
      id,
      FilterPlaceholder,
      children,
      configuration
    } = this.props;

    const showButtons = children.length > 1;
    const showSort = find(configuration.metadata, element => element.sortable);
    const showSearch = find(
      configuration.metadata,
      element => element.searchable
    );
    const showRightControls = showButtons || showSort;
    const views = [];

    const align = !showSearch ? "flex-end" : "space-between";

    React.Children.forEach(children, child =>
      views.push({ id: child.props.id, icon: child.props.icon })
    );

    return (
      <div id={id} className={className}>
        {FilterPlaceholder && this.renderFilterPlaceholder()}
        <Grid container spacing={0}>
          <Grid container justify={align} alignItems="flex-end">
            {showSearch && <Grid item>{this.renderSearch()}</Grid>}
            {showRightControls && (
              <Grid item>
                <Grid container alignItems="flex-end" spacing={0}>
                  {showSort && <Grid item>{this.renderSort()}</Grid>}
                  {showButtons && (
                    <Grid item>
                      <div className={classes.multiButtons}>
                        <MultiButton
                          views={views}
                          changeView={this.changeView}
                        />
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
          <div className={classes.viewContainer}>{this.renderView()}</div>
        </Grid>
      </div>
    );
  }
}

AssetInventory.propTypes = {
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
     * Styles applied to the controls container.
     */
    controlsContainer: PropTypes.string,
    /**
     * Styles applied to the search container.
     */
    search: PropTypes.string,
    /**
     * Styles applied to the right controls container.
     */
    rightControls: PropTypes.string,
    /**
     *  Styles applied to the multiButtons.
     */
    multiButtons: PropTypes.string,
    /**
     * Styles applied to the view container.
     */
    viewContainer: PropTypes.string
  }).isRequired,
  /**
   * Views components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  /**
   * Data passed to the component.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ).isRequired,
  /**
   * Labels.
   */
  labels: PropTypes.shape({
    sortBy: PropTypes.string
  }),
  /**
   * Contains the metadata for the values and the necessary configuration for the views,
   * check the views for the specific view configuration.
   */
  configuration: PropTypes.shape({
    metadata: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        accessor: PropTypes.string,
        cellType: PropTypes.oneOf(["alpha-numeric", "numeric", "date", "node"]),
        sortable: PropTypes.bool,
        sortFunction: PropTypes.func,
        searchable: PropTypes.bool,
        searchFunction: PropTypes.func
      })
    ).isRequired,
    viewConfiguration: PropTypes.instanceOf(Object)
  }).isRequired,
  /**
   * Callback evoked in the selection of the card.
   */
  onSelection: PropTypes.func,
  /**
   * List of actions to be passed to the views.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.func,
      disabled: PropTypes.bool
    })
  ),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number,
  /**
   * Extra filters
   */
  FilterPlaceholder: PropTypes.element,
  /**
   * Indicates if the views are selectable.
   */
  isSelectable: PropTypes.bool,
  /**
   * An Object containing the various text associated with the searchbox.
   *
   * - inputLabel: the label on top of the searchbox.
   * - placeholder: the placeholder value of the searchbox.
   */
  searchBoxLabels: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string
  })
};

AssetInventory.defaultProps = {
  className: "",
  id: undefined,
  labels: {
    sortBy: "Sort by"
  },
  FilterPlaceholder: null,
  onSelection: null,
  actions: null,
  actionsCallback: null,
  maxVisibleActions: 1,
  isSelectable: false,
  searchBoxLabels: {
    inputLabel: "",
    placeholder: "Search"
  }
};

export default AssetInventory;
