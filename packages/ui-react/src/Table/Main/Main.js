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
import ReactTable, { ReactTableDefaults } from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import "react-table/react-table.css";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import classNames from "classnames";
import SortAsc from "@hv-ui/icons/core/icons/SortAscending.XS";
import SortDesc from "@hv-ui/icons/core/icons/SortDescending.XS";
import expander from "../expander/expander";
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
import HvCheckBox from "../../Selectors/CheckBox";

import ReactTablePagination from "../Pagination";
import { tableStyleOverrides } from "./styles";

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
class HvTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // table component to be render
      Table: props.idForCheckbox ? checkboxHOC(ReactTable) : ReactTable,
      // the columns that are sorted
      sorted: props.defaultSorted || [],
      // flag for controlling if the component as been render before
      initiallyLoaded: false,
      // Controls which row is expanded.
      expanded: {},
      // Controls which row is selected using the checkboxes.
      selection: [],
      // Controls if the select all options has been used
      selectAll: false
    };
  }

  /**
   * Change the state property initiallyLoaded to identify that it is the first load.
   */
  componentDidMount() {
    const { initiallyLoaded } = this.state;
    const { data, idForCheckbox } = this.props;
    if (!initiallyLoaded) {
      this.state.initiallyLoaded = true;
    }
    this.state.recordQuantity = data.length;

    if (!idForCheckbox) {
      const withFixedColumns = require("react-table-hoc-fixed-columns");
      this.state.Table = withFixedColumns.default(ReactTable);
    }
  }

  /**
   *
   * Returns the corresponding icon for the type of sorting (ascending or descending).
   *
   * @param id - the used to find the column.
   * @returns {*} - 'false' if the column doesn't exist.
   */
  getSortedComponent = id => {
    const { sorted } = this.state;

    const sortInfo = sorted.filter(item => item.id === id);

    if (sortInfo.length) {
      if (sortInfo[0].desc === true) return <SortDesc />;
      if (sortInfo[0].desc === false) return <SortAsc />;
    }
    return false;
  };

  /**
   * Pagination customizations.
   *
   * @returns {{showPageSizeOptions: HvTable.props.showPageSize, showPagination: HvTable.props.showPagination}}
   */
  getPaginationProps = () => {
    const { data, pageSize: propsPageSize } = this.props;
    const { showPagination, showPageSize } = this.props;
    const { pageSize = data.length, onPageSizeChange, pages } = this.props;

    return {
      showPagination,
      ...(showPagination && { PaginationComponent: ReactTablePagination }),
      ...(showPagination && onPageSizeChange && { onPageSizeChange }),
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
  highlightSortedColumn = (sortedColumn, col) => {
    const column = col;
    column.className = "sorted";
    this.setState({ sorted: sortedColumn });
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
      ...(sortable && {
        onSortedChange: this.highlightSortedColumn
      })
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

      if (sortedFromState[0] !== sorted[0]) {
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
    const { classes } = this.props;
    const { sorted } = this.state;

    appendClassnames(column, sorted, classes);

    return {
      className: setHeaderSortableClass(column.sortable, classes.theadTh)
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
    const { expanded } = this.state;
    if (subElementTemplate && rowInfo && rowInfo.row) {
      return {
        onClick: () => {
          this.setState({
            expanded: { [rowInfo.viewIndex]: !expanded[rowInfo.viewIndex] }
          });
        },
        className: classNames(classes.tr, classes.pointer)
      };
    }

    return { className: classes.tr };
  };

  //  ----------- Checkbox -----------

  /**
   * Check if the row is selected based on it's key.
   *
   * @param {Number} key - the key that uniquely identifies the row.
   */
  isSelected = key => {
    const { selection } = this.state;
    return isSelected(key, selection);
  };

  /**
   * Selects or unselect a row.
   *
   * @param {Number} key - the key that uniquely identifies the row.
   */
  toggleSelection = key => {
    // start off with the existing state
    const { selection } = this.state;

    const select = toggleSelection(key, selection);

    if (select.length === 0) this.setState({ selectAll: false });

    // update the state
    this.setState({ selection: select });
  };

  /**
   *  Adds the indeterminate status to the checkbox when necessary.
   */
  isIndeterminateStatus = () => {
    const { selection, recordQuantity } = this.state;
    return isIndeterminateStatus(selection, recordQuantity);
  };

  /**
   * Selects all the avaible rows on the page.
   */
  toggleAll = () => {
    const { idForCheckbox } = this.props;
    const { selectAll } = this.state;

    const stateToSet = toggleAll(idForCheckbox, selectAll, this.checkboxTable);
    this.setState({
      selectAll: stateToSet.selectAll,
      selection: stateToSet.selection
    });
  };

  render() {
    const {
      classes,
      columns,
      data,
      titleText,
      subtitleText,
      subElementTemplate,
      idForCheckbox,
      useRouter,
      getTrProps,
      ...other
    } = this.props;

    const { expanded, selectAll, Table } = this.state;

    const tableStyles = tableStyleOverrides(classes);

    // Creates the thead with the text and the sorted icon.
    const ColumnSettings = {
      ...ReactTableDefaults.column,
      Header: props => {
        const Sorted = this.getSortedComponent(props.column.id);
        const SortedIcon = !Sorted ? <SortAsc /> : Sorted;

        const sortedIconClasses = Sorted
          ? classes.sortedIconShown
          : classes.sortedIconHidden;

        return (
          <div className={classes.headerContainer}>
            <div className={classNames(classes.rtSortIcon, sortedIconClasses)}>
              {SortedIcon}
            </div>
            {/* Setter of the styles for the header */}
            <div className={classes.headerTextContainer}>
              <Typography
                variant="subtitle2"
                className={classNames(classes.headerProps, {
                  [classes.headerAlphaNumeric]:
                    props.column.cellType === "alpha-numeric" ||
                    props.column.cellType === "link",
                  [classes.headerNumeric]: props.column.cellType === "numeric"
                })}
              >
                {props.column.headerText}
              </Typography>
            </div>
          </div>
        );
      }
    };

    const paginationProps = this.getPaginationProps();
    const serverSizeProps = this.getServerSizeProps();
    const sortProps = this.getSortProps();

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

    // checkbox properties
    const checkboxProps = {
      SelectAllInputComponent: () => (
        <HvCheckBox
          onChange={() => this.toggleAll()}
          checked={selectAll}
          indeterminate={this.isIndeterminateStatus()}
        />
      ),
      SelectInputComponent: props => (
        <HvCheckBox
          checked={this.isSelected(props.id)}
          onChange={() => this.toggleSelection(props.id)}
        />
      )
    };

    const checkUseRoute = useRouter ? getTrProps.bind(this.props) : getTrProps;

    return (
      <div className={classes.tableContainer}>
        {titleText && (
          <div className={classes.title}>
            <div>
              <Typography variant="h3">{titleText}</Typography>
            </div>
            {subtitleText && (
              <div className={classes.subtitle}>
                <Typography variant="body1">{subtitleText}</Typography>
              </div>
            )}
          </div>
        )}
        <Table
          {...other}
          {...tableStyles}
          {...paginationProps}
          {...serverSizeProps}
          {...sortProps}
          {...checkboxProps}
          /* eslint no-return-assign: 0 */
          ref={r => (this.checkboxTable = r)}
          getTheadThProps={this.getTheadThProps}
          getTrProps={getTrProps ? checkUseRoute : this.getTrProps}
          data={data}
          columns={newColumn}
          className="-highlight"
          SubComponent={newSubComponent}
          expanded={expanded}
          keyField={idForCheckbox}
          isSelected={this.isSelected}
        />
      </div>
    );
  }
}

HvTable.propTypes = {
  /**
   * the classes object to be applied into the root object.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * Title of the table.
   */
  titleText: PropTypes.string,
  /**
   * Subtitle of the table.
   */
  subtitleText: PropTypes.string,
  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   Use the property "cellType" to define the different types of cell. Available values: "number" , "alpha-numeric" and "link.
   If the type is "link", in data use the structure {displayText: {text to display} ,url: {url} }.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerText: PropTypes.string,
      accessor: PropTypes.string,
      format: PropTypes.func,
      cellType: PropTypes.string,
      style: PropTypes.instanceOf(Object),
      fixed: PropTypes.string,
      Cell: PropTypes.instanceOf(Object)
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
  useRouter: PropTypes.bool
};

HvTable.defaultProps = {
  titleText: "",
  subtitleText: "",
  showPagination: true,
  showPageSize: true,
  pageSize: undefined,
  onPageSizeChange: () => {},
  paginationServerSide: false,
  pages: undefined,
  onFetchData: () => {},
  sortable: true,
  defaultSorted: [],
  subElementTemplate: null,
  idForCheckbox: ""
};

export default HvTable;
