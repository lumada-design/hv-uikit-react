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

  it("handleCancel shoud reset list to prev list", () => {
    listComponent = wrapper.find(List);
    instance = listComponent.instance();
    instance.setSelection = jest.fn();

    instance.handleCancel();

    expect(instance.state.list).toBe(instance.state.prevList);
    expect(instance.setSelection).toBeCalledWith(true, true);
  });

  it("handleApply shoud reset prev list to list", () => {
    listComponent = wrapper.find(List);
    instance = listComponent.instance();
    instance.setSelection = jest.fn();

    instance.handleApply();

    expect(instance.state.prevList).toBe(instance.state.list);
    expect(instance.setSelection).toBeCalledWith(true, true);
  });
});
