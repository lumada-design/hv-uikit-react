import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import find from "lodash/find";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import MultiButton from "./Multibutton/Multibutton";
import Search from "./Search/Search";
import Sort from "./Sort/Sort";
import HvGrid from "../Grid";
import HvPagination from "../Pagination";
import HvBulkActions from "../BulkActions";
import styles from "./styles";
import { setId, useLabels } from "../utils";

const DEFAULT_LABELS = {
  sortBy: "Sort by",
  inputLabel: "",
  placeholder: "Search",
};

const getPaginationData = (hasPagination, paginationServerSide, values, pageSize, page) =>
  hasPagination && !paginationServerSide
    ? values.slice(pageSize * page, pageSize * (page + 1))
    : values;

/**
 * An Asset Inventory allows to switch between views.
 * The Sort and Filter are defined using the metadata configuration, while the remaining configuration can be ser in the AssetInventory or in the individual views.
 */
const HvAssetInventory = (props) => {
  const {
    id,
    classes,
    className,
    values: valuesProp,
    selectedValues: selectedValuesProp = [],
    selectedView: selectedViewProp = 0,
    children,
    searchString: searchStringProp = "",
    sortOptionId,
    labels: labelsProp,
    configuration,
    onSearch,
    searchProps,
    onSortChange,
    disablePortal = false,
    sortProps,
    page: pageProp = 0,
    pages = 0,
    pageSize: pageSizeProp,
    pageSizeOptions = [5, 10, 20, 25, 50, 100],
    hasBulkActions = false,
    hasPagination = false,
    paginationServerSide = false,
    paginationProps,
    onPageChange,
    onPageSizeChange,
    onSelection,
    isSelectable = false,
    actions,
    maxVisibleActions = 1,
    actionsCallback,
    FilterPlaceholder,
    onViewChange,
    multibuttonProps = [],
    emptyComponent = null,
  } = props;

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const innerPageSize = pageSizeProp || pageSizeOptions[0];
  const innerPageValues = getPaginationData(
    hasPagination,
    paginationServerSide,
    valuesProp,
    innerPageSize,
    pageProp
  );

  const [selectedView, setSelectedView] = useState(selectedViewProp || 0);
  const [pageSize, setPageSize] = useState(innerPageSize);
  const [page, setPage] = useState(pageProp);
  const [values, setValues] = useState([...valuesProp]);
  const [pageValues, setPageValues] = useState(innerPageValues);

  const [selectedValues, setSelectedValues] = useState([...selectedValuesProp]);
  const [searchString, setSearchString] = useState(searchStringProp);
  const [selectedSort, setSelectedSort] = useState({ sortId: sortOptionId, sortFunc: undefined });

  useEffect(() => {
    setValues(valuesProp);
    setPageValues(
      getPaginationData(hasPagination, paginationServerSide, valuesProp, innerPageSize, pageProp)
    );
    setPage(pageProp);
  }, [valuesProp, pageProp, innerPageSize, hasPagination, paginationServerSide]);

  useEffect(() => {
    setPageSize(pageSizeProp);
  }, [pageSizeProp]);

  useEffect(() => {
    if (selectedValuesProp.length > 0) setSelectedValues(selectedValuesProp);
  }, [selectedValuesProp]);

  useEffect(() => {
    setSelectedView(selectedViewProp);
  }, [selectedViewProp]);

  useEffect(() => {
    setSelectedSort(sortOptionId);
  }, [sortOptionId]);

  useEffect(() => {
    setSearchString(searchStringProp);
  }, [searchStringProp]);

  const changeView = (_event, viewIndex) => {
    setSelectedView(viewIndex);
  };

  const changePageValues = useCallback(
    (returnedPageValues) => {
      setPageValues(
        getPaginationData(hasPagination, paginationServerSide, returnedPageValues, pageSize, page)
      );
    },
    [hasPagination, paginationServerSide, pageSize, page]
  );

  useEffect(() => {
    if (!(selectedSort?.sortId && selectedSort?.sortFunc)) return;
    const sortedValues = [...valuesProp].sort(selectedSort.sortFunc);
    setValues(sortedValues);
    changePageValues(sortedValues);
  }, [selectedSort, valuesProp, changePageValues]);

  const setSearchResults = (results, value) => {
    setValues(results);
    setPage(0);
    setSearchString(value);
    changePageValues(results);
  };

  /**
   * Show the search component.
   *
   * @returns {*}
   */
  const renderSearch = () => {
    const { inputLabel, placeholder } = labels;
    return (
      <div className={classes.searchBoxContainer}>
        <Search
          id={id}
          searchString={searchString}
          values={valuesProp}
          metadata={configuration.metadata}
          onFilter={setSearchResults}
          onSearch={onSearch}
          labels={{ inputLabel, placeholder }}
          {...searchProps}
        />
      </div>
    );
  };

  const onSort = (sortFunc, sortId) => {
    setSelectedSort({ sortId, sortFunc });
  };

  const renderSort = () => {
    return (
      <div className={classes.sortContainer}>
        <Sort
          id={id}
          aria-label={labels?.sortBy}
          metadata={configuration?.metadata}
          selected={selectedSort?.sortId}
          onSelection={onSort}
          onSortChange={onSortChange}
          disablePortal={disablePortal}
          {...sortProps}
        />
      </div>
    );
  };

  const paginationOnPageChange = (newPage) => {
    const pageData = values.slice(pageSize * newPage, pageSize * (newPage + 1));

    setPage(newPage);
    setPageValues(pageData);
  };

  const paginationOnPageSizeChange = (newPageSize) => {
    const pageData = values.slice(newPageSize * page, newPageSize * (page + 1));

    setPageSize(newPageSize);
    setPageValues(pageData);
  };

  const renderPagination = () => {
    if (values.length === 0) return null;

    const numPages = paginationServerSide ? pages : Math.ceil(values.length / pageSize);
    const onPageChangeInternal = paginationServerSide ? onPageChange : paginationOnPageChange;

    const onPageSizeChangeInternal = paginationServerSide
      ? onPageSizeChange
      : paginationOnPageSizeChange;

    return (
      <HvPagination
        id={setId(id, "pagination")}
        classes={{
          root: classes.pagination,
        }}
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChangeInternal}
        onPageSizeChange={onPageSizeChangeInternal}
        {...paginationProps}
      />
    );
  };

  const handleSelectPage = (e, checked = false) => {
    setSelectedValues(checked ? [] : pageValues.map((v) => v.id));
  };

  const handleSelectAll = () => {
    const allSelected = selectedValues.length === values.length;
    setSelectedValues(allSelected ? [] : values.map((v) => v.id));
  };

  const innerOnSelection = (onSelectionFn) => (event) => {
    const valueId = event.target.value;

    const list =
      (event.target.checked && [...selectedValues, valueId]) ||
      (selectedValues.includes(valueId) && selectedValues.filter((item) => item !== valueId)) ||
      [];

    setSelectedValues(list);
    onSelectionFn?.(event);
  };

  const propsFillerManager = (source, target, propObj) => {
    Object.keys(propObj).forEach((key) => {
      // eslint-disable-next-line no-param-reassign
      if (source.props[key] == null) target[key] = propObj[key];
    });
  };

  const fillChildProp = (child) => {
    const childProps = {
      ...(configuration?.viewConfiguration || child?.props?.viewConfiguration),
    };

    propsFillerManager(child, childProps, {
      onSelection: innerOnSelection(onSelection),
      isSelectable,
      actions,
      maxVisibleActions,
      actionsCallback,
    });

    return childProps;
  };

  /**
   * Render the view.
   *
   * @returns {*}
   */
  const renderView = () => {
    const view = Array.isArray(children) ? children[selectedView] : children;

    if (values.length === 0) return emptyComponent;

    return React.cloneElement(view, {
      values: pageValues,
      selectedValues,
      viewConfiguration: fillChildProp(view),
    });
  };

  const showButtons = children.length > 1;
  const showSort = find(configuration.metadata, (element) => element.sortable);
  const showSearch = find(configuration.metadata, (element) => element.searchable);
  const showRightControls = showButtons || showSort;

  const align = !showSearch ? "flex-end" : "space-between";

  return (
    <div id={id} className={clsx(className, classes.root)}>
      {FilterPlaceholder && <FilterPlaceholder onSelection={changePageValues} />}
      <HvGrid container spacing={0}>
        <HvGrid container justify={align} alignItems="flex-end">
          {showSearch && <HvGrid item>{renderSearch()}</HvGrid>}
          {showRightControls && (
            <HvGrid item>
              <HvGrid container alignItems="flex-end" spacing={0}>
                {showSort && <HvGrid item>{renderSort()}</HvGrid>}
                {showButtons && (
                  <HvGrid item>
                    <div className={classes.multiButtons}>
                      <MultiButton
                        id={id}
                        views={multibuttonProps}
                        selectedView={selectedView}
                        changeView={changeView}
                        onViewChange={onViewChange}
                      />
                    </div>
                  </HvGrid>
                )}
              </HvGrid>
            </HvGrid>
          )}
        </HvGrid>
        <HvGrid item xs={12}>
          {hasBulkActions && (
            <HvBulkActions
              classes={{ root: classes.bulkActions }}
              numTotal={values.length}
              numSelected={selectedValues.length}
              onSelectAll={handleSelectPage}
              onSelectAllPages={handleSelectAll}
              showSelectAllPages
              maxVisibleActions={maxVisibleActions}
            />
          )}
        </HvGrid>
        <HvGrid item xs={12} className={classes.viewContainer}>
          {renderView()}
        </HvGrid>
        {hasPagination && (
          <HvGrid container>
            <HvGrid item xs={12}>
              {renderPagination()}
            </HvGrid>
          </HvGrid>
        )}
      </HvGrid>
    </div>
  );
};

