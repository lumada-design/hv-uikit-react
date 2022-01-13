/* eslint-env jest */

import React from "react";
import { render } from "testing-utils";
import { Main } from "../../stories/OverflowTooltip.stories";

describe("Overflow tooltip", () => {
  describe("Simple Tags", () => {
    const { ResizeObserver } = window;

    beforeEach(() => {
      delete window.ResizeObserver;
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    });

    afterEach(() => {
      window.ResizeObserver = ResizeObserver;
      jest.restoreAllMocks();
    });

    it("main story correctly render component elements", async () => {
      const { getByText, findAllByText } = render(<Main />);
      const longText =
        "This is a very long text that should be cut because it so long that it doesn't fit";
      const shortText = "This text is short";
      const text = await findAllByText(longText);
      expect(text.length).toBe(3);
      expect(getByText(shortText)).toBeInTheDocument();
    });
  });
});
