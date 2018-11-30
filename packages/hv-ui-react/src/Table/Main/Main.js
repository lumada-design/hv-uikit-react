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
import ReactTable from "react-table";
import PropTypes from "prop-types";
import { ReactTableDefaults } from "react-table";

import ReactTablePagination from "../Pagination";
import SortAsc from "react-icons/lib/fa/sort-asc";
import SortDesc from "react-icons/lib/fa/sort-desc";

import "react-table/react-table.css";
import styles from "./styles.js";

class HvTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: props.defaultSorted || [],
      pages: null,
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

  onFetchDataInternal = tableState => {
    const { onFetchData } = this.props;
    const { initiallyLoaded, sorted: sortedFromState } = this.state;
    const { pageSize, page, sorted } = tableState;

    if(initiallyLoaded) {
      let cursor = `${page * pageSize}`;

      if(sortedFromState[0] !== sorted[0]) {
        cursor = "0";
      }

      onFetchData(cursor, pageSize, sorted);
    }
  };

  render() {
    const {
      classes,
      cellHeight,
      columns,
      data,
      defaultPageSize,
      defaultSorted,
      headerHeight,
      resizable,
      onPageSizeChange,
      pages
    } = this.props;

    const composedStyles = styles(this.props.theme);

    const ColumnSettings = {
      ...ReactTableDefaults.column,
      style: { height: cellHeight },
      headerStyle: { height: headerHeight },
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

    Object.assign(ReactTableDefaults, {
      column: ColumnSettings,
      resizable,
      defaultPageSize
    });

    return (
      <ReactTable
        {...composedStyles}
        data={data}
        onSortedChange={sorted => this.setState({ sorted })}
        columns={columns}
        className="-highlight"
        PaginationComponent={ReactTablePagination}
        manual
        onFetchData={this.onFetchDataInternal}
        onPageSizeChange={onPageSizeChange}
        pages={pages}
        defaultSorted={defaultSorted}
      />
    );
  }
}

HvTable.propTypes = {
  columns: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  defaultPageSize: PropTypes.number,
  resizable: PropTypes.bool,
  pageText: PropTypes.string
};

HvTable.defaultProps = {
  columns: [],
  data: [],
  defaultPageSize: 10,
  resizable: true,
  pageText: ""
};

export default HvTable;
