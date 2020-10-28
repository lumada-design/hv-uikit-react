/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { HvActionBar, HvCheckBox, HvProvider } from "../..";
import List from "../List";
import Dropdown from "..";

const mockData = [{ label: "Value 1" }, { label: "Value 2" }, { label: "Value 3" }];

const mockDataWithIds = [
  { id: "id-1", label: "Value 1" },
  { id: "id-2", label: "Value 2" },
  { id: "id-3", label: "Value 3" },
];

describe("<Dropdown />", () => {
  global.document.addEventListener = jest.fn();
  global.document.removeEventListener = jest.fn();
  global.window.event = jest.fn();

  let wrapper;
  let dropdownComponent;

  describe(" with defaults", () => {
    const onChangeMock = jest.fn();

    beforeEach(async () => {
      // Hide console error: "Failed prop type: Material-UI: the `anchorEl` prop provided to the component is invalid."
      // In real cases this value is filled if the dropdown is expanded.
      // eslint-disable-next-line no-console
      const originalError = console.error;
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      wrapper = mount(
        <HvProvider>
          <Dropdown values={mockData} onChange={onChangeMock} showSearch expanded />
        </HvProvider>
      );

      // eslint-disable-next-line no-console
      console.error = originalError;
    });

    it("should render correctly", () => {
      expect(wrapper.find(Dropdown)).toMatchSnapshot();
    });

    it("onChange is triggered on first render when required", () => {
      onChangeMock.mockReset();
      mount(
        <HvProvider>
          <Dropdown
            values={mockData}
            onChange={onChangeMock}
            notifyChangesOnFirstRender
            showSearch
            expanded
          />
        </HvProvider>
      );

      expect(onChangeMock).toHaveBeenCalled();
    });
  });

  describe("<Dropdown /> disabled", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <Dropdown id="test-dropdown" values={mockData} multiSelect showSearch disabled expanded />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(Dropdown)).toMatchSnapshot();
    });
  });

  describe("<Dropdown /> onChange prop called in multiselect", () => {
    const onChangeMock = jest.fn();

    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <Dropdown
            id="dropdown2"
            multiSelect
            values={mockDataWithIds}
            onChange={onChangeMock}
            expanded
          />
        </HvProvider>
      );
      dropdownComponent = wrapper.find(List);
    });

    it("onChange shouldn't be triggered when a multi select item is selected ", () => {
      dropdownComponent
        .find(HvCheckBox)
        .at(1)
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: true } });

      expect(onChangeMock).not.toBeCalled();
    });

    it("onChange shouldn't be triggered when All checkbox is selected ", () => {
      dropdownComponent
        .find(HvCheckBox)
        .at(0)
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: true } });

      expect(onChangeMock).not.toBeCalled();
    });

    it("onChange should be triggered when action apply is clicked ", () => {
      dropdownComponent
        .find(HvActionBar)
        .find("HvButton")
        .at(0)
        .simulate("click", {
          preventDefault() {},
        });

      expect(onChangeMock).toBeCalled();
    });
  });
});
