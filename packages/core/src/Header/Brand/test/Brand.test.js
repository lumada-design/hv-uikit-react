import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import BrandWithStyles from "../index";

describe("Brand withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <BrandWithStyles />
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
