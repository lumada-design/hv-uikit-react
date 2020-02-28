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
import HvTableWithStyles from "../index";

import {
  labels,
  data,
  getColumns,
  sorted,
  subElementTemplate
} from "./TableData";

expect.extend(toHaveNoViolations);

describe("tableA11Y", () => {
  it("Simple Table", async () => {
    const wrapper = mount(
      <HvProvider>
        <HvTableWithStyles
          data={data}
          id="test"
          columns={getColumns()}
          defaultPageSize={10}
          pageSize={10}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });

  it("Empty Table", async () => {
    const wrapper = mount(
      <HvProvider>
        <HvTableWithStyles
          data={[]}
          columns={getColumns()}
          defaultPageSize={0}
          pageSize={10}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });

  it("Expandable Table", async () => {
    const wrapper = mount(
      <HvProvider>
        <HvTableWithStyles
          data={data}
          columns={getColumns()}
          defaultPageSize={10}
          pageSize={10}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
          subElementTemplate={subElementTemplate}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });
  it("Table With Checkbox", async () => {
    const wrapper = mount(
      <HvProvider>
        <HvTableWithStyles
          data={data}
          columns={getColumns()}
          defaultPageSize={10}
          pageSize={10}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
          idForCheckbox="id"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });

  it("Table with Checkbox and Actions", async () => {
    const wrapper = mount(
      <HvProvider>
        <HvTableWithStyles
          data={data}
          columns={getColumns()}
          defaultPageSize={10}
          pageSize={10}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
          idForCheckbox="id"
          secondaryActions={[
            {
              label: "Share",
              action: d => {
                alert(`Sharing ${JSON.stringify(d)}`);
              }
            },
            {
              label: "Hide",
              action: d => {
                alert(`Hiding ${JSON.stringify(d)}`);
              }
            },
            {
              label: "Remove",
              action: d => {
                alert(`Removing ${JSON.stringify(d)}`);
              }
            }
          ]}
        />
      </HvProvider>
    );
    const results = await axe(wrapper.getDOMNode()[1]);

    expect(results).toHaveNoViolations();
  });
});
