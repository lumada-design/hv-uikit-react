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
import _ from "lodash";
import uniqueId from "lodash/uniqueId";
import classNames from "classnames";
import ReactTable, { ReactTableDefaults } from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import checkboxHOC from "react-table/lib/hoc/selectTable";

import "react-table/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";

import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";

import SortAsc from "@hv/uikit-react-icons/dist/Generic/SortAscendingXS";
import SortDesc from "@hv/uikit-react-icons/dist/Generic/SortDescendingXS";
import Sort from "@hv/uikit-react-icons/dist/Generic/SortXS";
import MoreVert from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";
import HvTypography from "../Typography";
import expander from "./expander/expander";
import {
  appendClassnames,
  createExpanderButton,
  setHeaderSortableClass
} from "./columnUtils";
import {
  toggleAll,
  isIndeterminateStatus,
  toggleSelection,
  isSelected
} from "./checkBoxUtils";

import Pagination from "../Pagination";
import NoData from "./NoData";
import Header from "./Header";
import { tableStyleOverrides } from "./styles";

import HvCheckBox from "../Selectors/CheckBox";
import DropDownMenu from "../DropDownMenu";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
const ReactTableCheckbox = checkboxHOC(ReactTable);

/**
 * Table component. This component offers:
 * - A standard table;
 * - Table with expander;
 * - Table with checkbox.
 *
 * The type is defined by the existence of the properties:
 *  - subElementTemplate: Creates a table with expander;
 *  - idForCheckbox: Creates a table with checkboxs;
 *  - None: Creates a simple table.
 *
 *   Just one of this properties should be set (or none) has it isn't possible to have a table with
 *   expander and checkbox simultaneously.
 */
