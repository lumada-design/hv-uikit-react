/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import LoginContainer from "..";

const MockFrom = () => <>Mock Form</>;

describe("Login ", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <LoginContainer>
          <MockFrom />
        </LoginContainer>
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Login component", () => {
    const loginContainerComponent = wrapper.find(LoginContainer);

    expect(loginContainerComponent.length).toBe(1);
  });
});
