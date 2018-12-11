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

import React from "react";
import { shallow } from "enzyme";

import MenuWithStyles from "../index";
import Menu from "../Menu";

describe("Menu withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<MenuWithStyles basePath="basePath" useRouter />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Menu component", () => {
    const userComponent = wrapper.find(Menu);
    expect(userComponent.length).toBe(1);
  });

  it("should render User component with Props", () => {
    wrapper = shallow(
      <MenuWithStyles
        menuData={[
          { path: "path1", label: "label1" },
          { path: "path2", label: "label2" },
          { path: "path3", label: "label3" }
        ]}
        basePath="basePath"
        useRouter
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
