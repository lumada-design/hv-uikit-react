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
import { mount, shallow } from "enzyme";

import Help16 from "@hv-ui/icons/core/S-icons/Help16";
import UserWithStyles from "../index";
import User from "../User";

describe("User withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<UserWithStyles />);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render User component", () => {
    const userComponent = wrapper.find(User);
    expect(userComponent.length).toBe(1);
  });

  it("should render User component with Props", () => {
    wrapper = shallow(
      <UserWithStyles userData={{ name: "UserName", role: "UserRole" }} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render text properly", () => {
    const typographies = mount(
      <UserWithStyles userData={{ name: "UserName", role: "UserRole" }} />
    ).find("Typography");

    expect(typographies.length).toBe(2);
  });

  it("should render name text properly", () => {
    const typographies = mount(
      <UserWithStyles userData={{ name: "UserName" }} />
    ).find("Typography");

    expect(typographies.length).toBe(1);
  });

  it("should render role text properly", () => {
    const typographies = mount(
      <UserWithStyles userData={{ role: "UserRole" }} />
    ).find("Typography");

    expect(typographies.length).toBe(1);
  });

  it("should render logo", () => {
    const img = mount(<UserWithStyles userIcon={<Help16 />} />).find(Help16);
    expect(img.length).toBe(1);
  });

  it("should render nothing if no props", () => {
    const childComponent = mount(<UserWithStyles />)
      .find(User)
      .children();

    expect(childComponent.length).toBe(0);
  });
});
