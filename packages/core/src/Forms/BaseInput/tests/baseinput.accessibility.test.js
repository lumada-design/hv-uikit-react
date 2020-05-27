/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";

import HvProvider from "../../../Provider";
import BaseInput from "..";

expect.extend(toHaveNoViolations);

const inputProps = {
  "aria-label": "Input Label"
};

describe("BaseInputA11Y", () => {
  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <BaseInput placeholder="test" id="test" inputProps={inputProps} />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("disabled", async () => {
    const wrapper = mount(
      <HvProvider>
        <BaseInput placeholder="test" disabled inputProps={inputProps} />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
