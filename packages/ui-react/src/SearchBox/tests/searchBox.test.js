/**
 * Copyright (c) 2019 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import SearchBox from "../SearchBox";

const mockClasses = {};

const testState = (instance, value) => {
  expect(instance.state.value).toEqual(value);
};

describe("<SearchBox />", () => {
  const onChangeMock = jest.fn();

  it("has default props", () => {
    const searchBox = mount(
      <SearchBox classes={mockClasses} onChange={onChangeMock} />
    );
    const props = searchBox.props();
    expect(props.value).toEqual("");
    expect(props.placeholder).toEqual("Search");
    expect(props.onChange).toBe(onChangeMock);
  });

  it("renders correctly", () => {
    const searchBox = shallow(
      <SearchBox classes={mockClasses} onChange={onChangeMock} />
    );
    expect(searchBox).toMatchSnapshot();
  });

  it("onChange is triggered and state is changed", () => {
    onChangeMock.mockReset();
    const searchBox = shallow(
      <SearchBox classes={mockClasses} onChange={onChangeMock} />
    );
    const eventMock = {
      target: {
        value: "test"
      }
    };
    searchBox.find("input").simulate("change", eventMock);

    expect(onChangeMock).toBeCalledWith("test");
    testState(searchBox.instance(), "test");
  });

  it("onChange is triggered and state resets when clear is clicked", () => {
    onChangeMock.mockReset();
    const searchBox = shallow(
      <SearchBox
        classes={mockClasses}
        onChange={onChangeMock}
        value={"mockValue"}
      />
    );
    searchBox.find("span").simulate("click");

    expect(onChangeMock).toBeCalledWith("");
    testState(searchBox.instance(), "");
  });
});
