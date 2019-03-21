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

import NavigationWithStyles from "../index";
import Navigation from "../Navigation";
import HvProvider from "../../../Provider";

describe("Menu withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider>
        <NavigationWithStyles basePath="basePath" useRouter />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Navigation component", () => {
    wrapper = mount(
      <HvProvider>
        <NavigationWithStyles basePath="basePath" useRouter />
      </HvProvider>
    );
    const userComponent = wrapper.find(Navigation);
    expect(userComponent.length).toBe(1);
  });

  it("should render the Navigation list component", () => {
    const userComponent = mount(
      <HvProvider>
        <NavigationWithStyles
          basePath="basePath"
          useRouter={false}
          navigationData={[
            {
              label: "Overview",
              path: "/"
            },
            {
              label: "events",
              path: "/events"
            }
          ]}
          selected={0}
        />
      </HvProvider>
    ).find("a");
    expect(userComponent.length).toBe(2);
  });

  it("shouldn't render anything in the Navigation", () => {
    const childComponents = mount(
      <HvProvider>
        <NavigationWithStyles
          basePath="basePath"
          useRouter={false}
          selected={0}
        />
      </HvProvider>
    )
      .find(Navigation)
      .children();

    expect(childComponents.length).toBe(0);
  });
});
