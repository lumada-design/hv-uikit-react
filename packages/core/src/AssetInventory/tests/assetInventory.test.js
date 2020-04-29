import React from "react";
import { mount, shallow } from "enzyme";
import HvProvider from "../../Provider";
import AssetInventory from "../index";
import Search from "../Search/Search";

describe("Asset Inventory ", () => {
  let wrapper;

  // eslint-disable-next-line no-unused-vars
  const MockView = (id, selectedValues) => <div id={id} />;

  const mockConfiguration = { metadata: [] };

  const values = [
    {
      id: "1",
      name: "AA",
      birthday: "1900-01-01",
      number: 20
    },
    {
      id: "2",
      name: "HH",
      birthday: "1950-01-01",
      number: 92
    },
    {
      id: "3",
      name: "ZZ",
      birthday: "1923-01-01",
      number: 1
    }
  ];

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <AssetInventory values={values} configuration={[]}>
          <div id="id0" />
        </AssetInventory>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(AssetInventory)).toMatchSnapshot();
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
          sortableLabelDesc: "Name descending"
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    const sort = wrapper.find("Sort");

    expect(sort.length).toBe(1);
  });

  it("shouldn't render sort", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric"
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

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
          searchable: true
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    const search = wrapper.find(Search);

    expect(search.length).toBe(1);
  });

  it("shouldn't render correctly search", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric"
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    const search = wrapper.find("Search");

    expect(search.length).toBe(0);
  });

  it("should correctly filter alpha-numeric values", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "name",
          cellType: "alpha-numeric",
          searchable: true
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    let instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    const search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: "a" } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(1);
    expect(instance.state.viewValues[0].name).toBe("AA");
  });

  it("should correctly filter numeric values", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "number",
          cellType: "numeric",
          searchable: true
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    let instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    const search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: "2" } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(2);
  });

  it("should correctly filter custom values", () => {
    const configuration = {
      metadata: [
        {
          id: "id1",
          accessor: "number",
          cellType: "numeric",
          searchable: true,
          searchFunction: (evalValue, searchValue) => evalValue > searchValue
        }
      ]
    };

    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={configuration}>
          <MockView id="id" />
        </AssetInventory>
      </HvProvider>
    );

    let instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    let search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: "0" } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: "10" } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(2);

    search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: "50" } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(1);
  });

  it("should correctly switch views", () => {
    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={mockConfiguration}>
          <MockView id="view1">test1</MockView>
          <MockView id="view2" />
        </AssetInventory>
      </HvProvider>
    );

    let view = wrapper.findWhere(n => n.type() === MockView && n.prop("id") === "view1");

    expect(view.exists()).toBe(true);

    view = wrapper.findWhere(n => n.type() === MockView && n.prop("id") === "view2");

    expect(view.exists()).toBe(false);

    wrapper
      .findWhere(n => n.type() === "button" && n.prop("id") === "view2-button")
      .simulate("click");

    view = wrapper.findWhere(n => n.type() === MockView && n.prop("id") === "view2");

    expect(view.exists()).toBe(true);

    view = wrapper.findWhere(n => n.type() === MockView && n.prop("id") === "view1");

    expect(view.exists()).toBe(false);
  });

  it("should render pagination", () => {
    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={{ metadata: [] }} hasPagination>
          <MockView id="view1">test1</MockView>
        </AssetInventory>
      </HvProvider>
    );

    const pagination = wrapper.find("Pagination");

    expect(pagination.length).toBe(1);
  });

  it("should present a subset of data using pagination, calculating the page total", () => {
    const val = [
      {
        id: "1",
        name: "AA"
      },
      {
        id: "2",
        name: "BB"
      },
      {
        id: "3",
        name: "CC"
      },
      {
        id: "4",
        name: "DD"
      },
      {
        id: "5",
        name: "EE"
      },
      {
        id: "6",
        name: "FF"
      }
    ];

    wrapper = mount(
      <HvProvider>
        <AssetInventory
          id="hv-pagination"
          values={val}
          configuration={mockConfiguration}
          hasPagination
          pageSize={2}
        >
          <MockView id="view1">test1</MockView>
        </AssetInventory>
      </HvProvider>
    );

    const instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(2);

    const totalPages = wrapper.findWhere(
      n => n.type() === "span" && n.prop("id") === "hv-pagination-totalPages"
    );

    expect(totalPages.text()).toBe("3");
  });

  it("should change the subset of data using pagination", () => {
    const val = [
      {
        id: "1",
        name: "AA"
      },
      {
        id: "2",
        name: "BB"
      },
      {
        id: "3",
        name: "CC"
      },
      {
        id: "4",
        name: "DD"
      },
      {
        id: "5",
        name: "EE"
      },
      {
        id: "6",
        name: "FF"
      }
    ];

    wrapper = mount(
      <HvProvider>
        <AssetInventory
          id="hv-pagination"
          values={val}
          configuration={mockConfiguration}
          hasPagination
          pageSize={2}
        >
          <MockView id="view1">test1</MockView>
        </AssetInventory>
      </HvProvider>
    );

    const instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues[0].id).toBe("1");
    expect(instance.state.viewValues[1].id).toBe("2");

    wrapper
      .findWhere(n => n.type() === "button" && n.prop("id") === "hv-pagination-nextPage-button")
      .simulate("click");

    expect(instance.state.viewValues.length).toBe(2);

    expect(instance.state.viewValues[0].id).toBe("3");
    expect(instance.state.viewValues[1].id).toBe("4");
  });
});
