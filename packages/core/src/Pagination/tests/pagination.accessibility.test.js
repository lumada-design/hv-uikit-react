/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
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

    const results = await axe(wrapper.html());
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

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
