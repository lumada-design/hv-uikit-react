/* eslint-env jest */
import React from "react";

import { render, act } from "testing-utils";

import useControlled from "../useControlled";

const TestComponent = ({ value: valueProp, defaultValue, children }) => {
  const [value, setValue] = useControlled(valueProp, defaultValue);

  return children({ value, setValue });
};

describe("useControlled", () => {
  it("state can be changed when uncontrolled", () => {
    let valueState;
    let setValueState;

    render(
      <TestComponent defaultValue={1}>
        {({ value, setValue }) => {
          valueState = value;
          setValueState = setValue;
          return null;
        }}
      </TestComponent>
    );

    expect(valueState).toEqual(1);

    act(() => {
      setValueState(2);
    });

    expect(valueState).toEqual(2);
  });

  it("state can't be changed when controlled", () => {
    let valueState;
    let setValueState;

    render(
      <TestComponent value={1}>
        {({ value, setValue }) => {
          valueState = value;
          setValueState = setValue;
          return null;
        }}
      </TestComponent>
    );

    expect(valueState).toEqual(1);

    act(() => {
      setValueState(2);
    });

    expect(valueState).toEqual(1);
  });
});
