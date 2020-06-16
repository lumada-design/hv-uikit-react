/* eslint-env jest */
/* eslint-disable no-console */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
import HvProvider from "../../Provider";
import {
  Main,
  Empty,
  WithExpander,
  WithCheckbox,
  WithCheckboxAndSecondaryActions
} from "../stories/Table.stories";

expect.extend(toHaveNoViolations);

describe("tableA11Y", () => {
  it("Simple Table", async () => {
    const originalWarn = console.warn;
    console.warn = jest.fn();
    const wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    console.warn = originalWarn;
    expect(results).toHaveNoViolations();
  });

  it("Empty Table", async () => {
    const wrapper = mount(
      <HvProvider>
        <Empty />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("Expandable Table", async () => {
    const wrapper = mount(
      <HvProvider>
        <WithExpander />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  it("Table With Checkbox", async () => {
    const wrapper = mount(
      <HvProvider>
        <WithCheckbox />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("Table with Checkbox and Actions", async () => {
    const wrapper = mount(
      <HvProvider>
        <WithCheckboxAndSecondaryActions />
      </HvProvider>
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
