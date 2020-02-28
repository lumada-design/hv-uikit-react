/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";

import TabWidthStyles from "../index";

describe("Tab withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TabWidthStyles label="Clickable Tab" />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
