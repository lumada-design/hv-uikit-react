/* eslint-disable no-console */
import React from "react";
import { mount, shallow } from "enzyme";
import { HvProvider, HvAssetInventory } from "../..";
import Search from "../Search/Search";

describe("Asset Inventory ", () => {
  let wrapper;

  const consoleSpy = jest.fn();
  const originalWarn = console.warn;

  beforeEach(() => {
    consoleSpy.mockReset();
    console.warn = consoleSpy;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  const MockView = (id) => <div id={id} />;

  const setupComponent = (props, children = <MockView id="id" />) => (
    <HvProvider disableCssBaseline>
      <HvAssetInventory {...props}>{children}</HvAssetInventory>
    </HvProvider>
  );

  const values = [
    {
      id: "1",
      name: "AA",
      birthday: "1900-01-01",
      number: 20,
    },
    {
      id: "2",
      name: "HH",
      birthday: "1950-01-01",
      number: 92,
    },
    {
      id: "3",
      name: "ZZ",
      birthday: "1923-01-01",
      number: 1,
    },
  ];

  beforeEach(() => {
    wrapper = shallow(setupComponent({ values, configuration: [] }, <div id="id0" />));
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvAssetInventory)).toMatchSnapshot();
  });

  it("should render correctly sort", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric",
          sortable: true,
          sortableLabelAsc: "Name ascending",
          sortableLabelDesc: "Name descending",
        },
      ],
    };

    wrapper = mount(setupComponent({ values, configuration }));

    const sort = wrapper.find("Sort");

    expect(sort.length).toBe(1);
  });

  it("shouldn't render sort", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric",
        },
      ],
    };

    wrapper = mount(setupComponent({ values, configuration }));

    const sort = wrapper.find("Sort");

    expect(sort.length).toBe(0);
  });

  it("should render correctly search", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric",
          searchable: true,
        },
      ],
    };

    wrapper = mount(setupComponent({ values, configuration }));

    const search = wrapper.find(Search);

    expect(search.length).toBe(1);
  });

  it("shouldn't render correctly search", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric",
        },
      ],
    };

    wrapper = mount(setupComponent({ values, configuration }));

    const search = wrapper.find("Search");

    expect(search.length).toBe(0);
  });

  it("should render pagination", () => {
    wrapper = mount(
      setupComponent({ values, configuration: { metadata: [] }, hasPagination: true })
    );

    const pagination = wrapper.find("Pagination");

    expect(pagination.length).toBe(1);
  });

  it("shouldn't render pagination when no data exist", () => {
    wrapper = mount(
      setupComponent({ values: [], configuration: { metadata: [] }, hasPagination: true })
    );

    const pagination = wrapper.find("Pagination");

    expect(pagination.length).toBe(0);
  });
});
