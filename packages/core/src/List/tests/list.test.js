/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { LineChart } from "@hitachivantara/uikit-react-icons";
import { HvList, HvProvider } from "../..";

const mockDataSingleSelection = [{ label: "Value 1" }, { label: "Value 2" }, { label: "Value 3" }];

const mockDataSingleSelectionWithIcons = [
  { label: "Value 1", icon: <LineChart /> },
  { label: "Value 2" },
  { label: "Value 3", showNavIcon: true },
];

describe("<List />", () => {
  global.document.addEventListener = jest.fn();
  global.document.removeEventListener = jest.fn();
  global.window.event = { type: "mousedown" };

  const onClickMock = jest.fn();
  const onChangeMock = jest.fn();

  let wrapper;

  beforeEach(async () => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    jest.useRealTimers();
  });

  describe("Single selection", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline="none">
          <HvList
            values={mockDataSingleSelection}
            onChange={onChangeMock}
            onClick={onClickMock}
            singleSelectionToggle={false}
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvList)).toMatchSnapshot();
    });
  });

  describe("Single selection with selectors", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline="none">
          <HvList values={mockDataSingleSelection} useSelector />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvList)).toMatchSnapshot();
    });
  });

  describe("Single selection with icons", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline="none">
          <HvList values={mockDataSingleSelectionWithIcons} />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(HvList)).toMatchSnapshot();
    });
  });
});
