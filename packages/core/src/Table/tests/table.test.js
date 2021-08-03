/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import ReactTable from "react-table";
import { HvDropDownMenu, HvPagination, HvProvider, HvTable } from "../..";
import Select from "../../Pagination/Select";
import NoData from "../NoData";
import { CustomEmpty } from "../stories/Table.stories";

/* eslint-disable no-console */

describe("Hv Table", () => {
  let wrapper;

  const originalWarn = console.warn;

  // https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
  const { ResizeObserver } = window;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

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
      { id: 1, t1: "test1", link: { displayText: "mock", url: "mock" } },
      { id: 2, t1: "test2", link: { displayText: "mock", url: "mock" } },
      { id: 3, t1: "test3", link: { displayText: "mock", url: "mock" } },
    ];
    const column = [
      { Header: "column 1", cellType: "alpha-numeric" },
      { Header: "column 2", cellType: "numeric" },
      { Header: "column 3", cellType: "link" },
    ];
    const defaultSorted = [{ id: 1, desc: true }];

    it("and if 'columns' is available it is rendered", () => {
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
              { id: 3, Header: "column 3" },
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

    it("and if 'pageSize' is provided and showPagination is true, defaultPageSize is set", () => {
      wrapper = mount(
        <HvProvider>
          <HvTable
            columns={[]}
            data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
            pageSize={5}
          />
        </HvProvider>
      );

      const pageSize = wrapper.find(Select);
      expect(pageSize.props().value).toBe(5);
    });

    it("and if 'pageSize' is provided and showPagination is false, pageSize is set, even after first render", () => {
      wrapper = mount(
        <HvTable
          columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
          data={[{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }]}
          pageSize={5}
          showPagination={false}
        />,
        {
          wrappingComponent: HvProvider,
        }
      );

      const getRowCount = () => wrapper.find(".rt-td").length;

      expect(getRowCount()).toBe(5);

      wrapper.setProps({ pageSize: 6 });
      wrapper.update();

      expect(getRowCount()).toBe(6);
    });

    it("and if `pageSize` is not provided and showPagination is false, rows grow when 'data' grows", () => {
      const initialData = [{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }];

      wrapper = mount(
        <HvTable
          columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
          data={initialData}
          showPagination={false}
        />,
        {
          wrappingComponent: HvProvider,
        }
      );

      const getRowCount = () => wrapper.find(".rt-td").length;

      expect(getRowCount()).toBe(3);

      const newRow = { t1: "test4" };
      wrapper.setProps({ data: initialData.concat(newRow) });
      wrapper.update();

      expect(getRowCount()).toBe(4);
    });

    it(
      "and if `pageSize` is not provided and showPagination is false, " +
        "onPageSizeChange is called when page size changes",
      () => {
        const initialData = [{ t1: "test1" }, { t1: "test2" }, { t1: "test3" }];

        const onPageSizeChange = jest.fn();

        wrapper = mount(
          <HvTable
            columns={[{ id: 1, headerText: "test 1", accessor: "t1" }]}
            data={initialData}
            showPagination={false}
            onPageSizeChange={onPageSizeChange}
          />,
          {
            wrappingComponent: HvProvider,
          }
        );

        const newRow = { t1: "test4" };
        wrapper.setProps({ data: initialData.concat(newRow) });

        expect(onPageSizeChange).toHaveBeenCalledTimes(1);
      }
    );

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
            showPagination={false}
            showPageSize={false}
          />
        </HvProvider>
      );

      const expander = wrapper.find("button");
      expect(expander.length).toEqual(3);
    });

    it("should render extra column for secondary actions", () => {
      const classesToApply = {
        alphaNumeric: "alphaNumeric-random",
        numeric: "numeric-random",
      };
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" },
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
                action: () => {},
              },
              {
                label: "label 2",
                action: () => {},
              },
            ]}
          />
        </HvProvider>
      );

      expect(columns.length).toEqual(4);
      const dropdowns = wrapper.find(HvDropDownMenu);
      expect(dropdowns.length).toEqual(3);
    });

    it("should not render secondary actions when noActions set", () => {
      const classesToApply = {
        alphaNumeric: "alphaNumeric-random",
        numeric: "numeric-random",
      };
      const columns = [
        { id: 1, Header: "column 1", desc: false },
        { id: 2, Header: "column 2" },
        { id: 3, Header: "column 3" },
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
                action: () => {},
              },
              {
                label: "label 2",
                action: () => {},
              },
            ]}
          />
        </HvProvider>
      );

      expect(columns.length).toEqual(4);
      const dropdowns = wrapper.find(HvDropDownMenu);
      expect(dropdowns.length).toEqual(2);
    });
  });
});
