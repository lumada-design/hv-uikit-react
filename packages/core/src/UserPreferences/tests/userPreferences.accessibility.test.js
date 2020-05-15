/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
import HvProvider from "../../Provider";
import { Main } from "../stories/UserPreferences.stories";

expect.extend(toHaveNoViolations);

const setupComponent = (
  <HvProvider>
    <Main />
  </HvProvider>
);

describe("UserPreferencesA11Y", () => {
  let wrapper;

  it("default state", async () => {
    wrapper = mount(setupComponent);
    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
