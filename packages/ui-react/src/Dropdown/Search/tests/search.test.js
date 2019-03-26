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

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../Provider";
import SearchWrapper from "../index";
import Search from "../Search";

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

describe("<Search />", () => {
  let wrapper;
  let searchComponent;
  const onChangeMock = jest.fn();

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <SearchWrapper values={mockData} onChange={onChangeMock} />
      </HvProvider>
    );
  });

  it("has default props", () => {
    searchComponent = wrapper.find(Search);
    const props = searchComponent.props();
    expect(props.onChange).toBe(onChangeMock);
  });

  it("onChange is triggered and gets 1 result", () => {
    onChangeMock.mockReset();
    searchComponent = wrapper.find(Search);

    searchComponent.find("input").simulate("change", {
      preventDefault() {},
      target: { value: "1" }
    });

    expect(onChangeMock).toBeCalledWith("1", [{ label: "Value 1" }]);
  });

  it("onChange is triggered and gets all results if search empty", () => {
    onChangeMock.mockReset();
    searchComponent = wrapper.find(Search);

    searchComponent.find("input").simulate("change", {
      preventDefault() {},
      target: { value: "" }
    });

    expect(onChangeMock).toBeCalledWith("", [
      { label: "Value 1" },
      { label: "Value 2" },
      { label: "Value 3" }
    ]);
  });

  it("onChange is triggered and gets no results if search doesn't exist", () => {
    onChangeMock.mockReset();
    searchComponent = wrapper.find(Search);

    searchComponent.find("input").simulate("change", {
      preventDefault() {},
      target: { value: "x" }
    });

    expect(onChangeMock).toBeCalledWith("x", []);
  });
});
