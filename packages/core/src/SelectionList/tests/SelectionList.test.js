/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Main } from "../stories/SelectionList.stories";

import { HvSelectionList, HvProvider } from "../..";

describe("SelectionList", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvSelectionList)).toMatchSnapshot();
  });

  it("should render the HvSelectionList", () => {
    const component = wrapper.find(HvSelectionList);
    expect(component.length).toBe(1);
  });
});