class Table extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props;

    this.state = {
      internalId: id || uniqueId("hv-table-"),
      // the columns that are sorted
      sorted: props.defaultSorted || [],
      // flag for controlling if the component as been render before
      initiallyLoaded: false,
      // Controls which row is expanded.
      expanded: {},
      // Controls which row is selected using the checkboxes.
      selection: props.selections || [],
      // Controls if the select all options has been used
      selectAll: false
    };
  }

  /**
   * Change the state property initiallyLoaded to identify that it is the first load.
   */
  componentDidMount() {
    const { initiallyLoaded } = this.state;
    const { data } = this.props;

    if (!initiallyLoaded) {
      this.state.initiallyLoaded = true;
    }
    this.state.recordQuantity = data.length;
  }

  static getDerivedStateFromProps(props, state) {
    const { selections } = props;
    if (selections !== state.selections) {
      return {
        selections
      };
    }

    return null;
  }

  /**
   *
   * Returns data set with nulls replaced by em dashes.
   *
   * @returns {Array} new data set
   */
  sanitizedData = () => {
    const { data } = this.props;
    const newData = [];
    let newEntry = {};
    _.map(data, entry => {
      newEntry = {};
      _.each(entry, (val, key) => {
        newEntry[key] = val === null ? `\u2014` : val;
      });
      newData.push(newEntry);
    });

    return newData;
  };

  /**
   *
   * Returns subtitle with the correct number of selected checkboxes.
   *
   * @param numRows - number of rows in table
   * @returns {String} number selected
   */
  getCheckBoxHeader = numRows => {
    const { selection } = this.state;
    if (selection.length === 0) {
      return "All";
    }

    return `${selection.length} of ${numRows}`;
  };

  /**
   *
   * Returns the corresponding icon for the type of sorting (ascending or descending).
   *
   * @param id - the used to find the column.
   * @returns {*} - 'false' if the column doesn't exist.
   */
  getSortedComponent = id => {
    const { sorted } = this.state;
    const { columns, sortable } = this.props;

    const sortInfo = sorted.filter(item => item.id === id);

    if (sortInfo.length) {
      return sortInfo[0].desc === true ? <SortDesc /> : <SortAsc />;
    }

    const columnDef = columns.filter(
      item => item.id === id || item.accessor === id
    );
    if (
      (columnDef.length && (_.isNil(columnDef[0].sortable) && sortable)) ||
      columnDef[0].sortable
    ) {
      return <Sort />;
    }

    return false;
  };

  /**
   * Pagination customizations.
   *
   * @returns {{showPageSizeOptions: HvTable.props.showPageSize, showPagination: HvTable.props.showPagination}}
   */
  getPaginationProps = () => {
    const { internalId } = this.state;

    const { data, pageSize: propsPageSize } = this.props;
    const { showPagination, showPageSize } = this.props;
    const {
      pageSize = data.length,
      onPageSizeChange,
      onPageChange,
      pages
    } = this.props;

    return {
      id: `${internalId}-pagination`,
      showPagination: data.length > 0 && showPagination,
      ...(showPagination && { PaginationComponent: Pagination }),
      ...(showPagination && {
        onPageSizeChange: (newPageSize, page) => {
          this.setState({ expanded: {} });
          if (onPageSizeChange) onPageSizeChange(newPageSize, page);
        }
      }),
      ...(showPagination && {
        onPageChange: page => {
          this.setState({ expanded: {} });
          if (onPageChange) onPageChange(page);
        }
      }),
      ...(showPagination && pages && { pages }),

      ...((propsPageSize !== undefined && { defaultPageSize: propsPageSize }) ||
        (pageSize && { defaultPageSize: pageSize })),

      ...{ showPageSizeOptions: showPageSize }
    };
  };

  /**
   * Obtains server side data.
   *
   * @returns {Object}
   */
  getServerSizeProps = () => {
    const { paginationServerSide } = this.props;

    return {
      ...(paginationServerSide && { manual: true }),
      ...(paginationServerSide && { onFetchData: this.onFetchDataInternal })
    };
  };

  /**
   *
   * Add the class "sorted" to the selected column.
   *
   * @param sortedColumn - the column representation from the user.
   * @param col - column representation from react tables that is going to be modified.
   */
  onSortChange = (sortedColumn, col) => {
    const column = col;
    column.className = "sorted";
    this.setState({ sorted: sortedColumn, expanded: {} });
  };

  /**
   * Sort properties override to set onSortedChange
   *
   * @returns {{sortable: HvTable.props.sortable}}
   */
  getSortProps = () => {
    const { sortable, defaultSorted } = this.props;

    return {
      sortable,
      ...(sortable && { defaultSorted }),
      onSortedChange: this.onSortChange
    };
  };

  getCheckboxProps = () => {
    const { classes } = this.props;
    const { selection, internalId } = this.state;

    return {
      selectWidth: 32,
      SelectAllInputComponent: () => (
        <div className={classNames(classes.checkBox)} />
      ),
      SelectInputComponent: props => (
        <HvCheckBox
          id={`${internalId}-select-${props.id}`}
          checked={isSelected(props.id, selection)}
          onChange={() => this.toggleSelection(props.id)}
        />
      )
    };
  };

  /**
   * Function used to load data asynchronously.
   *
   * @param {Object} tableState - an Object containing information about the current state of the table.
   */
  onFetchDataInternal = tableState => {
    const { onFetchData } = this.props;
    const { initiallyLoaded, sorted: sortedFromState } = this.state;
    const { pageSize, page, sorted } = tableState;

    if (initiallyLoaded) {
      let cursor = `${page * pageSize}`;

      if (
        sortedFromState[0].id !== sorted[0].id ||
        sortedFromState[0].desc !== sorted[0].desc
      ) {
        cursor = "0";
      }

      onFetchData(cursor, pageSize, sorted);
    }
  };

  /**
   * Override of the thead th. This method is used to add properties to the entire column.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object containing information about the row.
   * @param {Object} column - An object containing information about the column.
   * @returns {{className: (theadTh|{outline, backgroundColor, "& > div"})}}
   */
  getTheadThProps = (state, rowInfo, column) => {
    const { classes, sortable } = this.props;
    const { sorted, internalId } = this.state;
    let isSortable = sortable && (_.isNil(column.sortable) || column.sortable);

    if (column.id === "secondaryActions") {
      isSortable = null;
    }

    appendClassnames(column, sorted, classes, sortable);

    return {
      id: column.id ? `${internalId}-column-${column.id}` : undefined,
      className:
        column.id !== "secondaryActions"
          ? setHeaderSortableClass(isSortable, classes.theadTh)
          : classNames(classes.theadTh, "secondaryAction")
    };
  };

  /**
   * Override of the tbody. This method is used to add properties to the entire table body.
   *
   * @returns {{className: (tbody, tbodyEmpty)}}
   */
  getTBodyProps = () => {
    const { classes, data } = this.props;

    return {
      className: classNames(classes.tbody, {
        [classes.tBodyEmpty]: data.length === 0
      })
    };
  };

  /**
   * A getter for the row provided by the React table
   * used to add an onClick function to open the expander when the row is clicked.
   *
   * @param {Object} state - The current state of the table.
   * @param {Object} rowInfo - An object containing information about the row.
   * @returns {Object} - The object that contains the classes to be applied to the table.
   */
  getTrProps = (state, rowInfo) => {
    const { classes, subElementTemplate } = this.props;
    const { expanded, selection } = this.state;

    const baseTrProps = {
      id: this.computeRowElementId(rowInfo),
      className: classes.tr
    };

    if (subElementTemplate && rowInfo && rowInfo.row) {
      return {
        ...baseTrProps,
        onClick: () => {
          this.setState({
            expanded: { [rowInfo.viewIndex]: !expanded[rowInfo.viewIndex] }
          });
        },
        className: classNames(classes.tr, classes.pointer)
      };
    }

    const rowId = this.computeRowId(rowInfo);

    if (rowId && selection.includes(rowId)) {
      return {
        ...baseTrProps,
        className: classNames(classes.tr, "selected")
      };
    }

    return baseTrProps;
  };

  getTdProps = (state, rowInfo, column) => {
    const { classes } = this.props;

    const rowElementId = this.computeRowElementId(rowInfo);

    return {
      id:
        rowElementId && column.id
          ? `${rowElementId}-column-${column.id}`
          : undefined,
      className: classes.td
    };
  };

  //  ----------- Checkbox -----------
  /**
   * Selects or unselect a row.
   *
   * @param {Number} key - the key that uniquely identifies the row.
   */
  toggleSelection = key => {
    // start off with the existing state
    const { selection } = this.state;
    const { onSelection } = this.props;

    const select = toggleSelection(key, selection);

    if (select.length === 0) this.setState({ selectAll: false });

    // update the state
    this.setState({ selection: select }, () => {
      onSelection(select);
    });
  };

  /**
   * Selects all the avaible rows on the page.
   */
  toggleAll = () => {
    const { idForCheckbox, onSelection } = this.props;
    const { selectAll } = this.state;

    const stateToSet = toggleAll(idForCheckbox, selectAll, this.checkboxTable);
    this.setState(
      {
        selectAll: stateToSet.selectAll,
        selection: stateToSet.selection
      },
      () => {
        onSelection(stateToSet.selection);
      }
    );
  };

  computeRowElementId(rowInfo) {
    const { internalId } = this.state;

    const rowId = this.computeRowId(rowInfo);

    let rowElementId;
    if (rowId) {
      rowElementId = `${internalId}-row-${rowId}`;
    } else if (rowInfo) {
      rowElementId = `${internalId}-row-index-${rowInfo.index}`;
    }

    return rowElementId;
  }

  computeRowId(rowInfo) {
    const { idForCheckbox } = this.props;

    if (
      idForCheckbox &&
      rowInfo &&
      rowInfo.original &&
      rowInfo.original[idForCheckbox]
    ) {
      return rowInfo.original[idForCheckbox];
    }

    return null;
  }

  render() {
    const {
      classes,
      className,
      uniqClassName,
      columns,
      data,
      titleText,
      subtitleText,
      subElementTemplate,
      idForCheckbox,
      useRouter,
      getTrProps,
      labels,
      secondaryActions,
      sortable,
      ...other
    } = this.props;

    const {
      internalId,
      expanded,
      selectAll,
      selection,
      recordQuantity
    } = this.state;

    const AugmentedTable = idForCheckbox
      ? ReactTableCheckbox
      : ReactTableFixedColumns;
    const tableStyles = tableStyleOverrides(classes);

    // Add dropdown menu column if secondaryActions exists in props
    if (
      !!secondaryActions &&
      !columns.some(col => col.accessor === "secondaryActions")
    ) {
      columns.push({
        headerText: "",
        accessor: "secondaryActions",
        cellType: "alpha-numeric",
        width: 31,
        sortable: false,
        Cell: props =>
          props.original.noActions ? null : (
            <DropDownMenu
              id={`${this.computeRowElementId(props)}-secondaryActions`}
              disablePortal={false}
              icon={<MoreVert boxStyles={{ width: "30px", height: "30px" }} />}
              dataList={secondaryActions}
              onClick={event => {
                event.action(props.original);
              }}
            />
          )
      });
    }

    // Creates the thead with the text and the sorted icon.
    const ColumnSettings = {
      ...ReactTableDefaults.column,
      Header: props => {
        const { column } = props;
        const { sorted } = this.state;

        return (
          <Header
            key={column.id}
            tableInternalId={internalId}
            column={column}
            sort={sorted}
            tableSortable={sortable}
          />
        );
      }
    };
    ReactTableDefaults.expanderDefaults.show = false;
    Object.assign(ReactTableDefaults, {
      column: ColumnSettings
    });

    // add expander button
    const newColumn = createExpanderButton(
      columns,
      subElementTemplate,
      classes
    );
    // add expander
    const newSubComponent = expander(subElementTemplate, classes);

    const checkUseRoute = useRouter ? getTrProps.bind(this.props) : getTrProps;

    const sanitizedData = this.sanitizedData();

    return (
      <div
        id={internalId}
        className={classNames(classes.tableContainer, className)}
      >
        {(titleText || labels.titleText) && (
          <div className={classes.title}>
            <div>
              <HvTypography variant="mTitle" id={`${internalId}-title`}>
                {titleText || labels.titleText}
              </HvTypography>
            </div>
            {(subtitleText || labels.subtitleText) && (
              <div className={classes.subtitle}>
                <HvTypography variant="sText" id={`${internalId}-subtitle`}>
                  {subtitleText || labels.subtitleText}
                </HvTypography>
              </div>
            )}
          </div>
        )}
        {!!idForCheckbox && (
          <div className={classes.checkBoxRow}>
            <div className={classes.checkBoxText}>
              <HvCheckBox
                id={`${internalId}-select-all`}
                onChange={() => this.toggleAll()}
                checked={selectAll}
                disabled={data.length === 0}
                indeterminate={isIndeterminateStatus(selection, recordQuantity)}
              />
              <HvTypography variant="highlightText">
                {this.getCheckBoxHeader(data.length)}
              </HvTypography>
            </div>
          </div>
        )}
        <AugmentedTable
          id={`${internalId}-data`}
          {...other}
          {...tableStyles}
          {...this.getPaginationProps()}
          {...this.getServerSizeProps()}
          {...this.getSortProps()}
          {...this.getCheckboxProps()}
          /* eslint no-return-assign: 0 */
          ref={r => (this.checkboxTable = r)}
          getTheadThProps={this.getTheadThProps}
          getTrProps={getTrProps ? checkUseRoute : this.getTrProps}
          getTdProps={this.getTdProps}
          getTbodyProps={this.getTBodyProps}
          data={sanitizedData}
          columns={newColumn}
          className="-highlight"
          uniqClassName={uniqClassName}
          SubComponent={newSubComponent}
          expanded={expanded}
          keyField={idForCheckbox}
          isSelected={key => isSelected(key, selection)}
          NoDataComponent={NoData}
        />
      </div>
    );
  }
}

