/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";
import BaseInput from "..";

expect.extend(toHaveNoViolations);

describe("BaseInputA11Y", () => {
  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <BaseInput id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
