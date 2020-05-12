import React from "react";
import { mount } from "enzyme";

import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";

import HvProvider from "../../Provider";

import HvAvatar from "../index";
import { ImageAvatars, LetterAvatars, IconAvatars } from "../stories/Avatar.stories";

describe("Avatar ", () => {
  expect.extend(toHaveNoViolations);

  describe("image avatar", () => {
    it("should be accessible", async () => {
      const wrapper = mount(
        <HvProvider>
          <ImageAvatars />
        </HvProvider>
      );

      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe("icon avatar", () => {
    it("should be accessible", async () => {
      const wrapper = mount(
        <HvProvider>
          <IconAvatars />
        </HvProvider>
      );

      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe("letter avatar", () => {
    it("should be accessible", async () => {
      const wrapper = mount(
        <HvProvider>
          <LetterAvatars />
        </HvProvider>
      );

      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe("default avatar", () => {
    it("should be accessible", async () => {
      const wrapper = mount(
        <HvProvider>
          <HvAvatar />
        </HvProvider>
      );

      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });
});
