/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Close from "@hv/uikit-react-icons/dist/CloseXS";

import HvProvider from "../../../Provider";
import HvInputAdornment from "../InputAdornment";

describe("InputAdornment", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvInputAdornment icon={<Close />} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvInputAdornment)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const inputAdornmentComponent = wrapper.find(HvInputAdornment);
    expect(inputAdornmentComponent.length).toBe(1);
  });
});
