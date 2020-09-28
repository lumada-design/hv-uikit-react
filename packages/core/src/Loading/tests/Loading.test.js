import React from "react";
import { mount } from "enzyme";
import HvButton from "../../Button";
import HvProvider from "../../Provider";
import Loading from "../Loading";
import { Hoc, Main } from "../stories/Loading.stories";

describe("Loading", () => {
  it("should show Loading ", () => {
    const wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    expect(wrapper.find(Loading).length).toEqual(1);
  });
  /* eslint-disable no-console */
  it("should show Loading as HOC", () => {
    // Set because of the warning sent by the react-table.
    const originalWarn = console.warn;
    console.warn = jest.fn();

    const wrapper = mount(
      <HvProvider>
        <Hoc />
      </HvProvider>
    );

    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(0);
    wrapper.find(HvButton).at(0).simulate("click");
    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(1);

    console.warn = originalWarn;
  });
});
