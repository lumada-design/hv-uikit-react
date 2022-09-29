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
  const { ResizeObserver } = window;
  let wrapper;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Main />
      </HvProvider>
    );
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

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
      <HvProvider cssBaseline="none">
        <LimitedToFivePaths />
      </HvProvider>
    ).exists("DropDownMenu");

    expect(existsDropdownMenu).toBe(true);
  });

  it("should present always two paths", () => {
    const separatorList = mount(
      <HvProvider cssBaseline="none">
        <LimitedToTwoPaths />
      </HvProvider>
    ).find(DropRightXS);

    expect(separatorList.length).toBe(2);
  });

  it("should create a breadcrumb with 4 pages from url", () => {
    const separatorList = mount(
      <HvProvider cssBaseline="none">
        <WithURL />
      </HvProvider>
    ).find(DropRightXS);

    expect(separatorList.length).toBe(3);
  });
});
