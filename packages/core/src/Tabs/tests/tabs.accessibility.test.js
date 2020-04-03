/*
 * Copyright 2020 Hitachi Vantara Corporation
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

import HvProvider from "../../Provider";
import TabWidthStyles from "../../Tab";
import TabsWidthStyles from "../index";

expect.extend(toHaveNoViolations);

describe("Tabs A11Y", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <TabsWidthStyles value={1}>
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
          <TabWidthStyles label="Clickable Tab" />
        </TabsWidthStyles>
      </HvProvider>
    );
  });

  it("should render correctly", async () => {
    const results = await axe(wrapper.getDOMNode());

    expect(results).toHaveNoViolations();
  });
});
