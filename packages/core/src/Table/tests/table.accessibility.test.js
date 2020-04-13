/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
import HvProvider from "../../Provider";
import HvTableWithStyles from "../index";

import { labels, data, getColumns, sorted, subElementTemplate } from "./TableData";

expect.extend(toHaveNoViolations);

describe("tableA11Y", () => {
  it("Simple Table", async () => {
    const originalWarn = console.warn;
    console.warn = jest.fn();
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

    const results = await axe(wrapper.html());
    console.warn = originalWarn;
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

    const results = await axe(wrapper.html());
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

    const results = await axe(wrapper.html());
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

    const results = await axe(wrapper.html());
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
              action: d => alert(`Sharing ${JSON.stringify(d)}`)
            },
            {
              label: "Hide",
              action: d => alert(`Hiding ${JSON.stringify(d)}`)
            },
            {
              label: "Remove",
              action: d => alert(`Removing ${JSON.stringify(d)}`)
            }
          ]}
        />
      </HvProvider>
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
