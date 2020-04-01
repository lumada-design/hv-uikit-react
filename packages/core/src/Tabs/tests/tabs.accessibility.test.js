/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";
import Tab from "../../Tab";
import Tabs from "..";

expect.extend(toHaveNoViolations);

describe("Tabs A11Y", () => {
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

  it("should render correctly", async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
