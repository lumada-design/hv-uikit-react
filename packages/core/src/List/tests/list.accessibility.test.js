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
import ListWithStyles from "../index";

expect.extend(toHaveNoViolations);

const ariaProps = { "aria-label": "List label" };

describe("ListA11Y", () => {
  it("single selection", async () => {
    const data = [
      {
        label: "Share"
      },
      {
        label: "Edit"
      },
      {
        label: "Remove"
      },
      {
        label: "Delete"
      },
      {
        label: "Updateaaaaaaaaaaaaaaaaa"
      }
    ];

    const wrapper = mount(
      <HvProvider>
        <ListWithStyles
          values={data}
          selectDefault
          hasTooltips
          listProps={ariaProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("simple list not selectable", async () => {
    const data = [
      {
        label: "Share"
      },
      {
        label: "Edit"
      },
      {
        label: "Remove",
        path: "https://www.hitachivantara.com"
      },
      {
        label: "Delete"
      },
      {
        label: "Update",
        path: "https://www.hitachivantara.com"
      }
    ];

    const wrapper = mount(
      <HvProvider>
        <ListWithStyles
          values={data}
          selectable={false}
          listProps={ariaProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("simple list with nav icons", async () => {
    const data = [
      {
        label: "Today",
        showNavIcon: true
      },
      {
        label: "Yesterday"
      },
      {
        label: "Last week"
      },
      {
        label: "Last month"
      },
      {
        label: "Last year",
        showNavIcon: true
      }
    ];

    const wrapper = mount(
      <HvProvider>
        <ListWithStyles
          values={data}
          selectable={false}
          listProps={ariaProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("multi selection with selectors disabled and selectAll", async () => {
    const data = [
      {
        label: "Arhauss is somewhere",
        selected: false
      },
      {
        label: "Allentown is not are 51",
        selected: false
      },
      {
        label: "Bergamo where you can eat",
        selected: false,
        disabled: true
      },
      {
        label: "Bergen city",
        selected: true,
        disabled: true
      },
      {
        label: "Boston of the Seven Seas",
        selected: false
      }
    ];

    const wrapper = mount(
      <HvProvider>
        <ListWithStyles
          values={data}
          multiSelect
          useSelector
          listProps={ariaProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
