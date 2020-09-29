import React from "react";
import { mount } from "enzyme";
import { Popper } from "@material-ui/core";

import { HvDropDownMenu, HvProvider } from "../..";
import { Main } from "../stories/DropDownMenu.stories";
import { KeyboardNavigation } from "../stories/DropDownMenu.stories.test";

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

describe("[v3] DropDownMenu", () => {
  let wrapper;
  const SPACE = " ";
  const ENTER = "Enter";

  describe("[v3] component without portal", () => {
    beforeEach(() => {
      wrapper = mount(
        <HvProvider>
          <Main />
        </HvProvider>
      );
    });

    it("is rendered correctly and behaves as expected", () => {
      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("opens on click", () => {
      const button = wrapper.find("div");
      button.at(1).simulate("click");

      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("closes on double click", () => {
      const button = wrapper.find("div");
      button.at(0).simulate("click");
      button.at(0).simulate("click");
      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("opens on Enter", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);
    });

    it("closes on double Enter", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });

    it("opens on Space", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);
    });

    it("closes on double Space", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });

    it("opens and closes mixing mouse click, Enter, and Space", () => {
      const button = wrapper.find("button");

      button.simulate("click");
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("click");
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });
  });

  describe("[v3] component with portal", () => {
    beforeEach(() => {
      wrapper = mount(
        <HvProvider>
          <Main />
        </HvProvider>
      );
    });

    it("is rendered correctly and behaves as expected", () => {
      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("opens on click", () => {
      const button = wrapper.find("div");
      button.at(1).simulate("click");

      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("closes on double click", () => {
      const button = wrapper.find("div");
      button.at(0).simulate("click");
      button.at(0).simulate("click");
      expect(wrapper.find(HvDropDownMenu)).toMatchSnapshot();
    });

    it("opens on Enter", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);
    });

    it("closes on double Enter", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });

    it("opens on Space", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);
    });

    it("closes on double Space", () => {
      const button = wrapper.find("button");

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });

    it("opens and closes mixing mouse click, Enter, and Space", () => {
      const button = wrapper.find("button");

      button.simulate("click");
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("keydown", { key: ENTER, keyCode: 13 });
      expect(wrapper.find(Popper).prop("open")).toBe(false);

      button.simulate("keydown", { key: SPACE, keyCode: 32 });
      expect(wrapper.find(Popper).prop("open")).toBe(true);

      button.simulate("click");
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });

    it("closes after selecting one option", () => {
      wrapper = mount(
        <HvProvider>
          <KeyboardNavigation />
        </HvProvider>
      );

      expect(wrapper.find(Popper).prop("open")).toBe(false);

      const button = wrapper.find("button").at(1);
      button.simulate("click");

      expect(wrapper.find(Popper).prop("open")).toBe(true);

      const option = wrapper.find("li").at(0);
      option.simulate("click");
      expect(wrapper.find(Popper).prop("open")).toBe(false);
    });
  });
});
