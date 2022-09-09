/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Lock, Unlock } from "@hitachivantara/uikit-react-icons";
import { HvProvider, HvToggleButton } from "../..";
import { Main } from "../stories/ToggleButton.stories";

let wrapper;

describe("ToggleButton", () => {
  wrapper = mount(
    <HvProvider cssBaseline="none">
      <Main />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvToggleButton)).toMatchSnapshot();
  });

  it("should render the unselected icon", () => {
    const iconElement = wrapper.find(Unlock);
    expect(iconElement.length).toBe(1);
  });

  it("should respond to select value", () => {
    const selectIcon = wrapper.find(Lock);
    expect(selectIcon.length).toBe(0);
  });

  it("should call onClick", () => {
    const onClickMock = jest.fn(() => "mock");

    wrapper = mount(
      <HvProvider cssBaseline="none">
        <HvToggleButton
          notSelectedIcon={<Unlock />}
          selectedIcon={<Lock />}
          onClick={onClickMock}
        />
      </HvProvider>
    );
    const divs = wrapper.find("div");
    divs.at(0).simulate("click");

    expect(onClickMock.mock.calls.length).toBe(1);
  });
});
