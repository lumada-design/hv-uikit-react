import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Navigation from "../index";

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe("Navigation withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider disableCssBaseline>
        <Navigation data={[{ id: "someId", label: "someLabel" }]} />
      </HvProvider>
    );

    expect(wrapper.find(Navigation)).toMatchSnapshot();
  });
});
