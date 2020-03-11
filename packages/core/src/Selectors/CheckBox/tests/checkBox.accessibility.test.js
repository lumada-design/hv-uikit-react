/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";

import HvProvider from "../../../Provider";
import CheckboxWithStyles from "../index";

expect.extend(toHaveNoViolations);

describe("Checkbox A11Y", () => {
  it("no label", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles id="test" inputProps={{ "aria-label": "Checkbox" }} />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("with label", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles label="Label" disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("disabled", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles label="Label" disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("checked disabled", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles label="Label" checked disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("indeterminate", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles label="Label" indeterminate />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("checked indeterminate", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles label="Label" checked indeterminate />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
