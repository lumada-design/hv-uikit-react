/* eslint-env jest */

import React from "react";
import { render } from "testing-utils";
import { Main, WithContent } from "../stories/HorizontalScrollTo.stories";

describe("HorizontalScrollTo", () => {
  describe("Snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByRole } = render(<WithContent />);
      const tab1 = getByRole("button", { name: "Server status summary" });
      expect(tab1).toBeInTheDocument();
      const tab2 = getByRole("button", { name: "Optimization" });
      expect(tab2).toBeInTheDocument();
      const tab3 = getByRole("button", { name: "Performance analysis" });
      expect(tab3).toBeInTheDocument();
      const tab4 = getByRole("button", { name: "Insights" });
      expect(tab4).toBeInTheDocument();
    });
  });
});
