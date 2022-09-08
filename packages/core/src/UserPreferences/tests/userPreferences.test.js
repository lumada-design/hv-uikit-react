/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import HvProvider from "../../Provider";
import { Main } from "../stories/UserPreferences.stories";
import UserPreferences, {
  HvUserPreferencesAction,
  HvUserPreferencesActions,
  HvUserPreferencesOptions,
  HvUserPreferencesOptionsGroup,
  HvUserPreferencesOption,
} from "..";

const setupComponent = (
  <HvProvider cssBaseline="none">
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
    expect(wrapper.find(HvUserPreferencesActions).length).toBe(1);
    expect(wrapper.find(HvUserPreferencesAction).length).toBe(1);
    expect(wrapper.find(HvUserPreferencesOptions).length).toBe(1);
    expect(wrapper.find(HvUserPreferencesOptionsGroup).length).toBe(4);
    expect(wrapper.find(HvUserPreferencesOption).length).toBe(11);
  });
});
