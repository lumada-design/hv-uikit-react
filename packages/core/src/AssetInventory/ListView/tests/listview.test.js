/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvListView, HvProvider } from "../../..";
import { Main } from "../stories/ListView.stories";

describe("[v3]  AssetInventory ListView", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvListView)).toMatchSnapshot();
  });
});
