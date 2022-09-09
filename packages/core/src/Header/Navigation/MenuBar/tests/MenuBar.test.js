import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../../Provider";
import MenuBar from "../index";

describe("MenuBar withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <MenuBar type="menubar" />
      </HvProvider>
    );

    expect(wrapper.find(MenuBar)).toMatchSnapshot();
  });
});
