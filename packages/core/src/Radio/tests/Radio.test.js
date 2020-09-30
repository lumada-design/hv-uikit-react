/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";

import { HvRadio, HvProvider } from "../..";

import { Main } from "../stories/Radio.stories";

describe("[v3] RadioButton", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvRadio)).toMatchSnapshot();
  });

  it("should render the Checkbox components", () => {
    const buttonComponent = wrapper.find(HvRadio);
    expect(buttonComponent.length).toBe(2);
  });
});
