import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "@hitachivantara/uikit-react-icons";
import { HvLoading } from "@core/components";
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
    const clickMock = vi.fn();
    render(<HvButton onClick={clickMock}>content</HvButton>);

    const button = screen.getByRole("button", { name: "content" });

    expect(button).toBeInTheDocument();
    expect(clickMock).not.toHaveBeenCalled();
    await userEvent.click(button);
    expect(clickMock).toHaveBeenCalledTimes(1);
    await userEvent.click(button);
    expect(clickMock).toHaveBeenCalledTimes(2);
  });

  it("disables for all variants", () => {
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
    const submitFn = vi.fn();
    render(
      <form onSubmit={submitFn}>
        <HvButton type="submit">Button</HvButton>
      </form>
    );
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toHaveAttribute("type", "submit");

    await userEvent.click(button);
    expect(submitFn).toHaveBeenCalled();
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
      render(
        <div data-testid="outer-div">
          <HvButton onClick={buttonSpyDismiss} onKeyDown={buttonSpyDismiss}>
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

      userEvent.keyboard("{tab}");
      userEvent.keyboard("{tab}");
      userEvent.keyboard("{enter}");
      await waitFor(() => {
        expect(buttonSpy).toBeCalledTimes(0);
        expect(buttonSpyDismiss).toBeCalledTimes(0);
      });
    });
  });

  describe("polymorphic button", () => {
    it("link", () => {
      const { getByRole } = render(
        <HvButton component="a" href="/path/to">
          Link
        </HvButton>
      );

      const button = getByRole("link", { name: "Link" });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/path/to");
    });

    it("disabled link", () => {
      const { getByRole } = render(
        <HvButton component="a" href="/path/to" disabled>
          Link
        </HvButton>
      );

      const button = getByRole("link", { name: "Link" });

      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("custom link", () => {
      const CustomLink = ({ to, children, ...others }) => (
        <a href={to} {...others}>
          {children}
        </a>
      );

      const { getByRole } = render(
        <HvButton component={CustomLink} to="/path/to">
          Link
        </HvButton>
      );

      const button = getByRole("link", { name: "Link" });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "/path/to");
    });

    it("disabled custom link", () => {
      const CustomLink = ({ to, children, ...others }) => (
        <a href={to} {...others}>
          {children}
        </a>
      );

      const { getByRole } = render(
        <HvButton component={CustomLink} to="/path/to" disabled>
          Link
        </HvButton>
      );

      const button = getByRole("link", { name: "Link" });

      expect(button).toHaveAttribute("aria-disabled", "true");
    });
  });
});
