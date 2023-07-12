import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HvCheckBox } from "./CheckBox";

describe("CheckBox", () => {
  describe("general", () => {
    it("should render as expected", () => {
      render(<HvCheckBox value="dogs" label="Dogs" />);

      const checkbox = screen.getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();
      expect(screen.getByDisplayValue("dogs")).toBeInTheDocument();

      // Default
      expect(checkbox).not.toHaveAttribute("name");
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toBeEnabled();
      expect(checkbox).not.toBeRequired();
      expect(checkbox).not.toHaveAttribute("readonly");
      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeValid();
      expect(checkbox).not.toHaveAccessibleDescription();
    });

    it("should support custom input props", () => {
      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          inputProps={
            {
              "data-testid": "favorite-animal",
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("data-testid", "favorite-animal");
    });

    it("should call onFocusVisible if focused with keyboard", async () => {
      const onFocusMock = vi.fn();

      render(
        <HvCheckBox value="dogs" label="Dogs" onFocusVisible={onFocusMock} />
      );

      const checkbox = screen.getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();

      expect(document.body).toHaveFocus();

      // Focus
      await userEvent.tab();

      expect(checkbox).toHaveFocus();

      expect(onFocusMock).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when it loses focus", async () => {
      const onBlurMock = vi.fn();

      render(<HvCheckBox value="dogs" label="Dogs" onBlur={onBlurMock} />);

      const checkbox = screen.getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();
      expect(document.body).toHaveFocus();

      // Focus
      await userEvent.tab();

      expect(checkbox).toHaveFocus();

      // Unfocus
      await userEvent.tab();

      expect(checkbox).not.toHaveFocus();
      expect(onBlurMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("name", () => {
    it("should have a name", () => {
      render(<HvCheckBox name="snoopy" value="dogs" label="Dogs" />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("name", "snoopy");
    });
  });

  describe("checked", () => {
    it("should have a controlled checked state", async () => {
      render(<HvCheckBox value="dogs" label="Dogs" checked />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();

      // Check
      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("should have a uncontrolled default checked state", async () => {
      render(<HvCheckBox value="dogs" label="Dogs" defaultChecked />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe("indeterminate", () => {
    it("should be indeterminate", () => {
      render(<HvCheckBox value="dogs" label="Dogs" indeterminate />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
    });

    it("should clear the indeterminate state by clicking an uncontrolled checkbox (unchecked)", async () => {
      render(<HvCheckBox value="dogs" label="Dogs" indeterminate />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).not.toBeChecked();

      // Check
      await userEvent.click(checkbox);

      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeChecked();
    });

    it("should clear the indeterminate state by clicking an uncontrolled checkbox (checked)", async () => {
      render(
        <HvCheckBox value="dogs" label="Dogs" defaultChecked indeterminate />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeChecked();

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("required", () => {
    it("should be required", () => {
      render(<HvCheckBox value="dogs" label="Dogs" required />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeRequired();
    });

    it("should add an asterisk to the checkbox label when required", () => {
      render(<HvCheckBox value="dogs" label="Dogs" required />);

      const label = screen.getByText("Dogs", { selector: "label" });
      expect(label).toHaveTextContent("Dogs*");
    });
  });

  describe("readonly", () => {
    it("should be readonly", () => {
      render(<HvCheckBox value="dogs" label="Dogs" readOnly />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("readonly");
    });

    it("should not update state by clicking a readonly checkbox", async () => {
      const onChangeMock = vi.fn();

      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          readOnly
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(0);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("disabled", () => {
    it("should be disabled", () => {
      render(<HvCheckBox value="dogs" label="Dogs" disabled />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeDisabled();
    });

    it("should not update state by clicking a disabled checkbox", async () => {
      const onChangeMock = vi.fn();

      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          disabled
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox");
      checkbox.style.pointerEvents = "auto";

      expect(checkbox).toBeInTheDocument();

      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(0);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("label", () => {
    it("should show a label", () => {
      render(<HvCheckBox value="dogs" label="Dogs" />);

      const label = screen.getByText("Dogs", { selector: "label" });

      expect(label).toBeDefined();

      const checkbox = screen.getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();
    });

    it("should support an external label", () => {
      render(
        <>
          <span id="label-element-id">An external label</span>
          <HvCheckBox value="dogs" aria-labelledby="label-element-id" />
        </>
      );

      const checkbox = screen.getByRole("checkbox", {
        name: "An external label",
      });

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("aria-labelledby", "label-element-id");
    });

    it("should support aria-label", () => {
      render(<HvCheckBox value="dogs" aria-label="Dogs" />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("aria-label", "Dogs");
    });
  });

  describe("description", () => {
    it("should support an external description", () => {
      render(
        <>
          <span id="description-element-id">An external description</span>
          <HvCheckBox
            value="dogs"
            label="Dogs"
            aria-describedby="description-element-id"
          />
        </>
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAccessibleDescription("An external description");
    });
  });

  describe("onChange", () => {
    it("should trigger onChange by checking a checkbox ", async () => {
      const onChangeMock = vi.fn();

      render(<HvCheckBox value="dogs" label="Dogs" onChange={onChangeMock} />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // Check
      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        true,
        "dogs"
      );
    });

    it("should trigger onChange by unchecking a checkbox", async () => {
      const onChangeMock = vi.fn();

      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          defaultChecked
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // Uncheck
      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        false,
        "dogs"
      );
    });

    it("should trigger onChange by checking a indeterminate checkbox (unchecked)", async () => {
      const onChangeMock = vi.fn();

      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          indeterminate
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // Check
      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        true,
        "dogs"
      );
    });

    it("should trigger onChange by checking a indeterminate checkbox (checked)", async () => {
      const onChangeMock = vi.fn();

      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          indeterminate
          defaultChecked
          onChange={onChangeMock}
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // Uncheck
      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(
        expect.anything(),
        false,
        "dogs"
      );
    });
  });

  describe("status", () => {
    it("should display the statusMessage when the status is invalid", () => {
      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          status="invalid"
          statusMessage="The error message"
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("The error message");
    });

    it("should not display the statusMessage when the status is valid", () => {
      render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          status="valid"
          statusMessage="The error message"
        />
      );

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeValid();

      const error = screen.queryByText("The error message");

      expect(error).not.toBeInTheDocument();
    });

    it("built-in validation: should display error when required and not checked", async () => {
      render(<HvCheckBox value="dogs" label="Dogs" required defaultChecked />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeValid();

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("Required");
    });

    it("built-in validation: should not display error before user interaction", async () => {
      render(<HvCheckBox value="dogs" label="Dogs" required />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // It's invalid for the browser
      expect(checkbox).toBeInvalid();

      // But not for the user before they touch it
      expect(checkbox).not.toHaveAttribute("aria-invalid");

      expect(screen.queryByText("Required")).not.toBeInTheDocument();

      // Check
      await userEvent.click(checkbox);

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("Required");
    });
  });
});
