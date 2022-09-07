import React from "react";
import { shallow } from "enzyme";
import { HvFormElement, HvBaseInput, HvWarningText, HvLabel } from "../../..";
import HvProvider from "../../../Provider";

describe.only("FormElement ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider cssBaseline={false}>
        <HvFormElement status="valid">
          <HvLabel key="1" id="test" label="First name">
            <HvBaseInput id="id-test" placeholder="Insert your name" defaultValue="George" />
          </HvLabel>
          <HvWarningText key="2" id="infotext-main">
            warning
          </HvWarningText>
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
    expect(wrapper.find(HvWarningText)).toMatchSnapshot();
  });
});
