/* eslint-env jest */
/* eslint-disable no-console */
import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvVerticalNavigation } from "../..";
import { Main, Collapsable } from "../stories/VerticalNavigation.stories";

describe("<VerticalNavigation />", () => {
  const toggleOpenCallbackMock = jest.fn();

  let wrapper;
  describe("collapsable closed vertical navigation", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Main />
      </HvProvider>
    );

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
    });
  });
  describe("collapsable open vertical navigation", () => {
    const consoleSpy = jest.fn();
    const originalError = console.error;
    beforeEach(async () => {
      consoleSpy.mockReset();
      console.error = consoleSpy;
      wrapper = mount(
        <HvProvider disableCssBaseline>
          <Collapsable />
        </HvProvider>
      );
    });

    afterEach(async () => {
      console.error = originalError;
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(
        consoleSpy.mock.calls[0][2].includes(
          "The prop `isCollapsable` of `VerticalNavigation` is deprecated."
        )
      ).toBe(true);
    });
  });

  describe("non-collapsable open vertical navigation", () => {
    const consoleSpy = jest.fn();
    const originalError = console.error;
    beforeEach(async () => {
      consoleSpy.mockReset();
      console.error = consoleSpy;
      wrapper = mount(
        <HvProvider disableCssBaseline>
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

    afterEach(async () => {
      console.error = originalError;
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvVerticalNavigation)).toMatchSnapshot();
      expect(console.error).toHaveBeenCalledTimes(2);
      expect(
        consoleSpy.mock.calls[0][2].includes(
          "The prop `isOpen` of `VerticalNavigation` is deprecated."
        )
      ).toBe(true);
      expect(
        consoleSpy.mock.calls[1][2].includes(
          "The prop `position` of `VerticalNavigation` is deprecated"
        )
      ).toBe(true);
    });
  });
  describe("non-collapsable open vertical navigation", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider disableCssBaseline>
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
