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

import { axe, toHaveNoViolations } from 'jest-axe';

import HvProvider from "../../Provider";
import InputWithStyles from "../index";

expect.extend(toHaveNoViolations)

describe('InputA11Y', () => {
  it('normal state', async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <InputWithStyles labels={labels} id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });

  it('disabled', async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <InputWithStyles labels={labels} disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });

  it('filled', async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <InputWithStyles labels={labels} initialValue="Initial value" id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });

  it('invalid', async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <InputWithStyles labels={labels} initialValue="Initial value" validationState="invalid" id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });
});
