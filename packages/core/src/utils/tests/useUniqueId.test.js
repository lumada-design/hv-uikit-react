/* eslint-env jest */
import React from "react";

import { render } from "testing-utils";

import useUniqueId from "../../useUniqueId";

const TestComponent = ({ id: idProp, children }) => {
  const id = useUniqueId(idProp, "test-component-prefix-");

  return children({ id });
};

describe("useUniqueId", () => {
  it("use provided id if defined", () => {
    let componentId;

    render(
      <TestComponent id="provided-id">
        {({ id }) => {
          componentId = id;
          return null;
        }}
      </TestComponent>
    );

    expect(componentId).toEqual("provided-id");
  });

  it("generate an id if undefined", () => {
    let componentId;

    render(
      <TestComponent>
        {({ id }) => {
          componentId = id;
          return null;
        }}
      </TestComponent>
    );

    expect(componentId).toBeDefined();

    // also check if it uses the prefix appended to something else
    expect(
      componentId.startsWith("test-component-prefix-") &&
        !componentId.endsWith("test-component-prefix-")
    ).toBe(true);
  });
});
