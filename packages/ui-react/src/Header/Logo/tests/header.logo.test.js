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
import { shallow } from "enzyme";

import LogoWithStyles from "../index";
import Logo from "../Logo";

describe("Logo withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<LogoWithStyles />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Logo component", () => {
    const logoComponent = wrapper.find(Logo);
    expect(logoComponent.length).toBe(1);
  });

  it("should render Logo component with Props", () => {
    wrapper = shallow(
      <LogoWithStyles
        companyLogo="Path/To/CompanyLogo"
        productLogo="Path/To/ProductLogo"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
