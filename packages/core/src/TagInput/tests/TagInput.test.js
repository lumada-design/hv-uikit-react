/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvTagInput } from "../..";

import { Main } from "../stories/TagInput.stories";

describe("TagInput", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByText } = render(<HvTagInput />);

      const container = getByText("TagInput");

      expect(container).toBeInTheDocument();
    });
  });
});
