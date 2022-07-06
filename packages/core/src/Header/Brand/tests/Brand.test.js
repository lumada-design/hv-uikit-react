import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Brand from "../index";

describe("Brand withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Brand name="test" />
      </HvProvider>
    );

    expect(wrapper.find(Brand)).toMatchSnapshot();
  });
});
