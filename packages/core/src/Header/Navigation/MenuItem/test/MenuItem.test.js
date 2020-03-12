import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../../Provider";
import SelectionContext from "../../utils/SelectionContext";
import MenuItem from "../index";

describe("MenuItem withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    const contextValue = ["someId"];

    wrapper = mount(
      <HvProvider>
        <SelectionContext.Provider value={contextValue}>
          <MenuItem item={{ id: "someId ", label: "someLabel" }} type="menubar" />
        </SelectionContext.Provider>
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
