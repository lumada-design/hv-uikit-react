/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../../config/axe-config";
import HvProvider from "../../../Provider";
import { HvFormElement, HvBaseInput, HvInfoText, HvLabel } from "../../..";

expect.extend(toHaveNoViolations);

describe("FormElementA11Y", () => {
  it("normal state", async () => {
    const inputId = "controlled-input";
    const inputLabelId = "controlled-input-label";

    const wrapper = mount(
      <HvProvider>
        <HvFormElement elementValue="Albert2" elementStatus="invalid">
          <HvLabel id={inputLabelId} htmlFor={inputId} label="First name" />
          <HvBaseInput
            style={{ paddingTop: "8px" }}
            inputProps={{
              "aria-labelledby": inputLabelId
            }}
            aria-labelledby={inputLabelId}
          />
          <HvInfoText
            style={{ marginTop: "8px" }}
            label="Names do not contain numbers"
            showWhen="invalid"
          />
        </HvFormElement>
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
