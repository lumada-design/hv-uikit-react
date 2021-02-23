/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";

import { HvCookiesConsentBanner } from "../..";

import { Main } from "../stories/CookiesConsentBanner.stories";

describe("CookiesConsentBanner", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getByText } = render(
        <HvCookiesConsentBanner
          title="This website uses cookies"
          content="Some text"
          buttons={<></>}
        />
      );

      const container = getByText("This website uses cookies");

      expect(container).toBeInTheDocument();
    });
  });
});
