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
import { ReactTableDefaults } from "react-table";

import ReactTablePagination from "../Pagination";
import SortAsc from "react-icons/lib/fa/sort-asc";
import SortDesc from "react-icons/lib/fa/sort-desc";

import "react-table/react-table.css";
import "./style.css";

class HvTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: []
    };
  }

  getSortedComponent = id => {
    let sortInfo = this.state.sorted.filter(item => item.id === id);
    if (sortInfo.length) {
      if (sortInfo[0].desc === true) return <SortDesc />;
      if (sortInfo[0].desc === false) return <SortAsc />;
    }
    return false;
  };

  render() {
    const {
      cellHeight,
      columns,
      data,
      defaultPageSize,
      headerHeight,
      resizable
    } = this.props;

    const ColumnSettings = {
      ...ReactTableDefaults.column,
      style: { height: cellHeight },
      headerStyle: { height: headerHeight },
      Header: props => {
        const Sorted = this.getSortedComponent(props.column.id);
        return (
          <React.Fragment>
            {Sorted && <span className="rt-sort-icon">{Sorted}</span>}
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
        data={data}
        onSortedChange={sorted => this.setState({ sorted })}
        columns={columns}
        className="-highlight"
        PaginationComponent={ReactTablePagination}
        pageText=""
      />
    );
  }
}

export default HvTable;
