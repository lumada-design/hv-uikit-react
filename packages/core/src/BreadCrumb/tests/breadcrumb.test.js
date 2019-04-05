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

import AngleForwards12 from "@hv/uikit-react-icons/dist/DropRight.XS";
import HvProvider from "../../Provider";
import BreadcrumbWithStyles from "../index";
import Breadcrumb from "../BreadCrumb";

const listRoute = [
  {
    label: "label",
    path: "path"
  },
  {
    label: "label",
    path: "path"
  },
  {
    label: "label",
    path: "path"
  },
  {
    label: "label",
    path: "path"
  },
  {
    label: "label",
    path: "path"
  }
];

describe("Breadcrumb withStyles", () => {
  const wrapper = mount(
    <HvProvider>
      <BreadcrumbWithStyles />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Breadcrumb component", () => {
    const CardComponent = wrapper.find(Breadcrumb);
    expect(CardComponent.length).toBe(1);
  });

  it("should create a breadcrumb with 5 pages", () => {
    const separatorList = mount(
      <HvProvider>
        <BreadcrumbWithStyles listRoute={listRoute} />
      </HvProvider>
    ).find(AngleForwards12);

    expect(separatorList.length).toBe(4);
  });

  it("should create a breadcrumb with submenu", () => {
    const existsDropdownMenu = mount(
      <HvProvider>
        <BreadcrumbWithStyles listRoute={listRoute} maxVisible={2} />
      </HvProvider>
    ).exists("DropDownMenu");

    expect(existsDropdownMenu).toBe(true);
  });

  it("should present always two paths", () => {
    const separatorList = mount(
      <HvProvider>
        <BreadcrumbWithStyles listRoute={listRoute} maxVisible={0} />
      </HvProvider>
    ).find(AngleForwards12);

    expect(separatorList.length).toBe(2);
  });

  it("should create a breadcrumb with 4 pages from url", () => {
    const separatorList = mount(
      <HvProvider>
        <BreadcrumbWithStyles url="http://test/a/b/c/d" />
      </HvProvider>
    ).find(AngleForwards12);

    expect(separatorList.length).toBe(3);
  });
});
