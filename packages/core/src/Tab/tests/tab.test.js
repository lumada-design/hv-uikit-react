/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Tab from "..";

describe("Tab withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Tab label="Clickable Tab" />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(Tab)).toMatchSnapshot();
  });
});
