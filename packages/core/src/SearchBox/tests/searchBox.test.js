/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import SearchBox from "../index";
import HvProvider from "../../Provider";

describe("[v3] <SearchBox />", () => {
  const onChangeMock = jest.fn();

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
    expect(wrapper.find(SearchBox)).toMatchSnapshot();
  });

  it("renders disabled correctly", () => {
    const wrapper = shallow(
      <HvProvider>
        <SearchBox onChange={onChangeMock} disabled />
      </HvProvider>
    );
    expect(wrapper.find(SearchBox)).toMatchSnapshot();
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
