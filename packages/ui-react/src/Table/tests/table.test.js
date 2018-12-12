/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ReactTable from "react-table";

import HvTable from "../Main/Main";
import theme from "../../theme";

describe("Hv Table", () => {
  let wrapper;

  describe("index", () => {
    beforeEach(async () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable columns={[]} theme={theme} />
        </MuiThemeProvider>
      );
    });

    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });

    it("mandatory and default properties are defined and received by React Table", () => {
      const table = wrapper.find(ReactTable);
      const tableProps = table.props();

      expect(tableProps.columns).toBeDefined();
      expect(tableProps.data).toBeDefined();
      expect(tableProps.defaultPageSize).toBeDefined();
      expect(tableProps.resizable).toBeDefined();
      expect(tableProps.pageText).toBeDefined();
    });
  });

  describe("is rendered correctly and behaves as expected", () => {
    it("and if 'columns' is avaialble it is rendered", () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable columns={[]} theme={theme} />
        </MuiThemeProvider>
      );

      const reactTable = wrapper.find(ReactTable);
      expect(reactTable).toHaveLength(1);
    });

    it("and if 'columns' is not empty, columns are displayed", () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable
            theme={theme}
            columns={[
              { Header: "column 1" },
              { Header: "column 2" },
              { Header: "column 3" }
            ]}
          />
        </MuiThemeProvider>
      );

      const headers = wrapper
        .find(".ReactTable .rt-table .rt-thead.-header .rt-tr")
        .children();
      expect(headers).toHaveLength(3);
    });

    it("and if 'data' is provided, rows are the same length of 'data'", () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable
            theme={theme}
            columns={[{ headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          />
        </MuiThemeProvider>
      );

      const rowCount = wrapper
        .find(".rt-td")
        .reduce((count, r) => (r.text().length > 1 ? count + 1 : count), 0);
      expect(rowCount).toBe(3);
    });

    it("and if 'defaultPageSize' is provided, default Page Size is set", () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable theme={theme} columns={[]} data={[]} defaultPageSize={5} />
        </MuiThemeProvider>
      );

      const pageSize = wrapper.find(".-pageSizeOptions select");

      expect(pageSize.props().value).toBe(5);
    });

    it("and if 'cellHeight' is provided, row height is set to that value in pixel", () => {
      wrapper = mount(
        <MuiThemeProvider theme={theme}>
          <HvTable
            theme={theme}
            columns={[{ headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            cellHeight={32}
          />
        </MuiThemeProvider>
      );

      const rowStyle = wrapper.find(".rt-td").get(0).props.style;

      expect(rowStyle.height).toBe(32);
    });
  });
});
