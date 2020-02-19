/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { axe, toHaveNoViolations } from "jest-axe";

import HvProvider from "../../../Provider";
import CheckboxWithStyles from "../index";

expect.extend(toHaveNoViolations);

describe("Checkbox A11Y", () => {
  it("no label", async () => {
    const wrapper = mount(
      <HvProvider>
        <CheckboxWithStyles
          id="test"
          inputProps={{ "aria-label": "Checkbox" }}
        />
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
