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
import {mount} from "enzyme";
import LineChartIcon from "@hv/uikit-react-icons/dist/Generic/LineChart";
import HvProvider from "../../Provider";
import HvCheckBox from "../../Selectors/CheckBox";
import ListWithStyles from "../index";
import List from "../List";

const mockDataSingleSelection = [
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

const mockDataSingleSelectionWithIds = [
  {
    label: "Value 1",
    id: "id-1"
  },
  {
    label: "Value 2",
    id: "id-2"
  },
  {
    label: "Value 3",
    id: "id-3"
  }
];

const mockDataSingleSelectionWithIcons = [
  {
    label: "Value 1",
    iconCallback: props => <LineChartIcon {...props} />
  },
  {
    label: "Value 2"
  },
  {
    label: "Value 3",
    showNavIcon: true
  }
];

const mockDataMultiSelection = [
  {
    label: "Value 1",
    selected: true
  },
  {
    label: "Value 2"
  },
  {
    label: "Value 3",
    selected: true
  }
];

describe("<List />", () => {
  global.document.addEventListener = jest.fn();
  global.document.removeEventListener = jest.fn();
  global.window.event = { type: "mousedown" };

  const mockEvt = { preventDefault: jest.fn() };
  const onClickMock = jest.fn();
  const onChangeMock = jest.fn();

  let wrapper;
  let listComponent;
  let instance;

  beforeEach(async () => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    jest.useRealTimers();
  });

  describe("Single selection", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles
            values={mockDataSingleSelection}
            onChange={onChangeMock}
            onClick={onClickMock}
            selectDefault
            singleSelectionToggle={false}
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("default value is selected", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();

      expect(instance.state.list).toEqual([
        { label: "Value 1", selected: true },
        { label: "Value 2", selected: false },
        { label: "Value 3", selected: false }
      ]);
    });

    it("onChange is triggered on selection and first is selected", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();

      instance.handleToggle = jest.fn();
      instance.handleSelect(mockEvt, { label: "Value 1" });
      jest.runAllTimers();

      expect(instance.state.selectionLabel).toBe("1 of 3");
      expect(onClickMock).toBeCalledWith({ label: "Value 1" }, mockEvt);
      expect(onChangeMock).toBeCalledWith([
        { label: "Value 1", selected: true },
        { label: "Value 2", selected: false },
        { label: "Value 3", selected: false }
      ]);
    });

    it("handleSelect updates state accordingly", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();

      instance.handleSelect(mockEvt, { label: "Value 2" });
      jest.runAllTimers();

      expect(instance.state.list).toEqual([
        { label: "Value 1", selected: false },
        { label: "Value 2", selected: true },
        { label: "Value 3", selected: false }
      ]);
    });
  });

  describe("Single selection with ids to manage selection", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles values={mockDataSingleSelectionWithIds} />
        </HvProvider>
      );
    });
    it("handleSelect updates state accordingly", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      instance.handleSelect(mockEvt, { id: "id-1" });
      expect(instance.state.list).toEqual([
        { selected: true, id: "id-1", label: "Value 1" },
        { selected: false, id: "id-2", label: "Value 2" },
        { selected: false, id: "id-3", label: "Value 3" }
      ]);
    });
  });

  describe("Single selection with selectors", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles
            values={mockDataSingleSelection}
            selectDefault
            useSelector
          />
        </HvProvider>
      );
    });
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Single selection with icons", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles values={mockDataSingleSelectionWithIcons} />
        </HvProvider>
      );
    });
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Multi selection", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles
            values={mockDataMultiSelection}
            onChange={onChangeMock}
            multiSelect
            showSelectAll
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("default values are selected", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      expect(instance.state.list).toEqual([
        { label: "Value 1", selected: true },
        { label: "Value 2", selected: false },
        { label: "Value 3", selected: true }
      ]);
    });

    it("onChange is triggered on selection and first is selected", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      instance.handleToggle = jest.fn();
      instance.handleSelect(mockEvt, { label: "Value 2" });
      jest.runAllTimers();
      expect(onChangeMock).toBeCalledWith([
        { label: "Value 1", selected: true },
        { label: "Value 2", selected: true },
        { label: "Value 3", selected: true }
      ]);
      expect(instance.state.selectionLabel).toBe("3 of 3");
    });

    it("handleSelect updates state accordingly", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      instance.handleSelect(mockEvt, { label: "Value 1" });
      jest.runAllTimers();
      expect(instance.state.list).toEqual([
        { label: "Value 1", selected: false },
        { label: "Value 2", selected: false },
        { label: "Value 3", selected: true }
      ]);
    });

    it("handleSelectAll should unselect all if any selected", () => {
      listComponent = wrapper.find(List);
      instance.handleSelectAll();
      expect(instance.state.list.some(el => el.selected)).toEqual(false);
    });

    it("handleSelect should be triggered when a single select item is clicked ", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      instance.handleSelect = jest.fn();
      listComponent
        .find("li")
        .at(0)
        .simulate("click", {});
      expect(instance.handleSelect).toBeCalled();
    });
  });

  describe("Multi selection with selectors", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <ListWithStyles
            values={mockDataMultiSelection}
            onChange={onChangeMock}
            multiSelect
            showSelectAll
            useSelector
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("handleSelectAll should be triggered when All checkbox is selected ", () => {
      listComponent = wrapper.find(List);
      instance = listComponent.instance();
      instance.handleSelectAll = jest.fn();
      listComponent
        .find(HvCheckBox)
        .at(0)
        .find('input[type="checkbox"]')
        .simulate("change", { target: { checked: true } });
      expect(instance.handleSelectAll).toBeCalled();
    });
  });
});
