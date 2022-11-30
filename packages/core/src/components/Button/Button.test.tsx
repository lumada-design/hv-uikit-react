import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { Disabled, Icons, Semantic } from "./Button.stories";

describe("Button", () => {
  describe("sample snapshot testing", () => {
    it("should match the snapshot", () => {
      const { asFragment } = render(<Button />);
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
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="primarySubtle" disabled>
          Primary Subtle
        </Button>
        <Button variant="primaryGhost" disabled>
          Primary Ghost
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="secondarySubtle" disabled>
          Secondary Subtle
        </Button>
        <Button variant="secondaryGhost" disabled>
          Secondary Ghost
        </Button>
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
        <Button onClick={buttonSpy}>{buttonText}</Button>
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
        <Button onClick={buttonSpy}>{buttonText}</Button>
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
        <Button disabled onClick={buttonSpy}>
          {buttonText}
        </Button>
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
          <Button onClick={buttonSpyDismiss}>{buttonDismissText}</Button>
          <Button onClick={buttonSpy}>{buttonText}</Button>
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
          <Button onClick={buttonSpyDismiss} onKeyDown={buttonSpyDismiss}>
            {buttonDismissText}
          </Button>
          <Button disabled onClick={buttonSpy} onKeyDown={buttonSpy}>
            {buttonText}
          </Button>
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
