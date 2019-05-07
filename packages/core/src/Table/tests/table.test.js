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

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import ReactTable from "react-table";
import HvProvider from "../../Provider";
import HvTableWithStyles from "../index";
import HvTable from "../Table";
import theme from "../../theme";

describe("Hv Table", () => {
  let wrapper;

  describe("index", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <HvTableWithStyles
            classes={{}}
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            theme={theme}
          />
        </HvProvider>
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
    const data = [
      { t1: "test1", link: { displayText: "mock", url: "mock" } },
      { t1: "test2", link: { displayText: "mock", url: "mock" } },
      { t1: "test3", link: { displayText: "mock", url: "mock" } }
    ];
    const column = [
      { id: 1, Header: "column 1", cellType: "alpha-numeric" },
      { id: 2, Header: "column 2", cellType: "numeric" },
      { id: 3, Header: "column 3", cellType: "link" }
    ];
    const defaultSorted = [{ id: 1, desc: true }];

    it("and if 'columns' is avaialble it is rendered", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            theme={theme}
          />
        </HvProvider>
      );

      const reactTable = wrapper.find(ReactTable);
      expect(reactTable).toHaveLength(1);
    });

    it("and if 'columns' is not empty, columns are displayed", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            theme={theme}
            columns={[
              { id: 1, Header: "column 1" },
              { id: 2, Header: "column 2" },
              { id: 3, Header: "column 3" }
            ]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          />
        </HvProvider>
      );

      const headers = wrapper
        .find(".ReactTable .rt-table .rt-thead.-header .rt-tr")
        .children();
      expect(headers).toHaveLength(3);
    });

    it("and if 'data' is provided, rows are the same length of 'data'", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            theme={theme}
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          />
        </HvProvider>
      );

      const rowCount = wrapper.find(".rt-td").length;
      expect(rowCount).toBe(3);
    });

    it("and if 'defaultPageSize' is provided, default Page Size is set", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            theme={theme}
            columns={[]}
            data={[]}
            pageSize={5}
          />
        </HvProvider>
      );

      const pageSize = wrapper.find(".-pageSizeOptions select");

      expect(pageSize.props().value).toBe(5);
    });

    it("and if 'defaultPageSize' is provided, default Page Size is set", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            theme={theme}
            columns={[]}
            data={[]}
            pageSize={5}
          />
        </HvProvider>
      );

      const pageSize = wrapper.find(".-pageSizeOptions select");

      expect(pageSize.props().value).toBe(5);
    });

    it("and if 'defaultPageSize' is provided, default Page Size is set", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            theme={theme}
            columns={[]}
            data={[]}
            pageSize={5}
          />
        </HvProvider>
      );

      const pageSize = wrapper.find(".-pageSizeOptions select");

      expect(pageSize.props().value).toBe(5);
    });

    it("should mark the sorted column ", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.setState({ sorted: [column[0]] });
      instance.getTheadThProps("state", "rowInfo", column[0]);
      expect(column[0].className).toContain("sorted");
    });

    it("should set column alignment ", () => {
      const classesToApply = {
        alphaNumeric: "alphaNumeric-random",
        numeric: "numeric-random"
      };
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={classesToApply}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.setState({ sorted: [column[0]] });
      instance.getTheadThProps("state", "rowInfo", column[0]);
      expect(column[0].className).toContain(classesToApply.alphaNumeric);
      expect(column[0].className).toContain("alphaNumeric");

      instance.getTheadThProps("state", "rowInfo", column[1]);
      expect(column[1].className).toContain(classesToApply.numeric);

      instance.getTheadThProps("state", "rowInfo", column[2]);
      expect(column[2].className).toContain(classesToApply.alphaNumeric);
      expect(column[2].className).toContain("link");
    });

    it("should highlight the sorted column", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
          />
        </HvProvider>
      );
      const internalColumnRepresentation = {
        className: "something"
      };

      const instance = wrapper.find(HvTable).instance();
      instance.highlightSortedColumn([column[0]], internalColumnRepresentation);
      expect(internalColumnRepresentation.className).toBe("sorted");
    });

    it("should return an icon when sorted column in descending order", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
          />
        </HvProvider>
      );
      const internalColumnRepresentation = {
        className: "something"
      };

      const instance = wrapper.find(HvTable).instance();
      instance.highlightSortedColumn([column[0]], internalColumnRepresentation);
      expect(internalColumnRepresentation.className).toBe("sorted");
      const sortedIcon = instance.getSortedComponent(1);
      expect(sortedIcon).toBeDefined();
    });

    it("should return an icon when sorted column ascending order", () => {
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" }
      ];
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={columns}
            defaultSorted={[{ id: 1, desc: false }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            pageSize={5}
          />
        </HvProvider>
      );
      const internalColumnRepresentation = {
        className: "something"
      };

      const instance = wrapper.find(HvTable).instance();
      instance.highlightSortedColumn(
        [columns[0]],
        internalColumnRepresentation
      );
      expect(internalColumnRepresentation.className).toBe("sorted");
      const sortedIcon = instance.getSortedComponent(1);
      expect(sortedIcon).toBeDefined();
    });

    it("should select all values", () => {
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" }
      ];
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={columns}
            defaultSorted={defaultSorted}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            pageSize={5}
            idForCheckbox="id"
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.toggleAll();
      expect(instance.state.selectAll).toBe(true);
    });

    it("should select one value", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
            idForCheckbox="id"
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.toggleSelection(column[0].id);
      expect(instance.state.selection).toEqual([column[0].id]);
    });

    it("should deselect one value", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
            idForCheckbox="id"
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.toggleSelection(column[0].id);
      expect(instance.state.selection).toEqual([column[0].id]);
      instance.toggleSelection(column[0].id);
      expect(instance.state.selection).not.toEqual([column[0].id]);
      expect(instance.state.selectAll).toBe(false);
    });

    it("should check if the value is selected", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
            idForCheckbox="id"
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.toggleSelection(column[0].id);
      expect(instance.state.selection).toEqual([column[0].id]);
      const isSelected = instance.isSelected(column[0].id);
      expect(isSelected).toEqual(true);
    });

    it("should add an expander if the subElementTemplate is defined", () => {
      const subElementTemplate = () => <div />;
      const rowInfo = {
        row: "row",
        viewIndex: 1
      };
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
            subElementTemplate={subElementTemplate}
            idForCheckbox="id"
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      const row = instance.getTrProps("state", rowInfo);
      expect(row.onClick).toBeInstanceOf(Function);
    });

    it("should fetch data", () => {
      const fetchDataMock = jest.fn(() => "mock");
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={{}}
            columns={column}
            data={data}
            defaultSorted={defaultSorted}
            pageSize={5}
            idForCheckbox="id"
            onFetchData={fetchDataMock}
          />
        </HvProvider>
      );

      const instance = wrapper.find(HvTable).instance();
      instance.state.initiallyLoaded = true;
      instance.onFetchDataInternal(instance.state);
      expect(fetchDataMock).toHaveBeenCalled();
    });
  });
});
