/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render, fireEvent, waitFor } from "testing-utils";

import { HvButton } from "../..";
import { Main, DisabledButtons, SemanticWithIcons, Icons } from "../stories/Button.stories";

describe("HvButton", () => {
  describe("sample snapshot testing", () => {
    it("Main (Vertical)", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("storybook samples checks", () => {
    it("renders the main sample correctly", () => {
      const { getByRole } = render(<Main />);

      const primaryButton = getByRole("button", { name: "Primary" });
      expect(primaryButton).toBeInTheDocument();
      const secondaryButton = getByRole("button", { name: "Secondary" });
      expect(secondaryButton).toBeInTheDocument();
      const ghostButton = getByRole("button", { name: "Ghost" });
      expect(ghostButton).toBeInTheDocument();
      const semanticButton = getByRole("button", { name: "Semantic" });
      expect(semanticButton).toBeInTheDocument();
    });

    it("renders the disabled sample correctly", () => {
      const { getByRole } = render(<DisabledButtons />);

      const primaryButton = getByRole("button", { name: "Primary" });
      expect(primaryButton).toBeInTheDocument();
      expect(primaryButton).toBeDisabled();
      const secondaryButton = getByRole("button", { name: "Secondary" });
      expect(secondaryButton).toBeInTheDocument();
      expect(secondaryButton).toBeDisabled();
      const ghostButton = getByRole("button", { name: "Ghost" });
      expect(ghostButton).toBeInTheDocument();
      expect(ghostButton).toBeDisabled();
      const semanticButton = getByRole("button", { name: "Semantic" });
      expect(semanticButton).toBeInTheDocument();
      expect(semanticButton).toBeDisabled();
    });

    it("renders the semantic sample correctly", () => {
      const { getByRole } = render(<SemanticWithIcons />);

      const favoriteButton = getByRole("button", { name: "Favorite" });
      expect(favoriteButton).toBeInTheDocument();
      const refreshButton = getByRole("button", { name: "Refresh" });
      expect(refreshButton).toBeInTheDocument();
      const deleteButton = getByRole("button", { name: "Delete" });
      expect(deleteButton).toBeInTheDocument();
      const optionsButtons = getByRole("button", { name: "More options" });
      expect(optionsButtons).toBeInTheDocument();
    });

    it("renders the icons sample correctly", () => {
      const { getAllByRole } = render(<Icons />);

      const playButton = getAllByRole("button", { name: "Play" });
      expect(playButton.length).toEqual(2);
      expect(playButton[0]).toBeInTheDocument();
      expect(playButton[1]).toBeInTheDocument();
      const pauseButton = getAllByRole("button", { name: "Pause" });
      expect(pauseButton.length).toEqual(2);
      expect(pauseButton[0]).toBeInTheDocument();
      expect(pauseButton[1]).toBeInTheDocument();
      const stopButton = getAllByRole("button", { name: "Stop" });
      expect(stopButton.length).toEqual(2);
      expect(stopButton[0]).toBeInTheDocument();
      expect(stopButton[1]).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("executes the passed function on click", () => {
      const buttonSpy = jest.fn();
      const buttonText = "click me";
      const { getByRole } = render(<HvButton onClick={buttonSpy}>{buttonText}</HvButton>);

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      userEvent.click(buttonToTest);
      expect(buttonSpy).toHaveBeenCalled();
    });

    it("executes the passed function on keydown", async () => {
      const buttonSpy = jest.fn();
      const buttonText = "click me";
      const { getByRole } = render(<HvButton onKeyDown={buttonSpy}>{buttonText}</HvButton>);

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      userEvent.tab();
      expect(buttonToTest).toHaveFocus();
      fireEvent.keyDown(buttonToTest, { key: "Enter", keyCode: 13 });
      await waitFor(() => {
        expect(buttonSpy).toHaveBeenCalledTimes(1);
      });
    });

    it("does not executes the passed function on click", () => {
      const buttonSpy = jest.fn();
      const buttonText = "click me";
      const { getByRole } = render(
        <HvButton disabled onClick={buttonSpy}>
          {buttonText}
        </HvButton>
      );

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      userEvent.click(buttonToTest);
      expect(buttonSpy).not.toHaveBeenCalled();
    });

    it("does not focus the button", () => {
      const buttonSpy = jest.fn();
      const buttonText = "click me";
      const { getByRole } = render(
        <HvButton disabled onKeyDown={buttonSpy}>
          {buttonText}
        </HvButton>
      );

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      userEvent.tab();
      expect(buttonToTest).not.toHaveFocus();
    });
  });
});
