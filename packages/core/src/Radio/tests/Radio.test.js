/* eslint-env jest */
import React, { useState } from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { HvRadio } from "../..";

import { Main, Disabled, ReadOnly } from "../stories/Radio.stories";

const RadioSample = () => {
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <>
      <HvRadio
        name="main"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        name="main"
        label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

describe("HvRadio", () => {
  describe("sample snapshot testing", () => {
    it("Main", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders a radio button as expected", () => {
      const { getByRole } = render(<HvRadio name="main" label="Radio 1" value="1" />);

      const radioBtn = getByRole("radio", { name: "Radio 1" });

      expect(radioBtn).toBeInTheDocument();

      // toHaveValue() can't be used with <input type="radio">
      // eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioBtn.value).toBe("1");

      // defaults
      expect(radioBtn).toHaveAttribute("name");
      expect(radioBtn).not.toBeChecked();
      expect(radioBtn).toBeEnabled();
      expect(radioBtn).not.toBeRequired();
      expect(radioBtn).not.toHaveAttribute("readonly");
      expect(radioBtn).not.toHaveAttribute("data-indeterminate", "true");
      expect(radioBtn).toBeValid();
      expect(radioBtn).not.toHaveDescription();
    });

    it("supports custom input props", () => {
      const { getByRole } = render(
        <HvRadio
          name="main"
          label="Radio 1"
          value="1"
          inputProps={{ "data-testid": "favorite-pet" }}
        />
      );

      const radioBtn = getByRole("radio");

      expect(radioBtn).toHaveAttribute("data-testid", "favorite-pet");
    });

    it("calls onFocusVisible if focused with keyboard", () => {
      const onFocusVisibleSpy = jest.fn();

      const { getByRole } = render(
        <HvRadio name="main" label="Radio 1" value="1" onFocusVisible={onFocusVisibleSpy} />
      );

      const radioBtn = getByRole("radio", { name: "Radio 1" });

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(radioBtn).toHaveFocus();

      expect(onFocusVisibleSpy).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when it loses focus", () => {
      const onBlurSpy = jest.fn();

      const { getByRole } = render(
        <HvRadio name="main" label="Radio 1" value="1" onBlur={onBlurSpy} />
      );

      const radioBtn = getByRole("radio", { name: "Radio 1" });

      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(radioBtn).toHaveFocus();
      userEvent.tab();
      expect(radioBtn).not.toHaveFocus();

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("name", () => {
    it("can have name", () => {
      const { getByRole } = render(<HvRadio name="main" label="Radio 1" value="1" />);

      const radioBtn = getByRole("radio");

      expect(radioBtn).toHaveAttribute("name", "main");
    });
  });

  describe("checked", () => {
    it("can have a controlled checked state", () => {
      const { getByRole } = render(<HvRadio name="main" label="Radio 1" value="1" checked />);

      const radioBtn = getByRole("radio");

      expect(radioBtn).toBeChecked();

      userEvent.click(radioBtn);

      expect(radioBtn).toBeChecked();
    });
  });

  describe("Radio interactions", () => {
    it("Main", () => {
      const { getByRole, getAllByRole } = render(<RadioSample />);
      const radioBtns = getAllByRole("radio");

      const radioBtn1 = getByRole("radio", { name: "Radio 1" });
      const radioBtn2 = getByRole("radio", { name: "Radio 2" });

      expect(radioBtns.length).toBe(2);

      // toHaveValue() can't be used with <input type="radio">
      // eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioBtn1).toHaveAttribute("value", "1");
      // eslint-disable-next-line jest-dom/prefer-to-have-value
      expect(radioBtn2).toHaveAttribute("value", "2");

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      userEvent.click(radioBtn1);

      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      userEvent.click(radioBtn2);

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();

      userEvent.click(radioBtn2);

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
    });
  });

  describe("disabled", () => {
    it("can be disabled", () => {
      const { getAllByRole } = render(<Disabled />);
      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];

      expect(radioBtn1).toBeDisabled();
      expect(radioBtn2).toBeDisabled();
    });

    it("clicking disabled checkbox does not update state", () => {
      const onChangeSpy = jest.fn();

      const RadioBtns = () => (
        <>
          <HvRadio
            disabled
            name="disabled"
            label="Radio 1"
            value="1"
            checked
            onChange={onChangeSpy}
          />
          <HvRadio disabled name="disabled" label="Radio 2" value="2" onChange={onChangeSpy} />
        </>
      );

      const { getAllByRole } = render(<RadioBtns />);

      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];

      expect(radioBtn1).toBeDisabled();
      expect(radioBtn2).toBeDisabled();

      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      userEvent.click(radioBtn1);
      userEvent.click(radioBtn2);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();
    });
  });

  describe("readonly", () => {
    it("can be readonly", () => {
      const { getAllByRole } = render(<ReadOnly />);

      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];

      expect(radioBtn1).toHaveAttribute("readonly");
      expect(radioBtn2).toHaveAttribute("readonly");
    });

    it("clicking readonly checkbox does not update state", () => {
      // eslint-disable-next-line react/prop-types
      const DisabledSample = ({ onChange }) => {
        return (
          <>
            <HvRadio readOnly name="readonly" label="Radio 1" value="1" onChange={onChange} />
            <HvRadio
              readOnly
              name="readonly"
              label="Radio 2"
              value="2"
              checked
              onChange={onChange}
            />
          </>
        );
      };

      const onChangeSpy = jest.fn();

      const { getAllByRole } = render(<DisabledSample onChange={onChangeSpy} />);

      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();

      userEvent.click(radioBtn1);
      userEvent.click(radioBtn2);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
    });
  });

  describe("label", () => {
    it("can show a label", () => {
      const { getByRole, getByText } = render(<RadioSample />);

      // there is a visible label element
      getByText("Radio 1", { selector: "label" });
      getByText("Radio 2", { selector: "label" });

      // that label content is properly associated with the group
      getByRole("radio", { name: "Radio 1" });
      getByRole("radio", { name: "Radio 2" });
    });

    it("supports aria roles", () => {
      const { getByRole } = render(
        <>
          <div id="radioDescriptor">Radio button description</div>
          <HvRadio
            name="Radio 1"
            label="Radio 1"
            value="1"
            checked
            aria-label="Radio 1"
            aria-labelledby="radioDescriptor"
            aria-describedby="radioDescriptor"
          />
        </>
      );

      const radioBtn = getByRole("radio");
      expect(radioBtn).toHaveAttribute("aria-label", "Radio 1");
      expect(radioBtn).toHaveAttribute("aria-labelledby", "radioDescriptor");
      expect(radioBtn).toHaveAttribute("aria-describedby", "radioDescriptor");
      expect(radioBtn).toHaveDescription("Radio button description");
    });
  });

  describe("onChange", () => {
    it("checking a radio button triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByRole } = render(
        <HvRadio name="Radio 1" label="Radio 1" value="1" onChange={onChangeSpy} />
      );

      const radioBtn = getByRole("radio");
      userEvent.click(radioBtn);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), true, "1");
    });
  });
});
