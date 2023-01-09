import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Disabled, Icons, Semantic } from "./Button.stories";
import { HvButton } from "./Button";

describe("Button", () => {
  describe("sample snapshot testing", () => {
    it("should match the snapshot", () => {
      const { asFragment } = render(<HvButton />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("storybook sample checks", () => {
    it("renders the disabled sample correctly", () => {
      const { getByRole } = render(<Disabled onClick={() => {}} />);

      const button = getByRole("button", { name: "Primary" });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it("renders the icons sample correctly", () => {
      const { getAllByRole } = render(<Icons onClick={() => {}} />);

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

    it("renders the semantic sample correctly", () => {
      const { getByRole } = render(<Semantic onClick={() => {}} />);

      const favoriteButton = getByRole("button", { name: "Favorite" });
      console.log(favoriteButton);
      expect(favoriteButton).toBeInTheDocument();
      const refreshButton = getByRole("button", { name: "Refresh" });
      expect(refreshButton).toBeInTheDocument();
      const deleteButton = getByRole("button", { name: "Delete" });
      expect(deleteButton).toBeInTheDocument();
      const optionsButtons = getByRole("button", { name: "More options" });
      expect(optionsButtons).toBeInTheDocument();
    });
  });

  it("disabled", () => {
    const { getByRole } = render(
      <div>
        <HvButton variant="primary" disabled>
          Primary
        </HvButton>
        <HvButton variant="primarySubtle" disabled>
          Primary Subtle
        </HvButton>
        <HvButton variant="primaryGhost" disabled>
          Primary Ghost
        </HvButton>
        <HvButton variant="secondary" disabled>
          Secondary
        </HvButton>
        <HvButton variant="secondarySubtle" disabled>
          Secondary Subtle
        </HvButton>
        <HvButton variant="secondaryGhost" disabled>
          Secondary Ghost
        </HvButton>
      </div>
    );
    const primary = getByRole("button", { name: "Primary" });
    expect(primary).toBeInTheDocument();
    expect(primary).toBeDisabled();
    const primarySubtle = getByRole("button", { name: "Primary Subtle" });
    expect(primarySubtle).toBeInTheDocument();
    expect(primarySubtle).toBeDisabled();
    const primaryGhost = getByRole("button", { name: "Primary Ghost" });
    expect(primaryGhost).toBeInTheDocument();
    expect(primaryGhost).toBeDisabled();

    const secondary = getByRole("button", { name: "Secondary" });
    expect(secondary).toBeInTheDocument();
    expect(secondary).toBeDisabled();
    const secondarySubtle = getByRole("button", { name: "Secondary Subtle" });
    expect(secondarySubtle).toBeInTheDocument();
    expect(secondarySubtle).toBeDisabled();
    const secondaryGhost = getByRole("button", { name: "Secondary Ghost" });
    expect(secondaryGhost).toBeInTheDocument();
    expect(secondaryGhost).toBeDisabled();
  });

  describe("interactions", () => {
    it("executes passed function on a click", () => {
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      const { getByRole } = render(
        <HvButton onClick={buttonSpy}>{buttonText}</HvButton>
      );

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      fireEvent.click(buttonToTest);
      expect(buttonSpy).toHaveBeenCalled();
    });

    it("executes the passed function on keydown", async () => {
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      const { getByRole } = render(
        <HvButton onClick={buttonSpy}>{buttonText}</HvButton>
      );

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();

      buttonToTest.focus();

      userEvent.keyboard("{enter}");
      await waitFor(() => {
        expect(buttonSpy).toHaveBeenCalledOnce();
      });
    });

    it("does not executes the passed function on click", () => {
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      const { getByRole } = render(
        <HvButton disabled onClick={buttonSpy}>
          {buttonText}
        </HvButton>
      );

      const buttonToTest = getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();
      fireEvent.click(buttonToTest);
      expect(buttonSpy).not.toHaveBeenCalled();
    });

    it("focus the button", async () => {
      const buttonSpy = vi.fn();
      const buttonSpyDismiss = vi.fn();
      const buttonDismissText = "don't focus me";
      const buttonText = "focus me";
      const { getByRole } = render(
        <div role="outer-div">
          <HvButton onClick={buttonSpyDismiss}>{buttonDismissText}</HvButton>
          <HvButton onClick={buttonSpy}>{buttonText}</HvButton>
        </div>
      );

      const div = getByRole("outer-div");
      expect(div).toBeInTheDocument();
      const buttonToDismissTest = getByRole("button", {
        name: buttonDismissText,
      });
      const buttonToTest = getByRole("button", { name: buttonDismissText });
      expect(buttonToTest).toBeInTheDocument();
      expect(buttonToDismissTest).toBeInTheDocument();

      userEvent.keyboard("{tab}");
      userEvent.keyboard("{tab}");
      userEvent.keyboard("{enter}");
      await waitFor(() => {
        expect(buttonSpy).toHaveBeenCalledOnce();
        expect(buttonSpyDismiss).toBeCalledTimes(0);
      });
    });

    it("does not focus the button", async () => {
      const buttonSpy = vi.fn();
      const buttonSpyDismiss = vi.fn();
      const buttonDismissText = "don't focus me";
      const buttonText = "focus me";
      const { getByRole } = render(
        <div role="outer-div">
          <HvButton onClick={buttonSpyDismiss} onKeyDown={buttonSpyDismiss}>
            {buttonDismissText}
          </HvButton>
          <HvButton disabled onClick={buttonSpy} onKeyDown={buttonSpy}>
            {buttonText}
          </HvButton>
        </div>
      );

      const div = getByRole("outer-div");
      expect(div).toBeInTheDocument();
      const buttonToDismissTest = getByRole("button", {
        name: buttonDismissText,
      });
      const buttonToTest = getByRole("button", { name: buttonDismissText });
      expect(buttonToTest).toBeInTheDocument();
      expect(buttonToDismissTest).toBeInTheDocument();

      userEvent.keyboard("{tab}");
      userEvent.keyboard("{tab}");
      userEvent.keyboard("{enter}");
      await waitFor(() => {
        expect(buttonSpy).toBeCalledTimes(0);
        expect(buttonSpyDismiss).toBeCalledTimes(0);
      });
    });
  });
});
