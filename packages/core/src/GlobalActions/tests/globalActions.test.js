/* eslint-env jest */

import React from "react";

import { render } from "testing-utils";
import { Backwards } from "@hitachivantara/uikit-react-icons";
import userEvent from "@testing-library/user-event";

import { HvButton, HvGlobalActions } from "../..";

import {
  Main,
  SectionGlobalActions,
  SampleWithCustomTitleAndAdditionalActions,
} from "../stories/GlobalActions.stories";

describe("GlobalActions", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });

    it("Global Section Actions", () => {
      const { container } = render(<SectionGlobalActions />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders the component as expected", () => {
      const { getAllByRole, getByText, getAllByText } = render(
        <SampleWithCustomTitleAndAdditionalActions />
      );

      const buttonsInPage = getAllByRole("button");
      expect(buttonsInPage.length).toBe(4);

      const primaryButton = getByText("Primary");
      const secondaryButtons = getAllByText("Secondary");
      expect(secondaryButtons.length).toBe(2);

      expect(primaryButton).toBeInTheDocument();
    });

    it("focuses elements with keyboard", () => {
      const { getAllByRole } = render(<SampleWithCustomTitleAndAdditionalActions />);

      const buttonsInPage = getAllByRole("button");
      expect(buttonsInPage.length).toBe(4);

      const [backButton, primaryButton, secondaryButton] = buttonsInPage;

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(backButton).toHaveFocus();
      userEvent.tab();
      expect(primaryButton).toHaveFocus();
      userEvent.tab();
      expect(secondaryButton).toHaveFocus();
      userEvent.tab({ shift: true });
      expect(primaryButton).toHaveFocus();
      userEvent.tab({ shift: true });
      expect(backButton).toHaveFocus();
    });

    it("executes the provided callback", () => {
      const onClickSpy = jest.fn();
      const BackButton = () => (
        <HvButton aria-label="Back" icon onClick={onClickSpy}>
          <Backwards />
        </HvButton>
      );
      const { getAllByRole } = render(
        <HvGlobalActions name="Detail Page Title" backButton={<BackButton />}>
          <HvButton category="primary">Approve & Share</HvButton>
          <HvButton category="secondary">Reset</HvButton>
        </HvGlobalActions>
      );

      const buttonsInPage = getAllByRole("button");
      const [backButton] = buttonsInPage;

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(backButton).toHaveFocus();
      userEvent.click(backButton);
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
