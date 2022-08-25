import clsx from "clsx";
import isNil from "lodash/isNil";
import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";

import { withStyles } from "@material-ui/core";
import { HvBulkActions, HvPagination } from "..";
import { setId, KeyboardCodes, isKeypress } from "../utils";
import withId from "../withId";

import DropDownMenu from "./DropdownMenu";
import Header from "./Header";
import NoData from "./NoData";
import { isSelected, getPageSelection } from "./checkBoxUtils";
import { appendClassnames, createExpanderButton, setHeaderSortableClass } from "./columnUtils";
import expander from "./expander";
import withCheckbox from "./selectTable";
import { styles, tableStyleOverrides } from "./styles";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const ReactTableCheckbox = withCheckbox(ReactTable);
const ReactTableFixedColumnsCheckbox = withCheckbox(ReactTableFixedColumns, {
  callbackRefProperty: "innerRef",
});

// TODO deprecate header labels in 2.x

/**
 * A Table gathers relational data, it displays values arranged to allow quick numerical analysis
 * like comparison and sorting.
 *
 * This component offers:
 * <ul>
 * <li>A standard table</li>
 * <li>Table with expander</li>
 * <li>Table with checkbox</li>
 * </ul>
 *
 * The type is defined by the existence of the properties:
 * <ul>
 * <li>subElementTemplate: Creates a table with expander</li>
 * <li>idForCheckbox: Creates a table with checkboxes</li>
 * <li>None: Creates a simple table</li>
 * </ul>
 *
 * Only one of these properties should be set (or none), as it isn't possible to have a table with
 * an expander and checkbox simultaneously.
 */
