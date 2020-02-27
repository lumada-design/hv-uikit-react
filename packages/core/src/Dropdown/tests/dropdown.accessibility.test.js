/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { axe, toHaveNoViolations } from "jest-axe";
import HvProvider from "../../Provider";
import Dropdown from "..";

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
        <Dropdown
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
