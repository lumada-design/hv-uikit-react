/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import { shallow, mount } from "enzyme";
import SearchBox from "../index";
import HvProvider from "../../Provider";

describe("<SearchBox />", () => {
  const onChangeMock = jest.fn();
  const onSubmitMock = jest.fn();

  it("has default props", () => {
    const wrapper = mount(
      <HvProvider>
        <SearchBox onChange={onChangeMock} />
      </HvProvider>
    );
    const props = wrapper.find(SearchBox).props();
    expect(props.value).toEqual(undefined);
    expect(props.onChange).toBe(onChangeMock);
  });

  it("renders correctly", () => {
    const wrapper = shallow(
      <HvProvider>
        <SearchBox onChange={onChangeMock} />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders disabled correctly", () => {
    const wrapper = shallow(
      <HvProvider>
        <SearchBox onChange={onChangeMock} disabled />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("submits on enter", () => {
    const wrapper = mount(
      <HvProvider>
        <SearchBox id="hv-search-box-1" onChange={onChangeMock} onSubmit={onSubmitMock} />
      </HvProvider>
    );

    wrapper
      .find("#hv-search-box-1-input")
      .at(0)
      .props()
      .onKeyDown({ keyCode: 13 }, "value");
    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("renders correctly with provided search input", () => {
    const testSearchInput = "searchInput";
    const wrapper = mount(
      <HvProvider>
        <SearchBox onChange={onChangeMock} value={testSearchInput} />
      </HvProvider>
    );
    const props = wrapper.find(SearchBox).props();
    expect(props.value).toEqual(testSearchInput);
  });
});
