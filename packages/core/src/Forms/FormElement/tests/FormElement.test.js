import React from "react";
import { shallow } from "enzyme";
import { HvFormElement, HvBaseInput, HvHelperText, HvLabel } from "../../..";
import HvProvider from "../../../Provider";

describe.only("FormElement ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <HvFormElement elementValue="George" elementStatus="valid">
          <HvLabel key="1" id="test" label="First name">
            <HvBaseInput id="id-test" placeholder="Insert your name" />
          </HvLabel>
          <HvHelperText key="2" id="infotext-main" notification="warning">
            Write your name in this input do not put numbers
          </HvHelperText>
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
    expect(wrapper.find(HvHelperText)).toMatchSnapshot();
  });
});
