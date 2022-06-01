import React from "react";
import { mount } from "enzyme";

import { DropRightXS } from "@hitachivantara/uikit-react-icons";
import { HvBreadcrumb, HvProvider } from "../..";
import {
  Main,
  LimitedToFivePaths,
  LimitedToTwoPaths,
  WithURL,
} from "../stories/BreadCrumb.stories";

describe("Breadcrumb", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvBreadcrumb)).toMatchSnapshot();
  });

  it("should render the Breadcrumb component", () => {
    const component = wrapper.find(HvBreadcrumb);
    expect(component.length).toBe(1);
  });

  it("should create a breadcrumb with 9 pages", () => {
    const separatorList = wrapper.find(DropRightXS);
    expect(separatorList.length).toBe(8);
  });

  it("should create a breadcrumb with submenu", () => {
    const existsDropdownMenu = mount(
      <HvProvider disableCssBaseline>
        <LimitedToFivePaths />
      </HvProvider>
    ).exists("DropDownMenu");

    expect(existsDropdownMenu).toBe(true);
  });

  it("should present always two paths", () => {
    const separatorList = mount(
      <HvProvider disableCssBaseline>
        <LimitedToTwoPaths />
      </HvProvider>
    ).find(DropRightXS);

    expect(separatorList.length).toBe(2);
  });

  it("should create a breadcrumb with 4 pages from url", () => {
    const separatorList = mount(
      <HvProvider disableCssBaseline>
        <WithURL />
      </HvProvider>
    ).find(DropRightXS);

    expect(separatorList.length).toBe(3);
  });
});
