import React from "react";

import { render } from "@testing-library/react";

import { HvProvider } from "@hv/uikit-react-core";
import { Default } from "../stories/Tag.stories";
import "@testing-library/jest-dom/extend-expect";

describe("HvTags", () => {
  describe("sample snapshot testing", () => {
    it("Default", () => {
      const { container } = render(
        <HvProvider>
          <Default />
        </HvProvider>
      );
      expect(container).toMatchSnapshot();
    });
    it("renders a tag as expected", () => {
      const { container, getByText } = render(
        <HvProvider>
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
    });
  });
});
