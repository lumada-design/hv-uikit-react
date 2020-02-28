/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { axe, toHaveNoViolations } from "jest-axe";

import HvProvider from "../../Provider";
import Input from "..";

expect.extend(toHaveNoViolations);

describe("InputA11Y", () => {
  it("normal state", async () => {
    const labels = {
      placeholder: "Insert text",
      infoText: "Info",
      inputLabel: "Label",
      warningText: "Error",
      maxCharQuantityWarningText: "Max characters exceeded"
    };

    const wrapper = mount(
      <HvProvider>
        <Input labels={labels} id="test" />
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
        <Input labels={labels} disabled />
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
        <Input labels={labels} initialValue="Initial value" id="test" />
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
        <Input
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
