/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import InfoText from "../InfoText";

/* eslint-disable no-console */

const labels = {
  infoText: "Info text for a valid string",
  warningText: "something wrong"
};

describe("InfoText", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <InfoText id="base" inputState="valid" labels={labels} />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(InfoText)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const infoTextComponent = wrapper.find(InfoText);
    expect(infoTextComponent.length).toBe(1);
  });
});
