import React from "react";
import { mount } from "enzyme";

import { HvHeader, HvProvider } from "../..";
import { Main, HeaderLink } from "../stories/Header.stories";

describe("Header", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Main />
      </HvProvider>
    );

    expect(wrapper.find(HvHeader)).toMatchSnapshot();
  });
  it("should be able to render the header with links", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <HeaderLink />
      </HvProvider>
    );

    expect(wrapper.find(HvHeader)).toMatchSnapshot();
  });
});
