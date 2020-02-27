/* eslint-env jest */

import React from "react";
import { shallow } from "enzyme";

import HvProvider from "../../../Provider";
import AssetInventoryListView from "..";

describe("AssetInventoryListView", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <AssetInventoryListView />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
