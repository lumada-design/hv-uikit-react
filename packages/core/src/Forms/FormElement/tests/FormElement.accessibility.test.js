/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";
import HvProvider from "../../../Provider";
import { HvFormElement, HvBaseInput, HvHelperText, HvLabel } from "../../..";

expect.extend(toHaveNoViolations);

describe("FormElementA11Y", () => {
  it("normal state", async () => {
    const inputId = "controlled-input";
    const inputLabelId = "controlled-input-label";

    const wrapper = mount(
      <HvProvider>
        <HvFormElement elementValue="Albert2" elementStatus="invalid">
          <HvLabel id={inputLabelId} label="First name">
            <HvBaseInput
              id={inputId}
              inputProps={{
                "aria-labelledby": inputLabelId
              }}
              aria-labelledby={inputLabelId}
            />
          </HvLabel>
          <HvHelperText key="2" id="infotext-main" notification="warning">
            Write your name in this input do not put numbers
          </HvHelperText>
        </HvFormElement>
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
