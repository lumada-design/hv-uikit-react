import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Brand from "../index";

describe("[v3] Brand withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Brand name="test" />
      </HvProvider>
    );

    expect(wrapper.find(Brand)).toMatchSnapshot();
  });
});
