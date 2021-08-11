/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { Main } from "../stories/ColorPicker.stories";

describe("ColorPicker", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });
});
