/* eslint-env jest */
import React from "react";
import { mount } from "enzyme";

import { HvCheckBox, HvProvider } from "../..";

import { Main } from "../stories/CheckBox.stories";

describe("CheckBox", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvCheckBox)).toMatchSnapshot();
  });

  it("should render the Checkbox components", () => {
    const buttonComponent = wrapper.find(HvCheckBox);
    expect(buttonComponent.length).toBe(3);
  });
});