HvAssetInventory.propTypes = {
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
     * Styles applied to the root component.
     */
    root: PropTypes.string,
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
     *  Styles applied to the bulkActions.
     */
    bulkActions: PropTypes.string,
    /**
     * Styles applied to the view container.
     */
    viewContainer: PropTypes.string,
    /**
     * Styles applied to the search box container.
     */
    searchBoxContainer: PropTypes.string,
    /**
     * Styles applied to the sort container.
     */
    sortContainer: PropTypes.string,
    /**
     * Styles applied to the pagination component.
     */
    pagination: PropTypes.string,
  }).isRequired,
  /**
   * Views components.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /**
   * Data passed to the component.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  /**
   * Labels.
   */
  labels: PropTypes.shape({
    /**
     * Sort label.
     */
    sortBy: PropTypes.string,
    /**
     * the label on top of the search box.
     */
    inputLabel: PropTypes.string,
    /**
     * the placeholder value of the search box.
     */
    placeholder: PropTypes.string,
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
        searchFunction: PropTypes.func,
      })
    ).isRequired,
    viewConfiguration: PropTypes.instanceOf(Object),
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
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      disabled: PropTypes.bool,
    })
  ),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
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
   * Values selected. The list can be maintain internally or it can be passed (overwriting the internal).
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * The selected view index.
   */
  selectedView: PropTypes.number,
  /**
   * Defines whether the Asset Inventory includes the bulk actions component.
   */
  hasBulkActions: PropTypes.bool,
  /**
   * Defines whether the Asset Inventory includes the pagination component.
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
  onSortChange: PropTypes.func,
  /**
   * View change callback.
   */
  onViewChange: PropTypes.func,
  /**
   * Visual indication of the sort applied. The id is given by the metadata.id+Asc or metadata.id+Desc.
   */
  sortOptionId: PropTypes.string,
  /**
   * Visual indicator of the search string used.
   */
  searchString: PropTypes.string,
  /**
   * Disable portal on the Sort dropdown
   */
  disablePortal: PropTypes.bool,
  /**
   * Other props passed to the searchbox.
   */
  searchProps: PropTypes.instanceOf(Object),
  /**
   * Others props passed to the Sort. If you want to control the aria-label
   * use the labels.sortBy, as it is mapped directly to the aria-label.
   */
  sortProps: PropTypes.instanceOf(Object),
  /**
   * Array of others prop passed to the created button. Each element must include the id of the view
   * and other props to pe passed to each button.
   */
  multibuttonProps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.node,
    })
  ),
  /**
   *  Extra properties passed to the pagination.
   */
  paginationProps: PropTypes.instanceOf(Object),
  /**
   * Component to the present when no data is available.
   */
  emptyComponent: PropTypes.node,
};

export default withStyles(styles, { name: "HvAssetInventory" })(HvAssetInventory);
