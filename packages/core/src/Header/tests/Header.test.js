import React from "react";
import { mount } from "enzyme";

import { HvHeader, HvProvider } from "../..";
import { Main } from "../stories/Header.stories";

describe("Header", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Main />
      </HvProvider>
    );

    expect(wrapper.find(HvHeader)).toMatchSnapshot();
  });
});
