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

import {
  Add,
  Upload,
  Delete,
  Preview
} from "@hv/uikit-react-icons/dist/Generic";

import HvProvider from "../../Provider";
import HvButton from "../../Button";
import HvDropDownMenu from "../../DropDownMenu";
import ActionsWithStyles from "../index";

const actions = [
  { id: "post", label: "Add", iconCallback: () => <Add />, disabled: true },
  { id: "get", label: "Preview", iconCallback: () => <Upload /> },
  { id: "put", label: "Upload", iconCallback: () => <Delete /> },
  { id: "delete", label: "Delete", iconCallback: () => <Preview /> }
];

describe("Actions with array", () => {
  const actionsCallbackMock = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <ActionsWithStyles
          actions={actions}
          maxVisibleActions={2}
          actionsCallback={actionsCallbackMock}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should only show maxVisibleActions actions", () => {
    const buttons = wrapper.find(HvButton);
    expect(buttons.length).toBe(2);
  });

  it("should render the icons correctly", () => {
    expect(wrapper.find(Add).length).toBe(1);
    expect(wrapper.find(Upload).length).toBe(1);
  });

  it("should render the more options menu", () => {
    const dropdown = wrapper.find(HvDropDownMenu);
    expect(dropdown.length).toBe(1);
  });

  it("should not call actionsCallback on disabled button click", () => {
    const button = wrapper.find(HvButton);
    button.at(0).simulate("click");
    expect(actionsCallbackMock).toHaveBeenCalledTimes(0);
  });

  it("should call actionsCallback on button click", () => {
    const button = wrapper.find(HvButton);
    button.at(1).simulate("click");
    expect(actionsCallbackMock).toHaveBeenCalled();
  });
});

describe("Actions with custom actions", () => {
  let wrapper;

  it("should render if React element", () => {
    const label = "Test";
    wrapper = mount(
      <HvProvider>
        <ActionsWithStyles actions={<HvButton>{label}</HvButton>} />
      </HvProvider>
    );

    const element = wrapper.find(HvButton);
    expect(element.text()).toEqual(label);
  });
});
