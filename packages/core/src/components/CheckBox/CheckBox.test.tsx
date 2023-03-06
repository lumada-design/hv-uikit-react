import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HvCheckBox } from "./CheckBox";

describe("CheckBox", () => {
  describe("general", () => {
    it("should be defined", () => {
      const { container } = render(<HvCheckBox value="dogs" label="Dogs" />);

      expect(container).toBeDefined();
    });

    it("should render correctly", () => {
      const { container } = render(<HvCheckBox value="dogs" label="Dogs" />);

      expect(container).toMatchSnapshot();
    });

    it("should render as expected", () => {
      const { getByRole, getByDisplayValue } = render(
        <HvCheckBox value="dogs" label="Dogs" />
      );

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();

      expect(getByDisplayValue("dogs")).toBeInTheDocument();

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
      const { getByRole } = render(
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

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("data-testid", "favorite-animal");
    });

    it("should call onFocusVisible if focused with keyboard", async () => {
      const onFocusMock = vi.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" onFocusVisible={onFocusMock} />
      );

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();

      expect(document.body).toHaveFocus();

      // Focus
      await userEvent.tab();

      expect(checkbox).toHaveFocus();

      expect(onFocusMock).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when it loses focus", async () => {
      const onBlurMock = vi.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" onBlur={onBlurMock} />
      );

      const checkbox = getByRole("checkbox", { name: "Dogs" });

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
      const { getByRole } = render(
        <HvCheckBox name="snoopy" value="dogs" label="Dogs" />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("name", "snoopy");
    });
  });

  describe("checked", () => {
    it("should have a controlled checked state", async () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" checked />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeChecked();

      // Check
      await userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("should have a uncontrolled default checked state", async () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" defaultChecked />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeChecked();

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe("indeterminate", () => {
    it("should be indeterminate", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" indeterminate />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
    });

    it("should clear the indeterminate state by clicking an uncontrolled checkbox (unchecked)", async () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" indeterminate />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("data-indeterminate", "true");

      expect(checkbox).not.toBeChecked();

      // Check
      await userEvent.click(checkbox);

      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");

      expect(checkbox).toBeChecked();
    });

    it("should clear the indeterminate state by clicking an uncontrolled checkbox (checked)", async () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" defaultChecked indeterminate />
      );

      const checkbox = getByRole("checkbox");

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
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" required />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeRequired();
    });

    it("should add an asterisk to the checkbox label when required", () => {
      const { getByText } = render(
        <HvCheckBox value="dogs" label="Dogs" required />
      );

      const label = getByText("Dogs", { selector: "label" });

      expect(label).toHaveTextContent("Dogs*");
    });
  });

  describe("readonly", () => {
    it("should be readonly", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" readOnly />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("readonly");
    });

    it("should not update state by clicking a readonly checkbox", async () => {
      const onChangeMock = vi.fn();

      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          readOnly
          onChange={onChangeMock}
        />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(0);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe("disabled", () => {
    it("should be disabled", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" disabled />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeDisabled();
    });

    it("should not update state by clicking a disabled checkbox", async () => {
      const onChangeMock = vi.fn();

      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          disabled
          onChange={onChangeMock}
        />
      );

      const checkbox = getByRole("checkbox");
      checkbox.style.pointerEvents = "auto";

      expect(checkbox).toBeInTheDocument();

      await userEvent.click(checkbox);

      expect(onChangeMock).toHaveBeenCalledTimes(0);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe("label", () => {
    it("should show a label", () => {
      const { getByRole, getByText } = render(
        <HvCheckBox value="dogs" label="Dogs" />
      );

      const label = getByText("Dogs", { selector: "label" });

      expect(label).toBeDefined();

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();
    });

    it("should support an external label", () => {
      const { getByRole } = render(
        <>
          <span id="label-element-id">An external label</span>
          <HvCheckBox value="dogs" aria-labelledby="label-element-id" />
        </>
      );

      const checkbox = getByRole("checkbox", { name: "An external label" });

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("aria-labelledby", "label-element-id");
    });

    it("should support aria-label", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" aria-label="Dogs" />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAttribute("aria-label", "Dogs");
    });
  });

  describe("description", () => {
    it("should support an external description", () => {
      const { getByRole } = render(
        <>
          <span id="description-element-id">An external description</span>
          <HvCheckBox
            value="dogs"
            label="Dogs"
            aria-describedby="description-element-id"
          />
        </>
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toHaveAccessibleDescription("An external description");
    });
  });

  describe("onChange", () => {
    it("should trigger onChange by checking a checkbox ", async () => {
      const onChangeMock = vi.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" onChange={onChangeMock} />
      );

      const checkbox = getByRole("checkbox");

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

      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          defaultChecked
          onChange={onChangeMock}
        />
      );

      const checkbox = getByRole("checkbox");

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

      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          indeterminate
          onChange={onChangeMock}
        />
      );

      const checkbox = getByRole("checkbox");

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

      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          indeterminate
          defaultChecked
          onChange={onChangeMock}
        />
      );

      const checkbox = getByRole("checkbox");

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
      const { getByRole } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          status="invalid"
          statusMessage="The error message"
        />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeInvalid();

      expect(checkbox).toHaveErrorMessage("The error message");
    });

    it("should not display the statusMessage when the status is valid", () => {
      const { getByRole, queryByText } = render(
        <HvCheckBox
          value="dogs"
          label="Dogs"
          status="valid"
          statusMessage="The error message"
        />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeValid();

      const error = queryByText("The error message");

      expect(error).not.toBeInTheDocument();
    });

    it("built-in validation: should display error when required and not checked", async () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" required defaultChecked />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      expect(checkbox).toBeValid();

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();

      expect(checkbox).toHaveErrorMessage("Required");
    });

    it("built-in validation: should not display error before user interaction", async () => {
      const { getByRole, queryByText } = render(
        <HvCheckBox value="dogs" label="Dogs" required />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeInTheDocument();

      // It's invalid for the browser
      expect(checkbox).toBeInvalid();

      // But not for the user before they touch it
      expect(checkbox).not.toHaveAttribute("aria-invalid");

      expect(queryByText("Required")).not.toBeInTheDocument();

      // Check
      await userEvent.click(checkbox);

      // Uncheck
      await userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();

      expect(checkbox).toHaveErrorMessage("Required");
    });
  });
});
