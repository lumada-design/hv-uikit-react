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
import { mount, shallow } from "enzyme";

import HvProvider from "../../Provider";
import BreadcrumbWithStyles from "../index";
import Breadcrumb from "../Main";
import AngleForwards12 from "@hv-ui/icons/core/XS-icons/AngleForwards12";
import DropDownMenu from "../../DropDownMenu";

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
  const wrapper = shallow(
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
