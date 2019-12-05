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
import isEqual from "lodash/isEqual";
import uniqueId from "lodash/uniqueId";
import sort from "lodash/sortBy";
import findIndex from "lodash/findIndex";
import MultiButton from "./Multibutton/Multibutton";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import Grid from "../Grid";
import Pagination from "../Pagination";

/**
 * Asset inventory component.
 */
class AssetInventory extends React.Component {
  static areArraysEquals(a1, a2) {
    return isEqual(sort(a1), sort(a2));
  }

  constructor(props) {
    super(props);
    const {
      id,
      values,
      pageSizeOptions,
      page,
      pageSize,
      selectedValues
    } = this.props;
    const innerPageSize = pageSize || pageSizeOptions[0];
    const viewValues = this.getPaginationData(values, innerPageSize, page);

    this.state = {
      internalId: id || uniqueId("hv-assetinventory-"),
      selectedViewIndex: 0,
      pageSize: innerPageSize,
      page,
      // original values to compare in the getDerivedStateFromProps
      originalValues: values.slice(),
      // Data for manipulation (search and sorts)
      values: values.slice(),
      // Data shown in the "window"
      viewValues,
      // original selectedValues
      originalSelectedValues: selectedValues.slice(),
      // Values already selected
      selectedValues: selectedValues.slice()
    };
  }

  /**
   * Update the values with the new received.
   *
   * @param props
   * @param state
   * @returns {{originalValues: *}|null}
   */
  static getDerivedStateFromProps(props, state) {
    if (
      !AssetInventory.areArraysEquals(props.values, state.originalValues) ||
      !AssetInventory.areArraysEquals(
        props.selectedValues,
        state.originalSelectedValues
      )
    ) {
      return {
        originalValues: props.values,
        values: props.values,
        viewValues: props.values,
        page: props.page,
        selectedValues: !AssetInventory.areArraysEquals(
          props.selectedValues,
          state.originalSelectedValues
        )
          ? props.selectedValues
          : state.selectedValues,
        pageSize: props.pageSize
      };
    }
    return null;
  }

  /**
   * Sets the data that is shown in the component, for the case of the use of pagination.
   *
   * @param values
   * @param pageSize
   * @returns {*}
   */
  getPaginationData = (values, pageSize, page) => {
    const { hasPagination, paginationServerSide } = this.props;
    return hasPagination && !paginationServerSide
      ? values.slice(pageSize * page, pageSize * (page + 1))
      : values;
  };

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
  setViewValues = returnedViewValues => {
    const { pageSize, page } = this.state;
    this.setState({
      viewValues: this.getPaginationData(returnedViewValues, pageSize, page)
    });
  };

  /**
   * Set the return results to the values states. The page has to change to 0, so the pagination can start over.
   *
   * @param results
   */
  setSearchResults = results => {
    this.setState({ values: results, page: 0 });
    this.setViewValues(results);
  };

  /**
   * Show the search component.
   *
   * @returns {*}
   */
  renderSearch = () => {
    const {
      values,
      classes,
      searchBoxLabels,
      configuration,
      onSearch
    } = this.props;
    return (
      <div className={classes.searchBoxContainer}>
        <Search
          values={values}
          metadata={configuration.metadata}
          onFilter={this.setSearchResults}
          onSearch={onSearch}
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
    const { values } = this.state;
    values.sort(sortFunc);
    this.setViewValues(values);
  };

  /**
   * Show the sort component.
   *
   * @returns {*}
   */
  renderSort = () => {
    const {  labels, configuration, classes, onSort } = this.props;
    const { internalId } = this.state;
    const dropDownLabel = {
      title: labels.sortBy
    };
    return (
      <div className={classes.sortContainer}>
        <Sort
          id={internalId}
          labels={dropDownLabel}
          metadata={configuration.metadata}
          onSelection={this.onSort}
          onSort={onSort}
        />
      </div>
    );
  };

  /**
   * Pagination on page change when no server side pagination.
   *
   * @param page
   */
  paginationOnPageChange = page => {
    const { values, pageSize } = this.state;

    const pageData = values.slice(pageSize * page, pageSize * (page + 1));

    this.setState({
      page,
      viewValues: pageData
    });
  };

  /**
   * Pagination on page size change when no server side pagination.
   *
   * @param newPageSize
   */
  paginationOnPageSizeChange = newPageSize => {
    const { values, page } = this.state;

    const pageData = values.slice(newPageSize * page, newPageSize * (page + 1));

    this.setState({
      pageSize: newPageSize,
      viewValues: pageData
    });
  };

  /**
   * Pagination render.
   *
   * @returns {*}
   */
  renderPagination = () => {
    const {
      paginationServerSide,
      pages,
      pageSizeOptions,
      classes,
      onPageChange,
      onPageSizeChange
    } = this.props;

    const { internalId, pageSize, page, values } = this.state;

    const numPages = paginationServerSide
      ? pages
      : Math.ceil(values.length / pageSize);

    const onPageChangeInternal = paginationServerSide
      ? onPageChange
      : this.paginationOnPageChange;

    const onPageSizeChangeInternal = paginationServerSide
      ? onPageSizeChange
      : this.paginationOnPageSizeChange;

    return (
      <Pagination
        id={internalId}
        classes={{
          root: classes.pagination
        }}
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChangeInternal}
        onPageSizeChange={onPageSizeChangeInternal}
        labels={{ pageSizeEntryName: "assets" }}
      />
    );
  };

