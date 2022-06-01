/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import { HvProvider, HvMultiButton } from "../..";
import { Main, OnlyIcons, OnlyLabels } from "../stories/MultiButton.stories";

describe("Multibutton withStyles - Icons Only", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <OnlyIcons />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });

  it("should render the inner buttons and match to definitions", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("Multibutton - Text Only", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <OnlyLabels />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("Multibutton - Text and Icons", () => {
  const wrapper = mount(
    <HvProvider disableCssBaseline>
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(HvMultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});
