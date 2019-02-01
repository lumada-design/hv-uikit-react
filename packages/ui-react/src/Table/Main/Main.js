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
import ReactTable, { ReactTableDefaults } from "react-table";
import "react-table/react-table.css";
import PropTypes from "prop-types";

import SortAsc from "react-icons/lib/fa/sort-asc";
import SortDesc from "react-icons/lib/fa/sort-desc";

import ReactTablePagination from "../Pagination";
import { tableStyleOverrides } from "./styles";

class HvTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: props.defaultSorted || [],
      initiallyLoaded: false
    };
  }

  componentDidMount() {
    const { initiallyLoaded } = this.state;
    if (!initiallyLoaded) {
      this.state.initiallyLoaded = true;
    }
  }

  getSortedComponent = id => {
    const { sorted } = this.state;

    const sortInfo = sorted.filter(item => item.id === id);

    if (sortInfo.length) {
      if (sortInfo[0].desc === true) return <SortDesc />;
      if (sortInfo[0].desc === false) return <SortAsc />;
    }
    return false;
  };

  getPaginationProps = () => {
    const { data, pageSize: propsPageSize } = this.props;
    const { showPagination, showPageSize } = this.props;
    const { pageSize = data.length, onPageSizeChange, pages } = this.props;

    return {
      showPagination,
      ...(showPagination && { PaginationComponent: ReactTablePagination }),
      ...(showPagination && onPageSizeChange && { onPageSizeChange }),
      ...(showPagination && pages && { pages }),

      ...(propsPageSize !== undefined && {defaultPageSize: propsPageSize} || pageSize && { defaultPageSize: pageSize }),

      ...{ showPageSizeOptions: showPageSize }
    };
  };

  getServerSizeProps = () => {
    const { paginationServerSide } = this.props;

    return {
      ...(paginationServerSide && { manual: true }),
      ...(paginationServerSide && { onFetchData: this.onFetchDataInternal })
    };
  };

  getSortProps = () => {
    const { sortable, defaultSorted } = this.props;

    return {
      sortable,
      ...(sortable && { defaultSorted }),
      ...(sortable && {
        onSortedChange: sortedColumn => this.setState({ sorted: sortedColumn })
      })
    };
  };

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

  render() {
    const { classes, columns, data, resizable } = this.props;

    const tableStyles = tableStyleOverrides(classes);

    const ColumnSettings = {
      ...ReactTableDefaults.column,
      Header: props => {
        const Sorted = this.getSortedComponent(props.column.id);
        return (
          <React.Fragment>
            {Sorted && <span className={classes.rtSortIcon}>{Sorted}</span>}
            <span>{props.column.headerText}</span>
          </React.Fragment>
        );
      }
    };

    const paginationProps = this.getPaginationProps();
    const serverSizeProps = this.getServerSizeProps();
    const sortProps = this.getSortProps();

    Object.assign(ReactTableDefaults, {
      column: ColumnSettings
    });

    return (
      <ReactTable
        {...tableStyles}
        {...paginationProps}
        {...serverSizeProps}
        {...sortProps}
        data={data}
        columns={columns}
        className="-highlight"
        resizable={resizable}
      />
    );
  }
}

HvTable.propTypes = {
  /**
   * The column definition to apply to the table. Please check https://react-table.js.org/#/story/readme for more info
   */
  columns: PropTypes.instanceOf(Object).isRequired,
  /**
   * Array with the data elements to show
   */
  data: PropTypes.instanceOf(Object).isRequired,
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
  defaultSort: PropTypes.instanceOf(Object),
};

HvTable.defaultProps = {
  showPagination: true,
  showPageSize: true,
  pageSize: undefined,
  onPageSizeChange: () => {},
  paginationServerSide: false,
  pages: undefined,
  onFetchData: () => {},
  sortable: true,
  defaultSort: {}
};

export default HvTable;
