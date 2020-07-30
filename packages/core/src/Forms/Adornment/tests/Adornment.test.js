/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Close from "@hv/uikit-react-icons/dist/CloseXS";

import HvProvider from "../../../Provider";
import HvAdornment from "../Adornment";

describe("v3 Adornment", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvAdornment icon={<Close />} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvAdornment)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const inputAdornmentComponent = wrapper.find(HvAdornment);
    expect(inputAdornmentComponent.length).toBe(1);
  });
});
