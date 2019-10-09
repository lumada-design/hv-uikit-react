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
import { mount, shallow } from "enzyme";
import HvProvider from "../../Provider";
import AssetInventory from "../index";
import Search from "../Search/Search";

describe("Asset Inventory ", () => {
  let wrapper;

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
          <div />
        </AssetInventory>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
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
          <div id="id" />
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
          <div id="id" />
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
          <div id="id" />
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
          <div id="id" />
        </AssetInventory>
      </HvProvider>
    );

    const search = wrapper.find("Search");

    expect(search.length).toBe(0);
  });

  // it("should correctly sort alpha-numeric values", () => { });

  // it("should correctly sort numeric values", () => { });

  // it("should correctly sort date values", () => { });

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
          <div id="id" />
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
          <div id="id" />
        </AssetInventory>
      </HvProvider>
    );

    let instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    const search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: 2 } });

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
          <div id="id" />
        </AssetInventory>
      </HvProvider>
    );

    let instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    let search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: 0 } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(3);

    search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: 10 } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(2);

    search = wrapper.find(Search).find("input");
    search.simulate("change", { target: { value: 50 } });

    instance = wrapper.find("AssetInventory").instance();

    expect(instance.state.viewValues.length).toBe(1);
  });

  it("should correctly switch views", () => {
    wrapper = mount(
      <HvProvider>
        <AssetInventory values={values} configuration={[]}>
          <div id="view1">test1</div>
          <div id="view2" />
        </AssetInventory>
      </HvProvider>
    );

    let view = wrapper.findWhere(
      n => n.type() === "div" && n.prop("id") === "view1"
    );

    expect(view.exists()).toBe(true);

    view = wrapper.findWhere(
      n => n.type() === "div" && n.prop("id") === "view2"
    );

    expect(view.exists()).toBe(false);

    wrapper
      .findWhere(n => n.type() === "button" && n.prop("id") === "view2")
      .simulate("click");

    view = wrapper.findWhere(
      n => n.type() === "div" && n.prop("id") === "view2"
    );

    expect(view.exists()).toBe(true);

    view = wrapper.findWhere(
      n => n.type() === "div" && n.prop("id") === "view1"
    );

    expect(view.exists()).toBe(false);
  });
});
