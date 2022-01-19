/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { CloseXS } from "@hitachivantara/uikit-react-icons";

import HvProvider from "../../../Provider";
import HvAdornment from "../Adornment";

describe("Adornment", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvAdornment icon={<CloseXS />} />
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
