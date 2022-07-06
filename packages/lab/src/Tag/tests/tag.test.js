/* eslint-disable no-console */
import React from "react";

import { render } from "@testing-library/react";

import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Default } from "../stories/Tag.stories";
import "@testing-library/jest-dom/extend-expect";

describe("HvTags", () => {
  describe("sample snapshot testing", () => {
    const consoleSpy = jest.fn();
    const originalWarn = console.warn;
    beforeEach(async () => {
      consoleSpy.mockReset();
      console.warn = consoleSpy;
    });

    afterEach(async () => {
      console.warn = originalWarn;
    });

    it("Default", () => {
      const { container } = render(
        <HvProvider disableCssBaseline>
          <Default />
        </HvProvider>
      );
      expect(container).toMatchSnapshot();
      expect(console.warn).toHaveBeenCalledTimes(4);
      expect(consoleSpy.mock.calls[0][1].includes("Please use the Tag component in Core")).toBe(
        true
      );
    });
    it("renders a tag as expected", () => {
      const { container, getByText } = render(
        <HvProvider disableCssBaseline>
          <Default />
        </HvProvider>
      );
      const tag1 = getByText("Hello");
      const tag2 = getByText("How");
      const tag3 = getByText("Are");
      const tag4 = getByText("You");
      expect(container).toBeInTheDocument();
      expect(tag1).toBeInTheDocument();
      expect(tag2).toBeInTheDocument();
      expect(tag3).toBeInTheDocument();
      expect(tag4).toBeInTheDocument();
      expect(console.warn).toHaveBeenCalledTimes(4);
      expect(consoleSpy.mock.calls[0][1].includes("Please use the Tag component in Core")).toBe(
        true
      );
    });
  });
});
