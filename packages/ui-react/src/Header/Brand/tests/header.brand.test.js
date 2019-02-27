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
import { shallow, mount } from "enzyme";

import BrandWithStyles from "../index";
import Brand from "../Brand";

describe("Brand withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<BrandWithStyles />);
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
      <BrandWithStyles
        companyLogo="Path/To/CompanyLogo"
        productLogo="Path/To/ProductLogo"
        productText="productText"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });


  it("should render companyLogo", () => {
    const img = mount(
      <BrandWithStyles
        companyLogo="Path/To/CompanyLogo"
      />
    ).find("img");

    expect(img.length).toBe(1);

  });

  it("should render productLogo", () => {
    const img = mount(
      <BrandWithStyles
        productLogo="Path/To/CompanyLogo"
      />
    ).find("img");

    expect(img.length).toBe(1);
  });

  it("should render the separator", () => {
    const separator = mount(
      <BrandWithStyles
        companyLogo="Path/To/CompanyLogo"
        productText="Text"
      />
    ).find("Separator");

    expect(separator.length).toBe(1);

  });

});
