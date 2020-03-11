/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import Lock from "@hv/uikit-react-icons/dist/Lock";
import Unlock from "@hv/uikit-react-icons/dist/Unlock";
import HvProvider from "../../Provider";
import ToggleButton from "../index";

let wrapper;

describe("ToggleButton withStyles", () => {
  wrapper = mount(
    <HvProvider>
      <ToggleButton notSelectedIcon={Unlock} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the unselected icon", () => {
    const iconElement = wrapper.find(Unlock);
    expect(iconElement.length).toBe(1);
  });

  it("should respond to select value", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} selectedIcon={Lock} selected />
      </HvProvider>
    );

    const selectIcon = wrapper.find(Lock);
    expect(selectIcon.length).toBe(1);
  });

  it("should call onClick", () => {
    const onClickMock = jest.fn(() => "mock");

    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} selectedIcon={Lock} onClick={onClickMock} />
      </HvProvider>
    );
    const divs = wrapper.find("div");
    divs.at(0).simulate("click");

    expect(onClickMock.mock.calls.length).toBe(1);
  });

  it("should set the default class if animated", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} animated />
      </HvProvider>
    );

    const selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("default")).toBe(true);
  });

  it("should toggle the classes if animated", () => {
    wrapper = mount(
      <HvProvider>
        <ToggleButton notSelectedIcon={Unlock} animated />
      </HvProvider>
    );

    const divs = wrapper.find("div");
    divs.at(0).simulate("click");

    let selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("selected")).toBe(true);

    divs.at(0).simulate("click");

    selectIcon = wrapper.find(Unlock);

    expect(selectIcon.hasClass("notSelected")).toBe(true);
  });
});
