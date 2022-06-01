/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvTabs } from "../..";
import { Main } from "../stories/Tabs.stories";

describe("Tabs", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <HvTabs />
    </HvProvider>
  );

  it("should render correctly", () => {
    expect(wrapper.find(HvTabs)).toMatchSnapshot();
  });
});

describe("Compose Tabs withStyles", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <Main />
    </HvProvider>
  );

  it("should render correctly", () => {
    expect(wrapper.find(HvTabs)).toMatchSnapshot();
  });
});
