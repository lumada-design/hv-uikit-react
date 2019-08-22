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
import HvProvider from "../../Provider";
import HvButton from "../../Button";
import HvCheckBox from "../../Selectors/CheckBox/CheckBox";
import DropdownWithStyles from "../index";
import Dropdown from "../Dropdown";
import List from "../List/List";
import Actions from "../Actions/Actions";
import Typography from "../../Typography";
import InnerList from "../../List";

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
            expanded
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("default value is selected", () => {
      listComponent = wrapper.find(Typography);

      expect(listComponent.at(1).prop("variant")).toBe("selectedText");
    });

    it("onChange is triggered on selection and first is selected", () => {
      onChangeMock.mockReset();
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();

      instance.handleToggle = jest.fn();
      instance.handleSelection([{ label: "Value 1" }, { label: "Value 2" }]);

      expect(onChangeMock).toBeCalledWith({ label: "Value 1" });

      expect(instance.state.selectionLabel).toBe("Value 1");
      expect(instance.handleToggle).not.toBeCalled();
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

    it("handleClickAway updates state accordingly with event payload", () => {
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();

      instance.node = { contains: jest.fn() };
      instance.handleClickAway({ target: "mock" });

      expect(instance.state.isOpen).toBe(false);
    });

    it("handleToggle updates state accordingly", () => {
      act(() => {
        wrapper = mount(
          <HvProvider>
            <DropdownWithStyles
              values={mockData}
              onChange={onChangeMock}
              showSearch
            />
          </HvProvider>
        );
      });

      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();
      instance.handleToggle({ stopPropagation: jest.fn() });

      expect(instance.state.isOpen).toBe(true);
    });

    it("handleSelection updates state accordingly", () => {
      listComponent = wrapper.find(InnerList);

      const fc = listComponent.children().props().onChange;

      act(() => {
        fc({ label: "Value 2" });
      });

      expect(onChangeMock).lastCalledWith({ label: "Value 2" });
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

    it("onChange is triggered on selection and has two elements selected", () => {
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();

      instance.handleToggle = jest.fn();
      instance.handleSelection(
        [{ label: "Value 1" }, { label: "Value 2" }],
        true
      );

      expect(instance.state.selectionLabel).toBe("Selected 2 of 3");
      expect(instance.handleToggle).not.toBeCalled();
    });

    it("onChange is triggered on selection and selection is empty", () => {
      dropdownComponent = wrapper.find(Dropdown);
      instance = dropdownComponent.instance();

      instance.handleToggle = jest.fn();
      instance.handleSelection([], true, true);

      expect(instance.state.selectionLabel).toBe("All");
      expect(instance.handleToggle).toBeCalled();
      expect(instance.state.selectionLabel).toBe("All");
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

      const header = dropdownComponent.find("#header");
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
        .find(Actions)
        .find(HvButton)
        .at(1)
        .simulate("click", {
          preventDefault() {}
        });

      expect(onChangeMock).toBeCalled();
    });
  });

  // describe("<Dropdown /> single selection with ids to manage selection", () => {
  //   beforeEach(async () => {
  //     wrapper = mount(
  //       <HvProvider>
  //         <DropdownWithStyles multiSelect={false} values={mockDataWithIds} />
  //       </HvProvider>
  //     );
  //   });
  //
  //   it("handleSelection updates state accordingly", () => {
  //     listComponent = wrapper.find(List);
  //     instance = listComponent.instance();
  //
  //     instance.handleSelection({ id: "id-1" });
  //
  //     expect(instance.state.list).toEqual([
  //       { isResult: true, selected: true, id: "id-1", label: "Value 1" },
  //       { isResult: true, selected: false, id: "id-2", label: "Value 2" },
  //       { isResult: true, selected: false, id: "id-3", label: "Value 3" }
  //     ]);
  //   });
  // });
});
