/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";

import Tabs from "..";
import Tab from "../../Tab";

describe("Tabs withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Tabs />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Tabs)).toMatchSnapshot();
  });
});

describe("Compose Tabs withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Tabs value={1}>
          <Tab label="Clickable Tab" />
          <Tab label="Clickable Tab" />
          <Tab label="Clickable Tab" />
          <Tab label="Clickable Tab" />
        </Tabs>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Tabs)).toMatchSnapshot();
  });
});
