/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import ListView from "..";

describe("AssetInventoryListView", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <ListView />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(ListView)).toMatchSnapshot();
  });
});
