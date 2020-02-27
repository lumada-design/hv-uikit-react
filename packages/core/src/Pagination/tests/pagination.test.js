/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import HvInput from "../../Input";
import Pagination from "..";

describe("Default Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <Pagination pages={1} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Pagination component", () => {
    const paginationComponent = wrapper.find(Pagination);
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

describe("Pagination without pageJump Input", () => {
  const wrapper = mount(
    <HvProvider>
      <Pagination showPageJump={false} />
    </HvProvider>
  );

  it("should NOT render the input", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(0);
  });
});

describe("Pagination without pageSize select", () => {
  const wrapper = mount(
    <HvProvider>
      <Pagination showPageSizeOptions={false} />
    </HvProvider>
  );

  it("should NOT render the select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(0);
  });
});

describe("Custom Pagination", () => {
  const wrapper = mount(
    <HvProvider>
      <Pagination
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

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
