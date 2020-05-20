/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import ReactTable from "react-table";
import HvProvider from "../../Provider";
import HvPagination from "../../Pagination";
import DropDownMenu from "../../DropDownMenu";
import NoData from "../NoData";
import HvTable from "..";
import { CustomEmpty } from "../stories/Table.stories";

/* eslint-disable no-console */

describe("Hv Table", () => {
  let wrapper;

  const originalWarn = console.warn;
  const eventMock = {};

  describe("index", () => {
    beforeEach(async () => {
      // Expected warning "Please update the following components: ReactTable"
      console.warn = jest.fn();

      wrapper = mount(
        <HvProvider>
          <HvTable
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          />
        </HvProvider>
      );

      console.warn = originalWarn;
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
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
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
            columns={[
              { id: 1, Header: "column 1" },
              { id: 2, Header: "column 2" },
              { id: 3, Header: "column 3" }
            ]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          />
        </HvProvider>
      );

      const headers = wrapper.find(".ReactTable .rt-table .rt-thead.-header .rt-tr").children();
      expect(headers).toHaveLength(3);
    });

    it("and if 'data' is provided, rows are the same length of 'data'", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
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
            columns={[]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            pageSize={5}
          />
        </HvProvider>
      );

      const pageSize = wrapper.find("select");
      expect(pageSize.props().value).toBe(5);
    });

    it("and if 'data' is empty, don't render pagination", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable columns={[]} data={[]} pageSize={5} />
        </HvProvider>
      );

      expect(wrapper.find(HvPagination).exists()).toBe(false);
    });

    it("should render no data component if no data exists", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable columns={[]} data={[]} pageSize={5} />
        </HvProvider>
      );

      expect(wrapper.find(NoData).exists()).toBe(true);
    });

    it("should render a custom no data component when passed and no data exists", () => {
      wrapper = mount(
        <HvProvider>
          <CustomEmpty />
        </HvProvider>
      );

      expect(wrapper.find("#emptyState").exists()).toBe(true);
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

      const instance = wrapper.find("Table").instance();
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

      const instance = wrapper.find("Table").instance();
      instance.toggleAll(eventMock);
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

      const instance = wrapper.find("Table").instance();
      instance.toggleSelection(eventMock, column[0].id);
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

      const instance = wrapper.find("Table").instance();
      instance.toggleSelection(eventMock, column[0].id);
      expect(instance.state.selection).toEqual([column[0].id]);
      instance.toggleSelection(eventMock, column[0].id);
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

      const instance = wrapper.find("Table").instance();
      instance.toggleSelection(eventMock, column[0].id);
      expect(instance.state.selection).toEqual([column[0].id]);
    });

    it("should add an expander if the subElementTemplate is defined", () => {
      const subElementTemplate = () => <div />;
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

      const expander = wrapper.find({ role: "button" });
      expect(expander.length).toEqual(3);
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

      const instance = wrapper.find("Table").instance();
      instance.state.initiallyLoaded = true;
      instance.onFetchDataInternal(instance.state);
      expect(fetchDataMock).toHaveBeenCalled();
    });

    it("should render extra column for secondary actions", () => {
      const classesToApply = {
        alphaNumeric: "alphaNumeric-random",
        numeric: "numeric-random"
      };
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" }
      ];
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={classesToApply}
            columns={columns}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            pageSize={5}
            secondaryActions={[
              {
                label: "label 1",
                action: () => {}
              },
              {
                label: "label 2",
                action: () => {}
              }
            ]}
          />
        </HvProvider>
      );

      expect(columns.length).toEqual(4);
      const dropdowns = wrapper.find(DropDownMenu);
      expect(dropdowns.length).toEqual(3);
    });

    it("should not render secondary actions when noActions set", () => {
      const classesToApply = {
        alphaNumeric: "alphaNumeric-random",
        numeric: "numeric-random"
      };
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" }
      ];
      wrapper = mount(
        <HvProvider>
          <HvTable
            classes={classesToApply}
            columns={columns}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3", noActions: true }]}
            pageSize={5}
            secondaryActions={[
              {
                label: "label 1",
                action: () => {}
              },
              {
                label: "label 2",
                action: () => {}
              }
            ]}
          />
        </HvProvider>
      );

      expect(columns.length).toEqual(4);
      const dropdowns = wrapper.find(DropDownMenu);
      expect(dropdowns.length).toEqual(2);
    });
  });
});
