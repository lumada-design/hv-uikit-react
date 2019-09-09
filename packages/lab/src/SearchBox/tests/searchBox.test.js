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
import { shallow, mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import SearchBox from "../index";

const mockClasses = {};

const testState = (wrapper, value) => {
  const instance = wrapper.children().childAt(1).children().instance();
  expect(instance.state.value).toEqual(value);
};

describe("<SearchBox />", () => {
  const onChangeMock = jest.fn();

  it("has default props", () => {
    const searchBox = mount(
      <HvProvider>
        <SearchBox classes={mockClasses} onChange={onChangeMock} />
      </HvProvider>
    );
    const props = searchBox.children().childAt(1).children().props();
    expect(props.value).toEqual("");
    expect(props.placeholder).toEqual("Search");
    expect(props.onChange).toBe(onChangeMock);
    expect(props.searchInput).toEqual(undefined);
  });

  it("renders correctly", () => {
    const searchBox = shallow(
      <HvProvider>
        <SearchBox classes={mockClasses} onChange={onChangeMock} />
      </HvProvider>
    );
    expect(searchBox).toMatchSnapshot();
  });

  it("renders correctly with provided search input", () => {
    const testSearchInput = "searchInput";
    const searchBox = mount(
      <HvProvider>
        <SearchBox
          classes={mockClasses}
          onChange={onChangeMock}
          searchInput={testSearchInput}
        />
      </HvProvider>
    );
    expect(searchBox.find("input").prop("value")).toBe(testSearchInput);
  });

  it("onChange is triggered and state is changed", () => {
    onChangeMock.mockReset();
    const searchBox = mount(
      <HvProvider>
        <SearchBox classes={mockClasses} onChange={onChangeMock} />
      </HvProvider>
    );
    const eventMock = {
      target: {
        value: "test"
      }
    };
    searchBox.find("input").simulate("change", eventMock);

    expect(onChangeMock).toBeCalledWith("test");
    testState(searchBox, "test");
  });

  it("onChange is triggered and state resets when clear is clicked", () => {
    onChangeMock.mockReset();
    const searchBox = mount(
      <HvProvider>
        <SearchBox
          classes={mockClasses}
          onChange={onChangeMock}
          value="mockValue"
        />
      </HvProvider>
    );
    searchBox.find("span").simulate("click");

    expect(onChangeMock).toBeCalledWith("");
    testState(searchBox, "");
  });
});
