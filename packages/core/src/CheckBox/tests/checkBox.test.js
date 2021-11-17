/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { HvCheckBox } from "../..";

import { Main, ErrorMessage } from "../stories/CheckBox.stories";

describe("HvCheckBox", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });

    it("ErrorMessage", () => {
      const { container } = render(<ErrorMessage />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders a checkbox as expected", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" />);

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(checkbox).toBeInTheDocument();

      // toHaveValue() can't be used with <input type="checkbox">
      // eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(checkbox.value).toBe("dogs");

      // defaults
      expect(checkbox).not.toHaveAttribute("name");
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toBeEnabled();
      expect(checkbox).not.toBeRequired();
      expect(checkbox).not.toHaveAttribute("readonly");
      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeValid();
      expect(checkbox).not.toHaveDescription();
    });

    it("supports custom input props", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" inputProps={{ "data-testid": "favorite-pet" }} />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toHaveAttribute("data-testid", "favorite-pet");
    });

    it("calls onFocusVisible if focused with keyboard", () => {
      const onFocusVisibleSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" onFocusVisible={onFocusVisibleSpy} />
      );

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(checkbox).toHaveFocus();

      expect(onFocusVisibleSpy).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when it loses focus", () => {
      const onBlurSpy = jest.fn();

      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" onBlur={onBlurSpy} />);

      const checkbox = getByRole("checkbox", { name: "Dogs" });

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(checkbox).toHaveFocus();
      userEvent.tab();
      expect(checkbox).not.toHaveFocus();

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("name", () => {
    it("can have name", () => {
      const { getByRole } = render(<HvCheckBox name="snoopy" value="dogs" label="Dogs" />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toHaveAttribute("name", "snoopy");
    });
  });

  describe("checked", () => {
    it("can have a controlled checked state", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" checked />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeChecked();

      userEvent.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("can have a uncontrolled default checked state", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" defaultChecked />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toBeChecked();

      userEvent.click(checkbox);

      expect(checkbox).not.toBeChecked();
    });
  });

  describe("indeterminate", () => {
    // toBePartiallyChecked() can't be used because MUI Checkbox uses neither
    // aria-checked="mixed" nor sets the native input element to indeterminate
    // (supposedly due to inconsistent behavior across browsers)
    // instead it sets a data-indeterminate attribute on the input

    it("can be indeterminate", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" indeterminate />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
    });

    it("clicking an uncontrolled checkbox (unchecked) clears the indeterminate state", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" indeterminate />);

      const checkbox = getByRole("checkbox");

      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).not.toBeChecked();

      userEvent.click(checkbox);

      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeChecked();
    });

    it("clicking an uncontrolled checkbox (checked) clears the indeterminate state", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" defaultChecked indeterminate />
      );

      const checkbox = getByRole("checkbox");

      expect(checkbox).toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).toBeChecked();

      userEvent.click(checkbox);

      expect(checkbox).not.toHaveAttribute("data-indeterminate", "true");
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("required", () => {
    it("can be required", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" required />);

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeRequired();
    });

    it("required adds an asterisk to the checkbox label", () => {
      const { getByText } = render(<HvCheckBox value="dogs" label="Dogs" required />);

      const label = getByText("Dogs", { selector: "label" });
      expect(label).toHaveTextContent("Dogs*");
    });
  });

  describe("readonly", () => {
    it("can be readonly", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" readOnly />);

      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("readonly");
    });

    it("clicking readonly checkbox does not update state", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" readOnly onChange={onChangeSpy} />
      );

      const checkbox = getByRole("checkbox");
      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("disabled", () => {
    it("can be disabled", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" disabled />);

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("clicking disabled checkbox does not update state", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" disabled onChange={onChangeSpy} />
      );

      const checkbox = getByRole("checkbox");

      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("label", () => {
    it("can show a label", () => {
      const { getByRole, getByText } = render(<HvCheckBox value="dogs" label="Dogs" />);

      // there is a visible label element
      getByText("Dogs", { selector: "label" });

      // that label content is properly associated with the group
      getByRole("checkbox", { name: "Dogs" });
    });

    it("supports an external label", () => {
      const { getByRole } = render(
        <>
          <span id="label-element-id">An external label</span>
          <HvCheckBox value="dogs" aria-labelledby="label-element-id" />
        </>
      );

      const checkbox = getByRole("checkbox", { name: "An external label" });
      expect(checkbox).toHaveAttribute("aria-labelledby", "label-element-id");
    });

    it("supports aria-label", () => {
      const { getByRole } = render(<HvCheckBox value="dogs" aria-label="Dogs" />);

      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-label", "Dogs");
    });
  });

  describe("description", () => {
    it("supports an external description", () => {
      const { getByRole } = render(
        <>
          <span id="description-element-id">An external description</span>
          <HvCheckBox value="dogs" label="Dogs" aria-describedby="description-element-id" />
        </>
      );

      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveDescription("An external description");
    });
  });

  describe("onChange", () => {
    it("checking a checkbox triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(<HvCheckBox value="dogs" label="Dogs" onChange={onChangeSpy} />);

      const checkbox = getByRole("checkbox");
      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), true, "dogs");
    });

    it("unchecking a checkbox triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" defaultChecked onChange={onChangeSpy} />
      );

      const checkbox = getByRole("checkbox");
      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), false, "dogs");
    });

    it("checking a indeterminate checkbox (unchecked) triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" indeterminate onChange={onChangeSpy} />
      );

      const checkbox = getByRole("checkbox");
      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), true, "dogs");
    });

    it("checking a indeterminate checkbox (checked) triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" indeterminate defaultChecked onChange={onChangeSpy} />
      );

      const checkbox = getByRole("checkbox");
      userEvent.click(checkbox);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), false, "dogs");
    });
  });

  describe("status", () => {
    it("displays the statusMessage when the status is invalid", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" status="invalid" statusMessage="The error message" />
      );

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("The error message");
    });

    it("doesn't display the statusMessage when the status is valid", () => {
      const { getByRole, queryByText } = render(
        <HvCheckBox value="dogs" label="Dogs" status="valid" statusMessage="The error message" />
      );

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeValid();

      const error = queryByText("The error message");
      expect(error).not.toBeInTheDocument();
    });

    it("built-in validation: displays error when required and not checked", () => {
      const { getByRole } = render(
        <HvCheckBox value="dogs" label="Dogs" required defaultChecked />
      );

      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeValid();

      userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("Required");
    });

    it("built-in validation: doesn't display error before user interaction", () => {
      const { getByRole, queryByText } = render(<HvCheckBox value="dogs" label="Dogs" required />);

      const checkbox = getByRole("checkbox");

      // it is invalid for the browser
      expect(checkbox).toBeInvalid();

      // but not for the user before he touches it
      expect(checkbox).not.toHaveAttribute("aria-invalid");
      expect(queryByText("Required")).not.toBeInTheDocument();

      userEvent.click(checkbox);
      userEvent.click(checkbox);

      expect(checkbox).toBeInvalid();
      expect(checkbox).toHaveErrorMessage("Required");
    });
  });
});
