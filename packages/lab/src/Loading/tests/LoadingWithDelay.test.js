import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import LoadingWithDelay from "../LoadingWithDelay";

jest.useFakeTimers();

describe("LoadingWithDelay", () => {
  it("should show Loading only after the delay period", () => {
    const wrapper = mount(
      <HvProvider>
        <LoadingWithDelay delay={1000} />
      </HvProvider>
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper.find(LoadingWithDelay).length).toEqual(1);
  });
});
