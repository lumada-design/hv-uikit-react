/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";

import HvProvider from "../../../Provider";
import RadioButtonWithStyles from "../index";

expect.extend(toHaveNoViolations);

describe("InputA11Y", () => {
  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <RadioButtonWithStyles id="test" radioProps={{ inputProps: { "aria-label": "Radio" } }} />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("normal state with label", async () => {
    const wrapper = mount(
      <HvProvider>
        <RadioButtonWithStyles label="label" id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("disabled", async () => {
    const wrapper = mount(
      <HvProvider>
        <RadioButtonWithStyles label="label" disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("selected", async () => {
    const wrapper = mount(
      <HvProvider>
        <RadioButtonWithStyles label="labels" checked id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
