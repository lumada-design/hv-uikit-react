/* eslint-env jest */

import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
import HvProvider from "../../Provider";
import LoginForm from "../Forms/Login";
import Recovery from "../Forms/Recovery";
import HvButton from "../../Button";
import Title from "../Forms/Login/Title/Title";
import MessageElement from "../Forms/MessageElement";
import Login from "..";

const MyProvider = ({ children }) => <HvProvider>{children}</HvProvider>;

MyProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

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
        <Login login={loginMock} recovery={recoverMock} allowRecover />
      </HvProvider>,
      {
        wrappingComponent: MyProvider,
      }
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Login component", () => {
    const loginComponent = wrapper.find(Login);

    expect(loginComponent.length).toBe(1);
  });

  it("should render the Login form", () => {
    const loginComponent = wrapper.find(LoginForm);

    expect(loginComponent.length).toBe(1);
  });

  it("should enable the Login form after mount", () => {
    const loginComponent = wrapper.find(LoginForm);

    expect(loginComponent.length).toBe(1);
    expect(loginComponent.find('input[name="username"]').prop("disabled")).toBe(false);
    expect(loginComponent.find('input[name="password"]').prop("disabled")).toBe(false);
    expect(loginComponent.find('button[type="submit"]').prop("disabled")).toBe(false);
  });

  it("shouldn't render the Recovery form", () => {
    const recoverComponent = wrapper.find(Recovery);

    expect(recoverComponent.length).toBe(0);
  });

  it("should render the Recovery component when click in the 'forgot your credentials'", () => {
    const forgotCredentialsLink = wrapper.find(LoginForm).find(HvButton).at(1);

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
    wrapper.find(LoginForm).find(HvButton).at(1).simulate("click");

    const recoveryComponent = wrapper.find("recoveryForm");

    recoveryComponent.simulate("submit", fakeEvent);

    expect(recoverMock).toHaveBeenCalled();
  });

  it("it should render a component passed to the title", () => {
    const TitleComponentProp = () => <div />;

    TitleComponentProp.displayName = "mockComponent";

    const wrapper2 = mount(
      <HvProvider>
        <Login login={loginMock} recovery={recoverMock} titleComponent={<TitleComponentProp />} />
      </HvProvider>
    );

    const foundTitleComponent = wrapper2.find("mockComponent");

    expect(foundTitleComponent.length).toBe(1);
  });

  it("it should render a logo in the title", () => {
    const wrapper2 = mount(
      <HvProvider>
        <Login login={loginMock} recovery={recoverMock} logo="/test)" />
      </HvProvider>
    );

    const foundTitleComponent = wrapper2.find(Title).children().children().children().first();

    expect(foundTitleComponent.type()).toBe("img");
  });

  it("should render initial custom message", () => {
    const msg = { text: "some message." };
    const wrapper2 = mount(
      <HvProvider>
        <Login login={loginMock} customMessage={msg} />
      </HvProvider>
    );

    const foundMsg = wrapper2.find(MessageElement).children().children().first();

    expect(foundMsg.text()).toBe(msg.text);
  });
});
