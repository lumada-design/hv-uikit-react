/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { Map } from "@hitachivantara/uikit-react-icons";
import { HvInput, HvProvider } from "../..";

/* eslint-disable no-console */

const labels = {
  inputLabel: "inputLabel",
  placeholder: "placeholder",
  infoText: "infoText",
  warningText: "warningText",
  maxCharQuantityWarningText: "maxCharQuantityWarningText",
  minCharQuantityWarningText: "minCharQuantityWarningText",
  requiredWarningText: "requiredWarningText",
};

const getInputProps = (ParentElement) => ParentElement.find(HvInput).props();

describe("Input", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HvInput />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvInput)).toMatchSnapshot();
  });

  it("should render the Input component", () => {
    const inputComponent = wrapper.find("HvInput");
    expect(inputComponent.length).toBe(1);
  });

  it("should disable the Input component", () => {
    wrapper = mount(
      <HvProvider>
        <HvInput disabled />
      </HvProvider>
    );

    // not using jest-dom yet
    // eslint-disable-next-line jest-dom/prefer-enabled-disabled
    expect(getInputProps(wrapper).disabled).toBe(true);
  });

  it("should pass other props to the child input component", () => {
    wrapper = mount(
      <HvProvider>
        <HvInput
          inputProps={{
            maxLength: 250,
          }}
        />
      </HvProvider>
    );
    expect(wrapper.find(HvInput)).toMatchSnapshot();
  });

  it("should show the custom map icon", () => {
    wrapper = mount(
      <HvProvider>
        <HvInput labels={labels} endAdornment={<Map />} />
      </HvProvider>
    );
    const inputComponent = wrapper.find(Map);
    expect(inputComponent.length).toBe(1);
  });
});
