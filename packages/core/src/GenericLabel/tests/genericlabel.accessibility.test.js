/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";
import BaseInput from "..";

expect.extend(toHaveNoViolations);

describe("BaseInputA11Y", () => {
  it("normal state", async () => {
    const labels = {
      placeholder: "Insert first name",
      infoText: "Please enter your first name",
      inputLabel: "First name",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <BaseInput labels={labels} id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("disabled", async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <BaseInput labels={labels} disabled />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("filled", async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <BaseInput labels={labels} initialValue="Initial value" id="test" />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("invalid", async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <BaseInput
          labels={labels}
          initialValue="Initial value"
          validationState="invalid"
          id="test"
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
