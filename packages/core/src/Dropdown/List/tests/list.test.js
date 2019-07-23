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

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import ListWrapper from "../index";
import List from "../List";

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

const mockLabels = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelection1: "Selected",
  multiSelection2: "of"
};

describe("<List />", () => {
  let wrapper;
  let listComponent;
  let instance;

  const onChangeMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <ListWrapper
          values={mockData}
          multiSelect
          showSearch
          onChange={onChangeMock()}
          labels={mockLabels}
        />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("handleCancel should reset list to prev list", () => {
    listComponent = wrapper.find(List);
    instance = listComponent.instance();
    instance.setSelection = jest.fn();

    instance.handleCancel();

    expect(instance.state.list).toBe(instance.state.prevList);
    expect(instance.setSelection).toBeCalledWith(true, true, false);
  });

  it("handleApply should reset prev list to list", () => {
    listComponent = wrapper.find(List);
    instance = listComponent.instance();
    instance.setSelection = jest.fn();

    instance.handleApply();

    expect(instance.state.prevList).toEqual(instance.state.list);
    expect(instance.setSelection).toBeCalledWith(true, true, true);
  });

  it("should only reset when values change", () => {
    instance = wrapper.find(List).instance();
    instance.resetLists = jest.fn();
    instance.componentWillReceiveProps({
      values: [...mockData],
      multiSelect: true,
      showSearch: true,
      onChange: onChangeMock(),
      labels: mockLabels,
    });
    expect(instance.resetLists.mock.calls.length).toEqual(0);

    const newMockData = [
     {
       label: "Value 4"
     },
     {
       label: "Value 5"
     },
     {
       label: "Value 6"
     }
    ];
    instance.componentWillReceiveProps({
      values: newMockData,
      multiSelect: true,
      showSearch: true,
      onChange: onChangeMock(),
      labels: mockLabels,
    });
    expect(instance.resetLists.mock.calls.length).toEqual(1);
  })
});