Table.propTypes = {
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
    firstWithNumeric: PropTypes.string
  }).isRequired,
  /**
   * The labels inside the table.
   */
  labels: PropTypes.shape({
    titleText: PropTypes.string,
    subtitleText: PropTypes.string
  }),
  /**
   * Title of the table.
   * @deprecated Instead use the labels property
   */
  titleText: deprecatedPropType(PropTypes.string),
  /**
   * Subtitle of the table.
   * @deprecated Instead use the labels property
   */
  subtitleText: deprecatedPropType(PropTypes.string),
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
      sortable: PropTypes.bool
    })
  ).isRequired,
  /**
   * Array with the data elements to show
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
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
   * Callback to notify when the page size changes
   */
  onPageSizeChange: PropTypes.func,
  /**
   * Boolean to enable or disable the server side pagination mechanism
   */
  paginationServerSide: PropTypes.bool,
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
   * Boolean to bind config back to function or not
   */
  useRouter: PropTypes.bool,
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
      action: PropTypes.func
    })
  )
};

Table.defaultProps = {
  className: "",
  uniqClassName: null,
  id: undefined,
  titleText: undefined,
  subtitleText: undefined,
  labels: {
    titleText: "",
    subtitleText: ""
  },
  showPagination: true,
  onPageChange: () => {},
  showPageSize: true,
  pageSize: undefined,
  onPageSizeChange: () => {},
  paginationServerSide: false,
  pages: undefined,
  onFetchData: () => {},
  sortable: true,
  defaultSorted: [],
  subElementTemplate: null,
  idForCheckbox: "",
  getTrProps: undefined,
  useRouter: false,
  selections: undefined,
  onSelection: () => {},
  secondaryActions: null
};

export default Table;
