import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../../../Provider";

import { HvComposedNavigation } from "../../index";

describe("<Navigation />", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvComposedNavigation locale="en" visibleYear={2020} visibleMonth={4} />
      </HvProvider>
    );
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvComposedNavigation)).toMatchSnapshot();
  });
});
