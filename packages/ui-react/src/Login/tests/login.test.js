/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import LoginWithStyles from "../Main/index";
import HvProvider from "../../Provider";
import HvLogin from "../Main/Main";
import LoginForm from "../Forms/Login";
import Recovery from "../Forms/Recovery";
import HvButton from "../../Button/Button";
import Title from "../Forms/Login/Title/Title";

describe("Login ", () => {
  let loginMock;
  let recoverMock;
  let wrapper;

  const fakeEvent = { preventDefault: () => console.log("preventDefault") };

  beforeEach(async () => {
    loginMock = jest.fn();
    recoverMock = jest.fn();
    wrapper = mount(
      <HvProvider>
        <LoginWithStyles
          login={loginMock}
          recovery={recoverMock}
          allowRecover={true}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Login component", () => {
    const loginComponent = wrapper.find(HvLogin);

    expect(loginComponent.length).toBe(1);
  });

  it("should render the Login form", () => {
    const loginComponent = wrapper.find(LoginForm);

    expect(loginComponent.length).toBe(1);
  });

  it("shouldn't render the Recovery form", () => {
    const recoverComponent = wrapper.find(Recovery);

    expect(recoverComponent.length).toBe(0);
  });

  it("should render the Recovery component when click in the 'forgot your credentials'", () => {
    const forgotCredentialsLink = wrapper
      .find(LoginForm)
      .find(HvButton)
      .at(1);

    forgotCredentialsLink.simulate("click");

    const recoverComponent = wrapper.find(Recovery);

    expect(recoverComponent.length).toBe(1);
  });

  it("should call the login function )", () => {
    const loginComponent = wrapper.find(LoginForm).find("loginForm");

    loginComponent.simulate("submit", fakeEvent);

    expect(loginMock).toHaveBeenCalled();
  });

  it("should call the recovery function", () => {
    wrapper
      .find(LoginForm)
      .find(HvButton)
      .at(1)
      .simulate("click");

    const recoveryComponent = wrapper.find("recoveryForm");

    recoveryComponent.simulate("submit", fakeEvent);

    expect(recoverMock).toHaveBeenCalled();
  });

  it("it should render a component passed to the title", () => {
    const TitleComponentProp = () => <div />;

    TitleComponentProp.displayName = "mockComponent";

    const wrapper2 = mount(
      <HvProvider>
        <LoginWithStyles
          login={loginMock}
          recovery={recoverMock}
          titleComponent={<TitleComponentProp />}
        />
      </HvProvider>
    );

    const foundTitleComponent = wrapper2.find("mockComponent");

    expect(foundTitleComponent.length).toBe(1);
  });

  it("it should render a logo in the title", () => {
    const wrapper2 = mount(
      <HvProvider>
        <LoginWithStyles
          login={loginMock}
          recovery={recoverMock}
          logo={"/test)"}
        />
      </HvProvider>
    );

    const foundTitleComponent = wrapper2
      .find(Title)
      .children()
      .children()
      .first();

    expect(foundTitleComponent.type()).toBe("img");
  });
});
