/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";

import VerticalNavigation from "../index";

describe("<VerticalNavigation />", () => {
  const toggleOpenCallbackMock = jest.fn();

  let wrapper;

  describe("collapsable closed vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen={false}
            isCollapsable
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen
            isCollapsable
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <VerticalNavigation
            isOpen={false}
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </VerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
