/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import HvProvider from "../../Provider";
import HvCheckBox from "../../Selectors/CheckBox/CheckBox";
import Typography from "../../Typography";
import List from "../List";
import Dropdown from "..";

const mockData = [{ label: "Value 1" }, { label: "Value 2" }, { label: "Value 3" }];

const mockDataWithIds = [
  { id: "id-1", label: "Value 1" },
  { id: "id-2", label: "Value 2" },
  { id: "id-3", label: "Value 3" }
];

describe("<Dropdown />", () => {
  global.document.addEventListener = jest.fn();
  global.document.removeEventListener = jest.fn();
  global.window.event = jest.fn();

  let wrapper;
  let dropdownComponent;
  let listComponent;
  let instance;

  describe("with defaults", () => {
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
      listComponent = wrapper.find(List).find(Typography);
      expect(listComponent.at(1).prop("variant")).toBe("infoText");
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

    it("handleToggle updates state accordingly", () => {
      act(() => {
        wrapper = mount(
          <HvProvider>
            <Dropdown values={mockData} onChange={onChangeMock} showSearch selectDefault />
          </HvProvider>
        );
      });

      dropdownComponent = wrapper.find("HvDropdown");
      instance = dropdownComponent.instance();
      instance.handleToggle();

      expect(instance.state.isOpen).toBe(true);
    });
  });

  describe("<Dropdown /> with selectDefault false", () => {
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
      listComponent = wrapper.find(Typography);

      for (let i = 1; i < listComponent.length; i += i) {
        expect(listComponent.at(i).prop("variant")).toBe("normalText");
      }
    });
  });

  describe("<Dropdown /> with multiselect and search", () => {
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
      dropdownComponent = wrapper.find("HvDropdown");
      instance = dropdownComponent.instance();

      instance.handleToggle();

      expect(instance.state.isOpen).toBe(true);
    });

    it("handleToggle should be triggered when header is clicked", () => {
      dropdownComponent = wrapper.find("HvDropdown");
      instance = dropdownComponent.instance();
      instance.handleToggle = jest.fn();

      const header = dropdownComponent.find("#test-dropdown-header");
      header.simulate("mouseUp");

      expect(instance.handleToggle).toBeCalled();
      expect(instance.state.isOpen).toBe(true);
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
    });

    it("onChange shouldn't be triggered when a multi select item is selected ", () => {
      dropdownComponent = wrapper.find(List);

      dropdownComponent
        .find(HvCheckBox)
        .at(1)
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: true } });

      expect(onChangeMock).not.toBeCalled();
    });

    it("onChange shouldn't be triggered when All checkbox is selected ", () => {
      dropdownComponent = wrapper.find(List);

      dropdownComponent
        .find(HvCheckBox)
        .at(0)
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: true } });

      expect(onChangeMock).not.toBeCalled();
    });

    it("onChange should be triggered when action apply is clicked ", () => {
      dropdownComponent = wrapper.find(List);
      instance = dropdownComponent.instance();

      dropdownComponent
        .find("Actions")
        .find("HvButton")
        .at(0)
        .simulate("click", {
          preventDefault() {}
        });

      expect(onChangeMock).toBeCalled();
    });
  });
});
