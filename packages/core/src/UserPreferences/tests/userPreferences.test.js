/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import HvProvider from "../../Provider";
import { Main } from "../stories/UserPreferences.stories";
import UserPreferences, { Action, Actions, Options, Group, Option } from "..";

const setupComponent = (
  <HvProvider disableCssBaseline>
    <Main />
  </HvProvider>
);
describe("UserPreferences withStyles", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(setupComponent);
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    wrapper = mount(setupComponent);
    expect(wrapper.find(UserPreferences).length).toBe(1);
    expect(wrapper.find(Actions).length).toBe(1);
    expect(wrapper.find(Action).length).toBe(1);
    expect(wrapper.find(Options).length).toBe(1);
    expect(wrapper.find(Group).length).toBe(4);
    expect(wrapper.find(Option).length).toBe(11);
  });
});
