/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvProvider, HvButton } from "../..";

describe("HvProvider", () => {
  it("should generate global classnames by default", () => {
    const { getByRole } = render(
      <HvProvider disableCssBaseline>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    expect(button).toHaveClass("HvButton-root");
  });

  it("should call custom generateClassName", () => {
    const mockGenerateClassName = jest.fn();

    mockGenerateClassName.mockReturnValue("SameClassName");

    const { getByRole } = render(
      <HvProvider disableCssBaseline generateClassName={mockGenerateClassName}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    expect(mockGenerateClassName).toHaveBeenCalled();
    expect(button).toHaveClass("SameClassName");
  });

  it("should use a seed", () => {
    const { getByRole } = render(
      <HvProvider disableCssBaseline generateClassNameOptions={{ seed: "test" }}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    expect(button).toHaveClass("test-HvButton-root");
  });

  it("should disable global classnames", () => {
    const { getByRole } = render(
      <HvProvider disableCssBaseline generateClassNameOptions={{ disableGlobal: true }}>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    const hasButtonRootWithIndex = [...button.classList].some((cl) =>
      /^HvButton-root-\d\d?$/.test(cl)
    );
    expect(hasButtonRootWithIndex).toBeTruthy();
  });

  it("should disable global classnames and use a seed", () => {
    const { getByRole } = render(
      <HvProvider
        disableCssBaseline
        generateClassNameOptions={{ seed: "test", disableGlobal: true }}
      >
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    const hasButtonRootWithIndex = [...button.classList].some((cl) =>
      /^test-HvButton-root-\d\d?$/.test(cl)
    );
    expect(hasButtonRootWithIndex).toBeTruthy();
  });

  it("should disable classnames generation", () => {
    const { getByRole } = render(
      <HvProvider disableCssBaseline disableStylesGeneration>
        <HvButton>Hello</HvButton>
      </HvProvider>
    );

    const button = getByRole("button");

    expect(button).not.toHaveClass();
  });
});
