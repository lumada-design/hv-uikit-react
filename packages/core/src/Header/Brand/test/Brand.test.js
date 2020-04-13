import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Brand from "..";

describe("Brand withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Brand />
      </HvProvider>
    );

    expect(wrapper.find(Brand)).toMatchSnapshot();
  });
});
