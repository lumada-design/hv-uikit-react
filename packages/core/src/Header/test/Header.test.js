import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import HeaderWithStyles from "../index";
import Brand from "../Brand";

describe("Header withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <HeaderWithStyles>
          <Brand />
        </HeaderWithStyles>
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
