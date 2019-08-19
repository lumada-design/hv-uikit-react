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
import { shallow, mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import BrandWithStyles from "../index";
import Brand from "../Brand";

describe("Brand withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <BrandWithStyles />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Brand component", () => {
    const logoComponent = wrapper.find(Brand);
    expect(logoComponent.length).toBe(1);
  });

  it("should render Brand component with Props", () => {
    wrapper = shallow(
      <HvProvider>
        <BrandWithStyles
          companyLogo="Path/To/CompanyLogo"
          productLogo="Path/To/ProductLogo"
          productText="productText"
        />
      </HvProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render companyLogo", () => {
    const img = mount(
      <HvProvider>
        <BrandWithStyles companyLogo="Path/To/CompanyLogo" />
      </HvProvider>
    ).find("img");

    expect(img.length).toBe(1);
  });

  it("should render productLogo", () => {
    const img = mount(
      <HvProvider>
        <BrandWithStyles productLogo="Path/To/CompanyLogo" />
      </HvProvider>
    ).find("img");

    expect(img.length).toBe(1);
  });

  it("should render the separator", () => {
    const separator = mount(
      <HvProvider>
        <BrandWithStyles companyLogo="Path/To/CompanyLogo" productText="Text" />
      </HvProvider>
    ).find("Separator");

    expect(separator.length).toBe(1);
  });
});
