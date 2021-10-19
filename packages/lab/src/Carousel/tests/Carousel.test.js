/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { Main } from "../stories/Carousel.stories";

describe("Carousel", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });
});
