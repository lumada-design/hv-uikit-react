/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import HvCheckBox from "../../Selectors/CheckBox/CheckBox";
import List from "../List";
import Dropdown from "..";

const mockData = [{ label: "Value 1" }, { label: "Value 2" }, { label: "Value 3" }];

const mockDataWithIds = [
  { id: "id-1", label: "Value 1" },
  { id: "id-2", label: "Value 2" },
  { id: "id-3", label: "Value 3" }
];

describe("[V3] <Dropdown />", () => {
  global.document.addEventListener = jest.fn();
  global.document.removeEventListener = jest.fn();
  global.window.event = jest.fn();

  let wrapper;
  let dropdownComponent;
  let listComponent;

  describe("[V3]  with defaults", () => {
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
          <Dropdown values={mockData} onChange={onChangeMock} showSearch selectDefault expanded />
        </HvProvider>
      );

      // eslint-disable-next-line no-console
      console.error = originalError;
    });

    it("should render correctly", () => {
      expect(wrapper.find(Dropdown)).toMatchSnapshot();
    });

    it("default value is selected", () => {
      listComponent = wrapper.find(List).find("li");
      expect(listComponent.at(0).prop("aria-selected")).toBe(true);
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

  describe("[V3] <Dropdown /> with selectDefault false", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <Dropdown values={mockData} selectDefault={false} expanded />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(Dropdown)).toMatchSnapshot();
    });

    it("no default value is selected", () => {
      listComponent = wrapper.find("li");

      for (let i = 1; i < listComponent.length; i += i) {
        expect(listComponent.at(i).prop("aria-selected")).toBe(undefined);
      }
    });
  });

  describe("[V3] <Dropdown /> disabled", () => {
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

    it("<Dropdown /> handleToggle should do nothing if disabled", () => {
      dropdownComponent = wrapper.find("#test-dropdown-header");
      expect(wrapper.find("HvListContainer")).toHaveLength(1);

      dropdownComponent.simulate("click");

      expect(wrapper.find("HvListContainer")).toHaveLength(1);
    });
  });

  describe("[V3] <Dropdown /> onChange prop called in multiselect", () => {
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
        .find("ActionContainer")
        .find("HvButton")
        .at(0)
        .simulate("click", {
          preventDefault() {}
        });

      expect(onChangeMock).toBeCalled();
    });
  });
});
