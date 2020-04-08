/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { axe, toHaveNoViolations } from "jest-axe";
import HvProvider from "../../Provider";
import HvCheckBox from "../../Selectors/CheckBox/CheckBox";
import DropdownWithStyles from "../index";
import Dropdown from "../Dropdown";
import List from "../List/List";
import Typography from "../../Typography";

expect.extend(toHaveNoViolations);

const mockData = [
  {
    label: "Value 1"
  },
  {
    label: "Value 2"
  },
  {
    label: "Value 3"
  }
];

const mockDataWithIds = [
  {
    id: "id-1",
    label: "Value 1"
  },
  {
    id: "id-2",
    label: "Value 2"
  },
  {
    id: "id-3",
    label: "Value 3"
  }
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
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            values={mockData}
            onChange={onChangeMock}
            showSearch
            selectDefault
            expanded
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("default value is selected", () => {
      listComponent = wrapper.find(List).find(Typography);

      expect(listComponent.at(1).prop("variant")).toBe("selectedText");
    });

    it("onChange is triggered on first render when required", () => {
      onChangeMock.mockReset();
      mount(
        <HvProvider>
          <DropdownWithStyles
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
            <DropdownWithStyles
              values={mockData}
              onChange={onChangeMock}
              showSearch
              selectDefault
            />
          </HvProvider>
        );
      });

      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();
      instance.handleToggle();

      expect(instance.state.isOpen).toBe(true);
    });
  });

  describe("<Dropdown /> with selectDefault false", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            values={mockData}
            selectDefault={false}
            expanded
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
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
          <DropdownWithStyles
            id="test-dropdown"
            values={mockData}
            multiSelect
            showSearch
            disabled
            expanded
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("<Dropdown /> handleToggle should do nothing if disabled", () => {
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();

      instance.handleToggle();

      expect(instance.state.isOpen).toBe(true);
    });

    it("handleToggle should be triggered when header is clicked", () => {
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();
      instance.handleToggle = jest.fn();

      const header = dropdownComponent.find("#test-dropdown-header");
      header.simulate("click");

      expect(instance.handleToggle).toBeCalled();
      expect(instance.state.isOpen).toBe(true);
    });
  });

  describe("<Dropdown /> onChange prop called in multiselect", () => {
    const onChangeMock = jest.fn();

    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
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
        .at(1)
        .simulate("click", {
          preventDefault() {}
        });

      expect(onChangeMock).toBeCalled();
    });
  });

  describe("Dropdown A11Y", () => {
    const onChangeMock = jest.fn();

    it("with title", async () => {
      wrapper = mount(
        <HvProvider>
          <DropdownWithStyles
            values={mockData}
            onChange={onChangeMock}
            labels={{ title: "title" }}
            expanded
          />
        </HvProvider>
      );

      const results = await axe(wrapper.getDOMNode());
      expect(results).toHaveNoViolations();
    });
  });
});
