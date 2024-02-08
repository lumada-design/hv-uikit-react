import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "@hitachivantara/uikit-react-icons";

import { HvLoading } from "../Loading";
import { HvButton } from "./Button";
import { buttonVariant } from "./types";

describe("Button", () => {
  it("renders the content", () => {
    render(<HvButton>content</HvButton>);

    expect(screen.getByRole("button", { name: "content" })).toBeInTheDocument();
  });

  it("renders the custom content", () => {
    render(
      <HvButton
        startIcon={<Alert data-testid="startId" />}
        endIcon={<Alert data-testid="endId" />}
      >
        <HvLoading data-testid="loadingId" />
        content
      </HvButton>
    );

    expect(screen.getByTestId("startId")).toBeInTheDocument();
    expect(screen.getByTestId("endId")).toBeInTheDocument();
    expect(screen.getByTestId("loadingId")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("content");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const clickMock = vi.fn();
    render(<HvButton onClick={clickMock}>content</HvButton>);

    const button = screen.getByRole("button", { name: "content" });

    expect(button).toBeInTheDocument();
    expect(clickMock).not.toHaveBeenCalled();

    await user.click(button);
    expect(clickMock).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(clickMock).toHaveBeenCalledTimes(2);
  });

  it("disabled for all variants", () => {
    render(
      <div>
        {buttonVariant.map((variant) => (
          <HvButton key={variant} variant={variant} disabled>
            {variant}
          </HvButton>
        ))}
      </div>
    );

    buttonVariant.forEach((variant) => {
      const button = screen.getByRole("button", { name: variant });
      expect(button).toBeDisabled();
    });
  });

  it(`is type="button" by default`, () => {
    render(
      <form>
        <HvButton>Button</HvButton>
      </form>
    );
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toHaveAttribute("type", "button");
  });

  it(`submits form when type="submit"`, async () => {
    const user = userEvent.setup();
    const submitFn = vi.fn();
    render(
      <form onSubmit={submitFn}>
        <HvButton type="submit">Button</HvButton>
      </form>
    );

    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toHaveAttribute("type", "submit");

    await user.click(button);
    expect(submitFn).toHaveBeenCalled();
  });

  describe("interactions", () => {
    it("executes passed function on a click", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      render(<HvButton onClick={buttonSpy}>{buttonText}</HvButton>);

      const buttonToTest = screen.getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();

      await user.click(buttonToTest);
      expect(buttonSpy).toHaveBeenCalled();
    });

    it("executes the passed function on keydown", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      render(<HvButton onClick={buttonSpy}>{buttonText}</HvButton>);

      const buttonToTest = screen.getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();

      buttonToTest.focus();

      await user.keyboard("{enter}");
      expect(buttonSpy).toHaveBeenCalledOnce();
    });

    it("does not executes the passed function on click", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      const buttonText = "click me";
      render(
        <HvButton disabled onClick={buttonSpy}>
          {buttonText}
        </HvButton>
      );

      const buttonToTest = screen.getByRole("button", { name: buttonText });
      expect(buttonToTest).toBeInTheDocument();

      await user.click(buttonToTest);
      expect(buttonSpy).not.toHaveBeenCalled();
    });

    it("focus the button", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      const buttonSpyDismiss = vi.fn();
      const buttonDismissText = "don't focus me";
      const buttonText = "focus me";
      render(
        <div data-testid="outer-div">
          <HvButton onClick={buttonSpyDismiss}>{buttonDismissText}</HvButton>
          <HvButton onClick={buttonSpy}>{buttonText}</HvButton>
        </div>
      );

      const div = screen.getByTestId("outer-div");
      expect(div).toBeInTheDocument();

      const buttonToDismissTest = screen.getByRole("button", {
        name: buttonDismissText,
      });
      const buttonToTest = screen.getByRole("button", {
        name: buttonDismissText,
      });
      expect(buttonToTest).toBeInTheDocument();
      expect(buttonToDismissTest).toBeInTheDocument();

      await user.keyboard("{tab}");
      await user.keyboard("{tab}");
      await user.keyboard("{enter}");
      expect(buttonSpy).toHaveBeenCalledOnce();
      expect(buttonSpyDismiss).toBeCalledTimes(0);
    });

    it("does not focus the button", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      const buttonSpyDismiss = vi.fn();
      const buttonDismissText = "don't focus me";
      const buttonText = "focus me";
      render(
        <div data-testid="outer-div">
          <HvButton
            disabled
            onClick={buttonSpyDismiss}
            onKeyDown={buttonSpyDismiss}
          >
            {buttonDismissText}
          </HvButton>
          <HvButton disabled onClick={buttonSpy} onKeyDown={buttonSpy}>
            {buttonText}
          </HvButton>
        </div>
      );

      const div = screen.getByTestId("outer-div");
      expect(div).toBeInTheDocument();

      const buttonToDismissTest = screen.getByRole("button", {
        name: buttonDismissText,
      });
      const buttonToTest = screen.getByRole("button", {
        name: buttonDismissText,
      });
      expect(buttonToTest).toBeInTheDocument();
      expect(buttonToDismissTest).toBeInTheDocument();

      await user.keyboard("{tab}");
      await user.keyboard("{enter}");
      await user.keyboard("{tab}");
      await user.keyboard("{enter}");
      expect(buttonSpy).toBeCalledTimes(0);
      expect(buttonSpyDismiss).toBeCalledTimes(0);
    });
  });

  describe("polymorphic button", () => {
    const CustomLink = ({ to, children, ...others }: any) => (
      <a href={to} {...others}>
        {children}
      </a>
    );

    it("has href", async () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      render(
        <HvButton component="a" href="/path/to" onClick={buttonSpy}>
          Link
        </HvButton>
      );

      const button = screen.getByRole("link", { name: "Link" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/path/to");

      await user.click(button);
      expect(buttonSpy).toHaveBeenCalledOnce();
    });

    it("custom link", () => {
      render(
        <HvButton component={CustomLink} to="/path/to">
          Link
        </HvButton>
      );

      const button = screen.getByRole("link", { name: "Link" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/path/to");
    });
  });

  describe("focusableWhenDisabled", () => {
    it("not disabled, aria-disabled, focusable, and not clickable on click and key down for all variants", () => {
      const user = userEvent.setup();
      const buttonSpy = vi.fn();
      render(
        <div>
          {buttonVariant.map((variant) => (
            <HvButton
              onClick={buttonSpy}
              key={variant}
              variant={variant}
              focusableWhenDisabled
              disabled
            >
              {variant}
            </HvButton>
          ))}
        </div>
      );

      buttonVariant.forEach(async (variant) => {
        const button = screen.getByRole("button", { name: variant });

        expect(button).not.toBeDisabled();
        expect(button).toHaveAttribute("aria-disabled", "true");

        await user.click(button);
        expect(buttonSpy).not.toHaveBeenCalled();

        await user.keyboard("{tab}");
        expect(button).toHaveFocus();

        await user.keyboard("{enter}");
        expect(buttonSpy).not.toHaveBeenCalled();
      });
    });
  });
});
