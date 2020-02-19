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
import HvProvider from "../../Provider";
import DropdownWithStyles from "../index";

expect.extend(toHaveNoViolations);

const mockData = [
  { label: "Value 1" },
  { label: "Value 2" },
  { label: "Value 3" }
];

describe("Dropdown A11Y", () => {
  let wrapper;
  const onChangeMock = jest.fn();

  it("with title", async () => {
    wrapper = mount(
      <HvProvider>
        <DropdownWithStyles
          disablePortal
          values={mockData}
          onChange={onChangeMock}
          labels={{ title: "title" }}
          expanded
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
