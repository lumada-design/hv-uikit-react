import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../Provider";
import Header from "../Header";
import Brand from "../Brand";

describe("Header withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <Header>
          <Brand name="test" />
        </Header>
      </HvProvider>
    );

    expect(wrapper.find(Header)).toMatchSnapshot();
  });
});
