/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import Login from "..";

const MockFrom = () => <>Mock Form</>;

describe("Login ", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <Login>
          <MockFrom />
        </Login>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Login component", () => {
    const loginComponent = wrapper.find(Login);
    expect(loginComponent.length).toBe(1);
  });
});
