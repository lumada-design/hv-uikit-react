/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
// import userEvent from "@testing-library/user-event";
// import { render, waitFor } from "testing-utils";
import { HvInput, HvPagination, HvProvider } from "../..";
import { Main } from "../stories/Pagination.stories";
import Select from "../Select";

describe("Default Pagination", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
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

  it("should render the pageSize dropdown", () => {
    const input = wrapper.find(Select);
    expect(input.length).toBe(1);
  });
});

describe("Pagination without pageJump Input", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <HvPagination showPageJump={false} />
    </HvProvider>
  );

  it("should NOT render the input", () => {
    const input = wrapper.find(HvInput);
    expect(input.length).toBe(0);
  });
});

describe("Pagination without pageSize select", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <HvPagination showPageSizeOptions={false} />
    </HvProvider>
  );

  it("should NOT render the select", () => {
    const input = wrapper.find("select");
    expect(input.length).toBe(0);
  });
});

// it("should focus first focusable element on open", async () => {
//   const { getByRole } = render(<Main />);
//   const openButton = getByRole("combobox");
//   userEvent.click(openButton); // open
//   expect(openButton).toHaveAttribute("aria-expanded", "true");
//   const option = getByRole("option", { name: "12" });
//   await waitFor(() => expect(option).toHaveFocus());
// });
