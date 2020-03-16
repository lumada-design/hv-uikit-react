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

import PaginationWithStyles from "../index";
import HvProvider from "../../Provider";

expect.extend(toHaveNoViolations);

describe("PaginationA11Y", () => {
  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <PaginationWithStyles pages={1} />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });

  it("Custom Pagination", async () => {
    const wrapper = mount(
      <HvProvider>
        <PaginationWithStyles
          pages={4}
          page={2}
          showPageSizeOptions
          pageSizeOptions={[5, 10]}
          pageSize={5}
          showPageJump={false}
          canPrevious
          canNext
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });
});
