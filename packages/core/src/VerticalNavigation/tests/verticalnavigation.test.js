/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvVerticalNavigation } from "../..";
import { Main, Collapsable } from "../stories/VerticalNavigation.stories";

describe("<VerticalNavigation />", () => {
  const toggleOpenCallbackMock = jest.fn();

  let wrapper;

  describe("collapsable closed vertical navigation", () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });

  describe("collapsable open vertical navigation", () => {
    wrapper = mount(
      <HvProvider>
        <Collapsable />
      </HvProvider>
    );

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <HvVerticalNavigation
            isOpen
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </HvVerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <HvVerticalNavigation
            isOpen={false}
            isCollapsable={false}
            position="fixed"
            toggleOpenCallback={toggleOpenCallbackMock}
          >
            <div>1</div>
            <div>2</div>
          </HvVerticalNavigation>
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });
});