  /**
   * Updates the selectedValues list in each interaction, calling the onSelection passed by props.
   *
   * @param onSelection
   * @returns {function(...[*]=)}
   */
  innerOnSelection = onSelection => event => {
    const { selectedValues } = this.state;
    const id = event.target.value;

    let list;
    if (event.target.checked) {
      list = [...selectedValues, id];
    } else {
      const index = selectedValues.indexOf(id);
      if (index > -1) {
        list = selectedValues.filter(item => item !== id);
      }
    }
    this.setState({ selectedValues: list });
    onSelection(event);
  };

  /**
   * Auxiliary function.
   *
   * @param source
   * @param target
   * @param props
   */
  propsFillerManager = (source, target, props) => {
    props.forEach(prop => this.propsFiller(source, target, prop[0], prop[1]));
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

    this.propsFillerManager(child, childProps, [
      ["onSelection", this.innerOnSelection(onSelection)],
      ["isSelectable", isSelectable],
      ["actions", actions],
      ["maxVisibleActions", maxVisibleActions],
      ["actionsCallback", actionsCallback]
    ]);

    return childProps;
  }

  /**
   * Render the view.
   *
   * @returns {*}
   */
  renderView() {
    const { selectedViewIndex, viewValues, selectedValues } = this.state;
    const { children } = this.props;

    const view = Array.isArray(children)
      ? children[selectedViewIndex]
      : children;

    const childProps = this.fillChildProp(view);

    return React.cloneElement(view, {
      values: viewValues,
      selectedValues,
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
      FilterPlaceholder,
      children,
      configuration,
      hasPagination
    } = this.props;

    const { internalId } = this.state;

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

    const pagination = this.renderPagination();

    return (
      <div id={internalId} className={className}>
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
                          id={internalId}
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
          {hasPagination && (
            <Grid container>
              <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
                {pagination}
              </Grid>
            </Grid>
          )}
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
   * An Object containing the various text associated with the search box.
   *
   * - inputLabel: the label on top of the search box.
   * - placeholder: the placeholder value of the search box.
   */
  searchBoxLabels: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string
  }),
  /**
   * Values selected. The list can be maintain internally or it can be passed (overwriting the internal).
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * Defines if it has pagination.
   */
  hasPagination: PropTypes.bool,
  /**
   * Enable or disable the server side pagination mechanism
   */
  paginationServerSide: PropTypes.bool,
  /**
   * The array of possible page sizes for the dropdown.
   */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * Page size.
   */
  pageSize: PropTypes.number,
  /**
   * The currently selected page (0-indexed).
   */
  page: PropTypes.number,
  /**
   * The number of pages the component has.
   */
  pages: PropTypes.number,
  /**
   * Page change callback.
   */
  onPageChange: PropTypes.func,
  /**
   * Page size change callback.
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Search callback.
   */
  onSearch: PropTypes.func,
  /**
   * Sort callback.
   */
  onSort: PropTypes.func
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
  },
  selectedValues: [],
  hasPagination: false,
  paginationServerSide: false,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  page: 0,
  pages: 0,
  onPageChange: null,
  onPageSizeChange: null,
  pageSize: undefined,
  onSearch: null,
  onSort: null
};

export default AssetInventory;
