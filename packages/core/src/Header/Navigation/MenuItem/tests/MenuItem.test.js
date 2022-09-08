import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../../Provider";
import SelectionContext from "../../utils/SelectionContext";
import MenuItem from "../index";

const contextValue = ["someId"];

describe("MenuItem withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <SelectionContext.Provider value={contextValue}>
          <MenuItem item={{ id: "someId ", label: "someLabel" }} type="menubar" />
        </SelectionContext.Provider>
      </HvProvider>
    );

    expect(wrapper.find(MenuItem)).toMatchSnapshot();
  });
});
