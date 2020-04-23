/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";
import Card from "..";

expect.extend(toHaveNoViolations);

describe("CardA11Y", () => {
  const configuration = {
    title: "title",
    subtitle: "subtitle",
    content: <div />,
    actions: "actions",
    icon: "icon"
  };

  const checkboxProps = {
    "aria-label": "test"
  };

  const mediaProps = {
    "aria-label": "test"
  };

  it("normal state", async () => {
    const wrapper = mount(
      <HvProvider>
        <Card
          icon={configuration.icon}
          headerTitle={configuration.title}
          subheader={configuration.subtitle}
          innerCardContent={configuration.content}
          actions={configuration.actions}
          mediaPath="path"
          isSelectable
          checkboxProps={checkboxProps}
          mediaProps={mediaProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  // it("disabled", async () => {
  //   const labels = {
  //     placeholder: "Insert text",
  //     infoText: "Info",
  //     inputLabel: "Label",
  //     warningText: "Error",
  //     maxCharQuantityWarningText: "Max characters exceeded"
  //   };

  //   const wrapper = mount(
  //     <HvProvider>
  //       <Input labels={labels} disabled />
  //     </HvProvider>
  //   );

  //   const results = await axe(wrapper.html());

  //   expect(results).toHaveNoViolations();
  // });

  // it("filled", async () => {
  //   const labels = {
  //     placeholder: "Insert text",
  //     infoText: "Info",
  //     inputLabel: "Label",
  //     warningText: "Error",
  //     maxCharQuantityWarningText: "Max characters exceeded"
  //   };

  //   const wrapper = mount(
  //     <HvProvider>
  //       <Input labels={labels} initialValue="Initial value" id="test" />
  //     </HvProvider>
  //   );

  //   const results = await axe(wrapper.html());

  //   expect(results).toHaveNoViolations();
  // });

  // it("invalid", async () => {
  //   const labels = {
  //     placeholder: "Insert text",
  //     infoText: "Info",
  //     inputLabel: "Label",
  //     warningText: "Error",
  //     maxCharQuantityWarningText: "Max characters exceeded"
  //   };

  //   const wrapper = mount(
  //     <HvProvider>
  //       <Input labels={labels} initialValue="Initial value" validationState="invalid" id="test" />
  //     </HvProvider>
  //   );

  //   const results = await axe(wrapper.html());

  //   expect(results).toHaveNoViolations();
  // });
});
