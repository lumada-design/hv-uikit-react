import React from "react";
import { mount } from "enzyme";
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import LoadingWithDelay from "../LoadingWithDelay";
import Loading from "../index";

jest.useFakeTimers();

describe("LoadingWithDelay", () => {
  it("should show Loading only after the delay period", () => {
    const wrapper = mount(
      <HvProvider>
        <LoadingWithDelay delay={1000} />
      </HvProvider>
    );
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(Loading).length).toEqual(1);
  });
});
