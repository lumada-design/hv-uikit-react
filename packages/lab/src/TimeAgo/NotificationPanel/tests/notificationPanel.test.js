/* eslint-env jest */
/* eslint-disable no-console */
import React from "react";

import { render } from "testing-utils";
import { Main } from "../stories/NotificationPanel.stories";

describe("Notification Panel", () => {
  describe("sample snapshot testing", () => {
    const consoleSpy = jest.fn();
    const originalError = console.error;
    beforeEach(async () => {
      consoleSpy.mockReset();
      console.error = consoleSpy;
    });

    afterEach(async () => {
      console.error = originalError;
    });
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(consoleSpy.mock.calls[0][2].includes("is deprecated")).toBe(true);
    });
  });
});
