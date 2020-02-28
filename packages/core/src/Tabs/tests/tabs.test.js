/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";

import TabsWidthStyles from "../index";
import TabWidthStyles from "../../Tab";

describe("Tabs withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TabsWidthStyles />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Compose Tabs withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TabsWidthStyles value={1}>
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
        </TabsWidthStyles>
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
