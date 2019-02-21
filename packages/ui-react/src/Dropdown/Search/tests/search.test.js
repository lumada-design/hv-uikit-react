/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
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
