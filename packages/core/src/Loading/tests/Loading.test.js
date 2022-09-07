import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import Loading from "../Loading";
import { Main } from "../stories/Loading.stories";

describe("Loading", () => {
  it("should show Loading ", () => {
    const wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Main />
      </HvProvider>
    );
    expect(wrapper.find(Loading).length).toEqual(3);
  });
});
