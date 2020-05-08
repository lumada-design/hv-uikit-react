/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
import { Main, Controlled } from "../stories/BulkActions.stories";
import { HvProvider } from "../..";

expect.extend(toHaveNoViolations);

describe("BulkActions A11Y", () => {
  it("main state", async () => {
    const wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it("controlled state", async () => {
    const wrapper = mount(
      <HvProvider>
        <Controlled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
