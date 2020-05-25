import React from "react";
import { mount } from "enzyme";
import HvButton from "../../Button";
import HvProvider from "../../Provider";
import Loading from "../Loading";
import { Main, Hoc, Inline } from "../stories/Loading.stories";

describe("Loading", () => {
  it("should show Loading ", () => {
    const wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    expect(wrapper.find(Loading).length).toEqual(2);
  });
  it("should show Loading as HOC", () => {
    // Set because of the warning sent by the react-table.
    // eslint-disable-next-line no-console
    const originalWarn = console.warn;
    // eslint-disable-next-line no-console
    console.warn = jest.fn();

    const wrapper = mount(
      <HvProvider>
        <Hoc />
      </HvProvider>
    );

    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(0);
    wrapper.find(HvButton).simulate("click");
    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(1);

    console.warn = originalWarn;
  });

  it("should show Loading as inline", () => {
    const wrapper = mount(
      <HvProvider>
        <Inline />
      </HvProvider>
    );

    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(0);
    wrapper.find(HvButton).simulate("click");
    expect(wrapper.find(".HvLoading-barContainer").length).toEqual(1);
  });
});
