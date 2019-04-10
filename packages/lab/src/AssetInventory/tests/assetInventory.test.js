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

import React from "react";
import { mount, shallow } from "enzyme";

import HvProvider from "@hv/uikit-react-core/dist/Provider";
import AssetInventoryWithStyles from "../index";
import AssetInventory from "../AssetInventory";

const configuration = {
  assetsTitle: "title"
};

describe("AssetInventory withStyles", () => {
  let wrapper;

  it("should be defined", () => {
    wrapper = shallow(
      <HvProvider>
        <AssetInventoryWithStyles assetsTitle={configuration.assetsTitle} />
      </HvProvider>
    );
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should be able to render with every property defined", () => {
    wrapper = mount(
      <HvProvider>
        <AssetInventoryWithStyles
          assetsTitle={configuration.assetsTitle}
          searchHandler={undefined}
          viewChangedHandler={undefined}
          renderEmptyState={false}
          cardRenderComponent={<div />}
          listRenderComponent={<div />}
          toolsScreenGridSize={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
        />
      </HvProvider>
    );
    const AssetInventoryComponent = wrapper.find(AssetInventory);
    expect(AssetInventoryComponent.length).toBe(1);
  });

  it("should render the Asset Inventory component", () => {
    const AssetInventoryComponent = wrapper.find(AssetInventory);
    expect(AssetInventoryComponent.length).toBe(1);
  });
});
