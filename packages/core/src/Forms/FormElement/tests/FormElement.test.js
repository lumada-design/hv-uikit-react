import React from "react";
import { shallow } from "enzyme";
import { HvFormElement, HvBaseInput, HvInfoText } from "../../..";
import HvProvider from "../../../Provider";

describe.only("FormElement ", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <HvProvider>
        <HvFormElement elementValue="Albert2" elementStatus="invalid">
          <HvBaseInput style={{ paddingTop: "8px" }} />
          <HvInfoText
            style={{ marginTop: "8px" }}
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
