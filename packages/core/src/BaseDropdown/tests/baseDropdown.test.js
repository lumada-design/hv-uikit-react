import React from "react";
import { mount } from "enzyme";
import { Popper } from "@material-ui/core";

import { HvProvider } from "../..";
import HvBaseDropDown from "..";
import { Main } from "../stories/BaseDropdown.stories.test";

jest.mock(
  "popper.js",
  () =>
    class {
      constructor() {
        return {
          scheduleUpdate: jest.fn(),
          update: jest.fn(),
          destroy: jest.fn(),
        };
      }
    }
);

describe("BaseDropDown", () => {
  let wrapper;
  let baseDropdown;
  const SPACE = " ";
  const ENTER = "Enter";

  const validatePopperOpen = (isOpen = true) =>
    expect(wrapper.find(Popper).prop("open")).toBe(isOpen);

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <Main />
      </HvProvider>
    );
    baseDropdown = wrapper.find("div").at(0);
  });

  it("is rendered correctly and behaves as expected", () => {
    expect(wrapper.find(HvBaseDropDown)).toMatchSnapshot();
  });

  it("opens on click", () => {
    baseDropdown.simulate("click");

    expect(wrapper.find(HvBaseDropDown)).toMatchSnapshot();
  });

  it("closes on double click", () => {
    baseDropdown.simulate("click");
    baseDropdown.simulate("click");
    expect(wrapper.find(HvBaseDropDown)).toMatchSnapshot();
  });

  it("opens on Enter", () => {
    baseDropdown.simulate("keydown", { key: ENTER, keyCode: 13 });
    validatePopperOpen();
  });

  it("closes on double Enter", () => {
    baseDropdown.simulate("keydown", { key: ENTER, keyCode: 13 });
    validatePopperOpen();

    baseDropdown.simulate("keydown", { key: ENTER, keyCode: 13 });
    validatePopperOpen(false);
  });

  it("opens on Space", () => {
    baseDropdown.simulate("keydown", { key: SPACE, keyCode: 32 });
    validatePopperOpen();
  });

  it("closes on double Space", () => {
    baseDropdown.simulate("keydown", { key: SPACE, keyCode: 32 });
    validatePopperOpen();

    baseDropdown.simulate("keydown", { key: SPACE, keyCode: 32 });
    validatePopperOpen(false);
  });

  it("opens and closes mixing mouse click, Enter, and Space", () => {
    baseDropdown.simulate("click");
    validatePopperOpen();

    baseDropdown.simulate("keydown", { key: ENTER, keyCode: 13 });
    validatePopperOpen(false);

    baseDropdown.simulate("keydown", { key: SPACE, keyCode: 32 });
    validatePopperOpen();

    baseDropdown.simulate("click");
    validatePopperOpen(false);
  });
});
