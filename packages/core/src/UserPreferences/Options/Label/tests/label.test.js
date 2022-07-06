/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../../Provider";
import Label from "../index";

describe("Label withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Label>Example</Label>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Label).length).toBe(1);
  });
});
