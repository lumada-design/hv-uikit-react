/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvComponentName } from "../..";

import { Main } from "../stories/ComponentName.stories";

describe("ComponentName", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByText } = render(<HvComponentName />);

      const container = getByText("ComponentName");

      expect(container).toBeInTheDocument();
    });
  });
});
