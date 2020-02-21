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
import BreadcrumbWithStyles from "../index";

expect.extend(toHaveNoViolations);

const data = [
  {
    label: "Label 1",
    path: "route1"
  },
  {
    label: "Label 2",
    path: "route2"
  },
  {
    label: "Label 3",
    path: "route3"
  },
  {
    label: "Label 4",
    path: "route2"
  },
  {
    label: "Label 5",
    path: "route3"
  },
  {
    label: "Label 6",
    path: "route2"
  },
  {
    label: "Label 7",
    path: "route3"
  },
  {
    label: "Label 8",
    path: "route2"
  },
  {
    label: "Label 9",
    path: "route3"
  }
];

describe("BreadcrumbsA11Y", () => {
  it("all paths visible", async () => {
    const wrapper = mount(
      <HvProvider>
        <BreadcrumbWithStyles
          listRoute={data}
          useRouter={false}
          id="breadcrumb1"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);
    expect(results).toHaveNoViolations();
  });

  it("5 paths visible of 7", async () => {
    const wrapper = mount(
      <HvProvider>
        <BreadcrumbWithStyles
          listRoute={data}
          useRouter={false}
          maxVisible={5}
          id="breadcrumb1"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);
    expect(results).toHaveNoViolations();
  });

  it("2 paths visible of 8", async () => {
    const wrapper = mount(
      <HvProvider>
        <BreadcrumbWithStyles
          listRoute={data}
          useRouter={false}
          maxVisible={2}
          id="breadcrumb1"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);
    expect(results).toHaveNoViolations();
  });
});
