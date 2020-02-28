/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";

import HvProvider from "../../../Provider";
import ActionsWithStyles from "../index";

window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

const mockClick = jest.fn();

const data = [
  {
    id: "1",
    element: <div>Test 1</div>,
    onClick: mockClick
  }
];

describe("Actions withStyles", () => {
  let wrapper;

  it("should be able to render", () => {
    wrapper = mount(
      <HvProvider>
        <ActionsWithStyles data={data} />
      </HvProvider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
