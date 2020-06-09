import React from "react";
import { shallow } from "enzyme";
import { HvFormElement, HvBaseInput, HvInfoText, HvLabel, HvErrorText } from "../../..";
import HvProvider from "../../../Provider";

describe.only("FormElement ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <HvFormElement elementValue="George" elementStatus="valid">
          <HvLabel key="1" id="label-id" label="First name">
            <HvBaseInput id="id-input" placeholder="Insert your name" />
          </HvLabel>
          <HvInfoText
            key="2"
            id="infotext-main-standby"
            label="Write your name in this input do not put numbers"
            showWhen="standBy"
          />
          <HvInfoText
            key="3"
            id="infotext-main-valid"
            label="Your value is valid"
            showWhen="valid"
          />
          <HvErrorText
            key="4"
            id="error-text-main"
            label="Names do not contain numbers"
            showWhen="invalid"
          />
        </HvFormElement>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvFormElement)).toMatchSnapshot();
    expect(wrapper.find(HvBaseInput)).toMatchSnapshot();
    expect(wrapper.find(HvInfoText)).toMatchSnapshot();
  });
});
