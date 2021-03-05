/* eslint-env jest */

import React from "react";

import { mount } from "enzyme";

import { HvProvider, HvButton } from "../..";

describe("HvProvider", () => {
  it("should generate global classnames by default", () => {
    const wrapper = mount(
      <HvProvider>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button");

    expect(button.hasClass("HvButton-root")).toBeTruthy();
  });

  it("should call custom generateClassName", () => {
    const mockGenerateClassName = jest.fn();

    mockGenerateClassName.mockReturnValue("SameClassName");

    const wrapper = mount(
      <HvProvider generateClassName={mockGenerateClassName}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button");

    expect(mockGenerateClassName).toHaveBeenCalled();
    expect(button.hasClass("SameClassName")).toBeTruthy();
  });

  it("should use a seed", () => {
    const wrapper = mount(
      <HvProvider generateClassNameOptions={{ seed: "test" }}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button");

    expect(button.hasClass("test-HvButton-root")).toBeTruthy();
  });

  it("should disable global classnames", () => {
    const wrapper = mount(
      <HvProvider generateClassNameOptions={{ disableGlobal: true }}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button").getDOMNode();

    const hasButtonRootWithIndex = [...button.classList].some((cl) =>
      /^HvButton-root-\d\d?$/.test(cl)
    );
    expect(hasButtonRootWithIndex).toBeTruthy();
  });

  it("should disable global classnames and use a seed", () => {
    const wrapper = mount(
      <HvProvider generateClassNameOptions={{ seed: "test", disableGlobal: true }}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button").getDOMNode();

    const hasButtonRootWithIndex = [...button.classList].some((cl) =>
      /^test-HvButton-root-\d\d?$/.test(cl)
    );
    expect(hasButtonRootWithIndex).toBeTruthy();
  });

  it("should disable classnames generation", () => {
    const wrapper = mount(
      <HvProvider disableStylesGeneration>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = wrapper.find("button").getDOMNode();

    expect(button.className).toBe("");
  });
});
