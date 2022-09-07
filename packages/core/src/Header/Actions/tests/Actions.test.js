/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import Actions from "..";

window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe("Actions withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider cssBaseline={false}>
        <Actions />
      </HvProvider>
    );

    expect(wrapper.find(Actions)).toMatchSnapshot();
  });
});
