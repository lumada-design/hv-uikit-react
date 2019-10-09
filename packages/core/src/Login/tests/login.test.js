/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import LoginWithStyles from "../index";
import HvProvider from "../../Provider";
import HvLogin from "../Login";
import LoginForm from "../Forms/Login";
import Recovery from "../Forms/Recovery";
import HvButton from "../../Button";
import Title from "../Forms/Login/Title/Title";

describe("Login ", () => {
  let loginMock;
  let recoverMock;
  let wrapper;

  const fakeEvent = { preventDefault: () => {} };

  beforeEach(async () => {
    loginMock = jest.fn();
    recoverMock = jest.fn();
    wrapper = mount(
      <HvProvider>
        <LoginWithStyles
          login={loginMock}
          recovery={recoverMock}
          allowRecover
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Login component", () => {
    const loginComponent = wrapper.find(HvLogin);

    expect(loginComponent.length).toBe(1);
  });

  it("should render the Login form", () => {
    const loginComponent = wrapper.find(LoginForm);

    expect(loginComponent.length).toBe(1);
  });

  it("should enable the Login form after mount", () => {
    const loginComponent = wrapper.find(LoginForm);

    expect(loginComponent.length).toBe(1);
    expect(loginComponent.find('input[name="username"]').prop('disabled')).toBe(false);
    expect(loginComponent.find('input[name="password"]').prop('disabled')).toBe(false);
    expect(loginComponent.find('button[type="submit"]').prop('disabled')).toBe(false);
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
          logo="/test)"
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
