/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvInput, HvPagination, HvProvider } from "../..";
import { Main, ControlledSample } from "../stories/Pagination.stories";

describe("v3 Default Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Pagination component", () => {
    const paginationComponent = wrapper.find(HvPagination);
    expect(paginationComponent.length).toBe(1);
  });

  it("should render the pagination jump", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(1);
  });

  it("should render the pageSize select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(1);
  });
});

describe("v3 Pagination without pageJump Input", () => {
  const wrapper = mount(
    <HvProvider>
      <HvPagination showPageJump={false} />
    </HvProvider>
  );

  it("should NOT render the input", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(0);
  });
});

describe("v3 Pagination without pageSize select", () => {
  const wrapper = mount(
    <HvProvider>
      <HvPagination showPageSizeOptions={false} />
    </HvProvider>
  );

  it("should NOT render the select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(0);
  });
});

describe("v3 Custom Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <ControlledSample />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvPagination)).toMatchSnapshot();
  });
});
