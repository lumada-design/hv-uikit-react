/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvVerticalNavigation } from "../..";
import { Main, Collapsable } from "../stories/VerticalNavigation.stories";

describe("[v3] <VerticalNavigation />", () => {
  const toggleOpenCallbackMock = jest.fn();

  let wrapper;

  describe("[v3] collapsable closed vertical navigation", () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });

  describe("[v3] collapsable open vertical navigation", () => {
    wrapper = mount(
      <HvProvider>
        <Collapsable />
      </HvProvider>
    );

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });

  describe("[v3] non-collapsable open vertical navigation", () => {
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

  describe("[v3] non-collapsable open vertical navigation", () => {
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
