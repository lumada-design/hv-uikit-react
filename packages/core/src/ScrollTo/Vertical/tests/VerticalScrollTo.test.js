/* eslint-env jest */

import React from "react";
import { render } from "testing-utils";
import { Main, WithContent } from "../stories/VerticalScrollTo.stories";

describe("VerticalScrollTo", () => {
  describe("Snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByText } = render(<WithContent />);
      const tab1 = getByText("Server status summary");
      expect(tab1).toBeInTheDocument();
      const tab2 = getByText("Optimization");
      expect(tab2).toBeInTheDocument();
      const tab3 = getByText("Performance analysis");
      expect(tab3).toBeInTheDocument();
      const tab4 = getByText("Insights");
      expect(tab4).toBeInTheDocument();
    });
  });
});