const HvTable = (props) => {
  const {
    id,
    classes,
    className,
    uniqClassName,
    data,
    columns,
    page,
    sortable = true,
    defaultSorted = [],
    selections,
    onSelection,
    onFetchData,
    subElementTemplate,
    tableProps = { tableCaption: "Table Caption" },
    rowCount,
    noDataComponent,
    idForCheckbox = "",
    getTrProps: getTrPropsProp,
    getTableProps: getTablePropsProp,
    actions,
    actionsCallback,
    actionsDisabled,
    maxVisibleActions,
    secondaryActions,
    allCheckBoxProps,
    dropdownMenuProps,
    paginationLabels,
    paginationServerSide = false,
    paginationProps = {},
    showPagination = true,
    showPageSize = true,
    dataSize,
    pageSize,
    onPageSizeChange,
    onPageChange,
    pages,
    collapseOnDataChange = true,
    fixedCheckbox,
    fixedSecondaryActions,
    ...others
  } = props;

  const [sorted, setSorted] = useState(defaultSorted);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(page || 0);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize || data.length);
  const [selection, setSelection] = useState(selections || []);
  const tableRef = useRef(null);

  /**
   * Change the state property initiallyLoaded to identify that it is the first load.
   */
  useEffect(() => {
    setInitiallyLoaded(true);
  }, []);

  useEffect(() => {
    if (page !== undefined) {
      setCurrentPage(page);
    }
  }, [page]);

  useEffect(() => {
    if (collapseOnDataChange) setExpanded({});
  }, [data, collapseOnDataChange]);

  useEffect(() => {
    if (!idForCheckbox) return;
    if (selections) {
      setSelection(selections);
      return;
    }

    const dataIds = data.map((item) => item[idForCheckbox]);
    const updatedSelection = selection.filter((item) => dataIds.includes(item));
    setSelection(updatedSelection);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, idForCheckbox, selections]);

  useEffect(() => {
    const newPageSize = !pageSize && !showPagination ? data.length : pageSize;

    if (pages && currentPage === pages) {
      setCurrentPage((previousValue) => previousValue - 1);
    }

    if (newPageSize && currentPageSize !== newPageSize) {
      const newPage =
        page !== undefined ? page : Math.floor((currentPageSize * currentPage) / newPageSize);
      setCurrentPage(newPage);
      setCurrentPageSize(newPageSize);
      onPageSizeChange?.(newPageSize, newPage);
    }
    // currentPage and currentPageSize don't need to be watched
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length, pageSize, showPagination, onPageSizeChange]);

  /**
   * Returns data set with nulls replaced by em dashes.
   *
   * @returns {Array} new data set
   */
  const sanitizedData = () =>
    data.map((entry) => {
      const newEntry = {};
      Object.keys(entry).forEach((key) => {
        newEntry[key] = entry[key] ?? "—";
      });
      return newEntry;
    });

  const PaginationComponent = useCallback(
    (tablePaginationProps) => {
      return (
        <HvPagination
          id={setId(id, "pagination")}
          labels={paginationLabels}
          pageSize={tablePaginationProps.pageSize}
          pages={tablePaginationProps.pages}
          page={tablePaginationProps.page}
          canPrevious={tablePaginationProps.canPrevious}
          canNext={tablePaginationProps.canNext}
          onPageChange={tablePaginationProps.onPageChange}
          onPageSizeChange={tablePaginationProps.onPageSizeChange}
          showPageSizeOptions={tablePaginationProps.showPageSizeOptions}
          {...paginationProps}
        />
      );
    },
    [id, paginationLabels, paginationProps]
  );

  /**
   * Pagination customizations.
   */
  const getPaginationProps = () => {
    return {
      showPagination: data.length > 0 && showPagination,
      showPageSizeOptions: showPageSize,
      ...(showPagination && {
        PaginationComponent,
        onPageSizeChange: (newPageSize, p) => {
          setExpanded({});
          setCurrentPage(p);
          setCurrentPageSize(newPageSize);
          onPageSizeChange?.(newPageSize, p);
        },
        onPageChange: (p) => {
          setExpanded({});
          setCurrentPage(p);
          onPageChange?.(p);
        },
        ...(pageSize && { defaultPageSize: pageSize }),
        ...(pages && { pages }),
      }),
      page: currentPage,
      pageSize: paginationServerSide || data.length !== 0 ? currentPageSize : 0,
    };
  };

  /**
   * Function used to load data asynchronously.
   *
   * @param {Object} tableState - an Object containing information about the current state of the table.
   */
  const onFetchDataInternal = (tableState) => {
    const { pageSize: pageSizeT, page: pageT, sorted: sortedT } = tableState;

    if (!initiallyLoaded) return;
    let cursor = `${pageT * pageSizeT}`;
    if (
      sorted.length > 0 &&
      (sorted[0].id !== sortedT[0].id || sorted[0].desc !== sortedT[0].desc)
    ) {
      cursor = "0";
    }

    onFetchData?.(cursor, pageSizeT, sortedT);
  };

  /**
   * Obtains server side data.
   *
   * @returns {Object}
   */
  const getServerSideProps = () =>
    paginationServerSide
      ? { page: currentPage, manual: true, onFetchData: onFetchDataInternal }
      : {};

  /**
   * Add the class "sorted" to the selected column.
   *
   * @param sortedColumn - the column representation from the user.
   */
  const onSortChange = useCallback((sortedColumn) => {
    setSorted(sortedColumn);
    setCurrentPage(0);
    setExpanded({});
  }, []);

  /**
   * Sort properties override to set onSortedChange
   *
   * @returns {{sortable: boolean, onSortedChange: onSortChange}}
   */
  const getSortProps = () => ({
    sortable,
    ...(sortable && { defaultSorted }),
    onSortedChange: onSortChange,
  });

  /**
   * Selects or unselect a row.
   *
   * @param {object} event - the event that triggered the selection
   * @param {Number} key - the key that uniquely identifies the row.
   */
  const toggleSelection = (event, key) => {
    const newSelection = selection.includes(key)
      ? selection.filter((el) => el !== key)
      : [...selection, key];

    // update the state
    setSelection(newSelection);
    onSelection?.(event, newSelection);
  };

  const getCheckboxProps = () => ({
    id,
    selectWidth: 32,
    SelectAllInputComponent: () => <div className={clsx(classes.checkBox)} />,
    toggleSelection: (idSelection, shiftkey, row) => {
      toggleSelection(null, row[idForCheckbox]);
    },
  });

  /**
   * Override of the thead th. This method is used to add properties to the entire column.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object with row information.
   * @param {Object} column - An object with column information.
   * @param {Object} instance- An object with instance information.
   * @returns {{onClick: onClick, scope: string, className: (*), id: (any)}}
   */
  const getTheadThProps = (state, rowInfo, column, instance) => {
    let isSortable = sortable && (isNil(column.sortable) || column.sortable);

    if (column.id === "secondaryActions") {
      isSortable = null;
    }

    let ariaSort;

    if (sorted.length > 0) {
      if (column.id === sorted[0].id) {
        const sortDirection = sorted[0].desc === true ? "descending" : "ascending";
        ariaSort = {
          "aria-sort": sortDirection,
        };
      } else ariaSort = { "aria-sort": undefined };
    }

    appendClassnames(column, sorted, classes, sortable);

    return {
      id: setId(id, "column", column.id),
      onKeyDown: (event) => {
        if (
          isSortable &&
          (isKeypress(event, KeyboardCodes.Enter) || isKeypress(event, KeyboardCodes.Space))
        ) {
          event.preventDefault();
          instance.sortColumn(column);
        }
      },
      onClick: () => {
        if (isSortable) {
          document.getElementById(`${id}-column-${column.id}-sort-button`).focus();
          instance.sortColumn(column);
        }
      },
      scope: "col",
      ...ariaSort,
      className:
        column.id !== "secondaryActions"
          ? setHeaderSortableClass(isSortable, classes.theadTh)
          : clsx(classes.theadTh, "secondaryAction"),
    };
  };

  /**
   * Override of the tbody. This method is used to add properties to the entire table body.
   *
   * @returns {{role: string, className: string}}
   */
  const getTBodyProps = () => ({
    role: "rowgroup",
    className: clsx(classes.tbody, {
      [classes.tBodyEmpty]: data.length === 0,
    }),
  });

  /**
   * A getter for the row provided by the React table
   * used to correct the role definition for the row element.
   *
   * @returns {Object} - The object that contains the correct role to be applied to the table rows.
   */
  const getTrGroupProps = () => ({
    role: undefined,
    className: classes.trGroups,
  });

  /**
   * Open and closes the expander of a row.
   *
   * @param {numeric} rowIndex - The index of the row to toggle.
   */
  const toggleExpand = (rowIndex) => {
    setExpanded({ [rowIndex]: !expanded[rowIndex] });
  };

  const computeRowId = (rowInfo) => {
    if (idForCheckbox && rowInfo?.original?.[idForCheckbox]) {
      return rowInfo.original[idForCheckbox];
    }
    return null;
  };

  const computeRowElementId = (rowInfo) => {
    const rowId = computeRowId(rowInfo);

    return (
      (rowId && setId(id, "row", rowId)) ||
      (rowInfo && setId(id, "row-index", rowInfo.index)) ||
      undefined
    );
  };

  /**
   * A getter for the row provided by the React table
   * used to add an onClick function to open the expander when the row is clicked.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object containing information about the row.
   * @returns {Object} - The object that contains the classes to be applied to the table.
   */
  const getTrProps = (state, rowInfo) => {
    const expandedProps =
      rowInfo !== undefined &&
      expanded[0] &&
      Object.keys(expanded).toString() === rowInfo.nestingPath.toString()
        ? { "aria-expanded": true }
        : undefined;

    const ariaRowIndex = rowInfo !== undefined ? { "aria-rowindex": rowInfo.index } : undefined;
    const baseTrProps = {
      id: computeRowElementId(rowInfo),
      className: classes.tr,
      role: "row",
      "aria-selected": "false",
      ...expandedProps,
      ...ariaRowIndex,
    };
    if (subElementTemplate && rowInfo && rowInfo.row) {
      return {
        ...baseTrProps,
        className: clsx(classes.tr, classes.pointer),
      };
    }

    const rowId = computeRowId(rowInfo);

    if (rowId && selection.includes(rowId)) {
      return {
        ...baseTrProps,
        className: clsx(classes.tr, "selected"),
        "aria-selected": "true",
      };
    }

    return baseTrProps;
  };

  const getTableProps = () => {
    const baseTableProps = {
      role: "table",
      "aria-rowcount": rowCount || data.length,
      id: setId(id, "table"),
      className: classes.table,
    };

    if (tableProps) {
      return {
        ...baseTableProps,
        caption: tableProps.tableCaption,
      };
    }

    return baseTableProps;
  };

  const getTdProps = (state, rowInfo, column) => ({
    id: setId(computeRowElementId(rowInfo), "column", column.id),
    className: clsx(classes.td, {
      sorted: sorted.find((elemt) => column.id === elemt.id) !== undefined,
    }),
    role: "cell",
  });

  /**
   * Return the NoData component with label.
   *
   * @returns {*}
   */
  const getNoDataProps = () => <NoData>{noDataComponent}</NoData>;

  /**
   * Selects all the available rows on the page.
   *
   * @param {object} event - the event that triggered the selection
   */
  const togglePage = (event) => {
    const config = { currentPage, currentPageSize, paginationServerSide };
    const newSelection = getPageSelection(idForCheckbox, tableRef, config, selection);
    setSelection(newSelection);
    onSelection?.(event, newSelection);
  };

  /**
   * Selects all the available rows on the page.
   *
   * @param {object} event - the event that triggered the selection
   */
  const toggleAll = (event) => {
    const allSelected = selection.length === data.length;
    const newSelection = getPageSelection(
      idForCheckbox,
      tableRef,
      undefined,
      selection,
      allSelected
    );
    setSelection(newSelection);
    onSelection?.(event, newSelection);
  };

  const hasFixedLeftColumns = useMemo(
    () => columns.some((col) => col.fixed === "left" || col.fixed === true),
    [columns]
  );

  const hasFixedRightColumns = useMemo(
    () => columns.some((col) => col.fixed === "right"),
    [columns]
  );

  const hasFixedCheckbox =
    !!idForCheckbox && ((fixedCheckbox === undefined && hasFixedLeftColumns) || fixedCheckbox);

  const hasFixedSecundaryActions =
    !!secondaryActions &&
    ((fixedSecondaryActions === undefined && hasFixedRightColumns) || fixedSecondaryActions);

  const AugmentedTable = useMemo(() => {
    const hasFixedColumns =
      hasFixedLeftColumns || hasFixedRightColumns || hasFixedCheckbox || hasFixedSecundaryActions;
    if (idForCheckbox && hasFixedColumns) {
      return ReactTableFixedColumnsCheckbox;
    }

    if (idForCheckbox) {
      return ReactTableCheckbox;
    }

    if (hasFixedColumns) {
      return ReactTableFixedColumns;
    }

    return ReactTable;
  }, [
    hasFixedCheckbox,
    hasFixedLeftColumns,
    hasFixedRightColumns,
    hasFixedSecundaryActions,
    idForCheckbox,
  ]);

  const getTableStyles = () => tableStyleOverrides(classes);

  // Add dropdown menu column if secondaryActions exists in props
  if (!!secondaryActions && !columns.some((col) => col.accessor === "secondaryActions")) {
    columns.push({
      headerText: "",
      accessor: "secondaryActions",
      cellType: "alpha-numeric",
      width: 33,
      sortable: false,
      // will be fixed if told so or automatically if there are any column fixed to the right
      fixed: hasFixedSecundaryActions ? "right" : undefined,
      Cell: (propsCell) =>
        propsCell.original.noActions ? null : (
          <DropDownMenu
            id={setId(computeRowElementId(propsCell))}
            secondaryActions={secondaryActions}
            original={propsCell.original}
            {...dropdownMenuProps}
          />
        ),
    });
  }

  // Creates the thead with the text and the sorted icon.
  ReactTableDefaults.expanderDefaults.show = false;
  // eslint-disable-next-line react/prop-types
  ReactTableDefaults.column.Header = useCallback(
    ({ column }) => (
      <Header
        id={id}
        // eslint-disable-next-line react/prop-types
        key={column.id}
        column={column}
        sort={sorted}
        tableSortable={sortable}
        onSortChange={onSortChange}
      />
    ),
    [id, onSortChange, sorted, sortable]
  );

  // add expander button
  const expanderColumn = createExpanderButton(columns, subElementTemplate, classes, toggleExpand);

  // add expander
  const expanderComponent = expander(subElementTemplate, classes);

  const showSelectAllPages =
    !paginationServerSide && showPagination && selection.length < data.length;

  return (
    <div id={id} className={clsx(classes.tableContainer, className)}>
      {idForCheckbox && (
        <HvBulkActions
          id={setId(id, "select-all")}
          aria-controls={setId(id, "table")}
          classes={{ root: classes.bulkActions }}
          numTotal={dataSize ?? data.length}
          numSelected={selection.length}
          onSelectAll={togglePage}
          onSelectAllPages={toggleAll}
          showSelectAllPages={showSelectAllPages}
          labels={{
            selectAllPages: `Select all ${data.length} items`,
          }}
          actions={actions}
          actionsCallback={(...args) => actionsCallback?.(...args, selection)}
          actionsDisabled={actionsDisabled}
          maxVisibleActions={maxVisibleActions}
          {...allCheckBoxProps}
        />
      )}

      <AugmentedTable
        id={setId(id, "data")}
        {...others}
        {...getTableStyles()}
        {...getPaginationProps()}
        {...getServerSideProps()}
        {...getSortProps()}
        {...getCheckboxProps()}
        ref={tableRef}
        getTableProps={getTableProps}
        getTheadThProps={getTheadThProps}
        getTrProps={getTrPropsProp || getTrProps}
        getTdProps={getTdProps}
        getTbodyProps={getTBodyProps}
        data={sanitizedData()}
        columns={expanderColumn}
        className="-highlight"
        uniqClassName={uniqClassName}
        SubComponent={expanderComponent}
        expanded={expanded}
        keyField={idForCheckbox}
        isSelected={(key) => isSelected(key, selection)}
        NoDataComponent={getNoDataProps}
        getTrGroupProps={getTrGroupProps}
        fixedCheckbox={hasFixedCheckbox}
      />
    </div>
  );
};

HvTable.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Unique class name used to identify the fixed table
   */
  uniqClassName: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component thead.
     */
    thead: PropTypes.string,
    /**
     * Styles applied to the component tr.
     */
    tr: PropTypes.string,
    /**
     * Styles applied to the component sort icon.
     */
    rtSortIcon: PropTypes.string,
    /**
     * Styles applied to the component when the sort icon is shown.
     */
    sortedIconShown: PropTypes.string,
    /**
     * Styles applied to the component when the sort icon is hidden.
     */
    sortedIconHidden: PropTypes.string,
    /**
     * Styles applied to the component pointer.
     */
    pointer: PropTypes.string,
    /**
     * Styles applied to the component subtitle.
     */
    subtitle: PropTypes.string,
    /**
     * Styles applied to the component title.
     */
    title: PropTypes.string,
    /**
     * Styles applied to the component when type is link.
     */
    link: PropTypes.string,
    /**
     * Styles applied to the component expander.
     */
    subComponentContainer: PropTypes.string,
    /**
     * Styles applied to the component icon in the columns.
     */
    iconContainer: PropTypes.string,
    /**
     * Styles applied to the component columns.
     */
    firstWithNumeric: PropTypes.string,

    /**
     * Styles applied to the component table header row.
     */
    theadTh: PropTypes.string,
    /**
     * Styles applied to the component table body.
     */
    tbody: PropTypes.string,
    /**
     * Styles applied to the component table body when empty.
     */
    tBodyEmpty: PropTypes.string,
    /**
     * Styles applied to the component table cell.
     */
    td: PropTypes.string,
    /**
     * Styles applied to the component table container.
     */
    tableContainer: PropTypes.string,
    /**
     * Styles applied to the component checkbox.
     */
    checkBox: PropTypes.string,
    /**
     * Styles applied to the component checkbox row.
     */
    checkBoxRow: PropTypes.string,
    /**
     * Styles applied to the component checkbox text.
     */
    checkBoxText: PropTypes.string,
    /**
     * Styles applied to the component table header groups.
     */
    trGroups: PropTypes.string,
    /**
     * Styles applied to the component table.
     */
    table: PropTypes.string,
    /**
     * Styles applied to the HvBulkActions component.
     */
    bulkActions: PropTypes.string,
  }).isRequired,
  /**
   * Labels for the pagination.
   */
  paginationLabels: PropTypes.shape({
    /**
     * Show label.
     */
    pageSizePrev: PropTypes.string,
    /**
     * Indication of the units of the page size selection.
     */
    pageSizeEntryName: PropTypes.string,
    /**
     * Used for the aria-label of the selection of number of unit.
     */
    pageSizeSelectorDescription: PropTypes.string,
    /**
     * Separator of current page and total pages.
     */
    pagesSeparator: PropTypes.string,
    /**
     * Title of button `firstPage`.
     */
    paginationFirstPageTitle: PropTypes.string,
    /**
     * Title of button `previousPage`.
     */
    paginationPreviousPageTitle: PropTypes.string,
    /**
     * Title of button `nextPage`.
     */
    paginationNextPageTitle: PropTypes.string,
    /**
     * Pagination title of button `lastPage`.
     */
    paginationLastPageTitle: PropTypes.string,
    /**
     * Aria-label passed to the page input.
     */
    paginationInputLabel: PropTypes.string,
  }),
  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
   If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerText: PropTypes.string,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      format: PropTypes.func,
      cellType: PropTypes.string,
      style: PropTypes.instanceOf(Object),
      fixed: PropTypes.string,
      Cell: PropTypes.instanceOf(Object),
      sortable: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  /**
   * Array with the data elements to show.
   * It can also define the checkBoxProps property to pass extra props to the row checkbox selector.
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Number of data entries for server side pagination
   */
  dataSize: PropTypes.number,
  /**
   * Boolean to show or hide the pagination controls
   */
  showPagination: PropTypes.bool,
  /**
   * Callback to notify when the page changes
   */
  onPageChange: PropTypes.func,
  /**
   * Boolean to show or hide the page size control
   */
  showPageSize: PropTypes.bool,
  /**
   * Numeric value to control the page size selected
   */
  pageSize: PropTypes.number,
  /**
   * Specify the current page number when using a server side pagination
   */
  page: PropTypes.number,
  /**
   * Callback to notify when the page size changes
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Boolean to enable or disable the server side pagination mechanism
   */
  paginationServerSide: PropTypes.bool,
  /**
   * Attributes applied to the pagination component
   */
  paginationProps: PropTypes.instanceOf(Object),
  /**
   * Numeric value to control the number of pages. Useful when Server side pagination data is enabled
   */
  pages: PropTypes.number,
  /**
   * Callback with receives the page info and should fetch the data to show on the table
   */
  onFetchData: PropTypes.func,
  /**
   * Boolean to enable or disable the sort mechanism
   */
  sortable: PropTypes.bool,
  /**
   * An object describing what column is sorted by default on the table
   */
  defaultSorted: PropTypes.instanceOf(Array),
  /**
   * Element to be shown in the expander.
   */
  subElementTemplate: PropTypes.func,
  /**
   * Property to be uses as unique row identifier. One of the fields of the data.
   */
  idForCheckbox: PropTypes.string,
  /**
   * Function to overwrite the existed getTrProps
   */
  getTrProps: PropTypes.func,
  /**
   * Callback which receives the checked state of all items in the list
   */
  onSelection: PropTypes.func,
  /**
   * Ids of preselected items in the list
   */
  selections: PropTypes.arrayOf(PropTypes.any),
  /**
   *  Secondary actions listed in menu dropdown. Label is displayed and action is executed on click.
   */
  secondaryActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      action: PropTypes.func,
    })
  ),
  /**
   * The renderable content inside the BulkActions right actions slot,
   * or an Array of actions `{ id, label, icon, disabled, ... }`
   */
  actions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   *  Whether actions should be all disabled
   */
  actionsDisabled: PropTypes.bool,
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions: PropTypes.number,
  column: PropTypes.shape({
    id: PropTypes.string,
    sortable: PropTypes.bool,
  }),
  /**
   *  Extra properties passed to the select all checkbox props.
   */
  allCheckBoxProps: PropTypes.instanceOf(Object),
  /**
   *  Extra properties passed to the dropdown menu.
   */
  dropdownMenuProps: PropTypes.instanceOf(Object),
  getTableProps: PropTypes.func,
  tableProps: PropTypes.instanceOf(Object),
  /**
   * Number of rows available in table to display in aria-rowcount
   */
  rowCount: PropTypes.number,
  /**
   * Component to be shown when no data is displayed.
   */
  noDataComponent: PropTypes.node,
  /**
   * Defines if the expanded row is collapsed when data changes.
   */
  collapseOnDataChange: PropTypes.bool,
  /**
   * Defines if the selection checkbox column should be always visible/fixed to the left.
   *
   * Defaults to true when there are any other columns fixed to the left, false otherwise.
   */
  fixedCheckbox: PropTypes.bool,
  /**
   * Defines if the secondary actions column should be always visible/fixed to the right.
   *
   * Defaults to true when there are any other columns fixed to the right, false otherwise.
   */
  fixedSecondaryActions: PropTypes.bool,
};

export default withStyles(styles, { name: "HvTable" })(withId(HvTable));
