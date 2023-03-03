import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { HvRadio } from "./Radio";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

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

const Disabled = () => {
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <>
      <HvRadio
        disabled
        name="main"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        disabled
        name="main"
        label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

const ReadOnly = () => {
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <>
      <HvRadio
        readOnly
        name="main"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        readOnly
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
    it("should match the snapshot", () => {
      const { asFragment } = render(<HvRadio />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("name", () => {
    it("can have name", () => {
      const { getByRole } = render(
        <HvRadio name="main" label="Radio 1" value="1" />
      );

      const radioBtn = getByRole("radio");

      expect(radioBtn).toHaveAttribute("name", "main");
    });
  });

  describe("checked", () => {
    it("can have a controlled checked state", () => {
      const { getByRole } = render(
        <HvRadio name="main" label="Radio 1" value="1" checked />
      );

      const radioBtn = getByRole("radio");

      expect(radioBtn).toBeChecked();

      fireEvent.click(radioBtn);

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

      expect(radioBtn1).toHaveAttribute("value", "1");

      expect(radioBtn2).toHaveAttribute("value", "2");

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      fireEvent.click(radioBtn1);

      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      fireEvent.click(radioBtn2);

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();

      fireEvent.click(radioBtn2);

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

    it("clicking disabled checkbox does not update state", async () => {
      const onChangeSpy = vi.fn();

      const RadioBtns = () => (
        <>
          <HvRadio
            disabled
            name="disabled1"
            label="Radio 1"
            value="1"
            checked
            onChange={onChangeSpy}
          />
          <HvRadio
            disabled
            name="disabled2"
            label="Radio 2"
            value="2"
            checked={false}
            onChange={onChangeSpy}
          />
        </>
      );

      const { getAllByRole } = render(<RadioBtns />);

      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];
      radioBtn1.style["pointer-events"] = "auto";
      radioBtn2.style["pointer-events"] = "auto";

      expect(radioBtn1).toBeDisabled();
      expect(radioBtn2).toBeDisabled();

      expect(radioBtn1).toBeChecked();
      expect(radioBtn2).not.toBeChecked();

      await userEvent.click(radioBtn1);
      await userEvent.click(radioBtn2);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
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
      const DisabledSample = ({ onChange }) => {
        return (
          <>
            <HvRadio
              readOnly
              name="readonly"
              label="Radio 1"
              value="1"
              onChange={onChange}
            />
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

      const onChangeSpy = vi.fn();

      const { getAllByRole } = render(
        <DisabledSample onChange={onChangeSpy} />
      );

      const radioBtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2] = [...radioBtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();

      fireEvent.click(radioBtn1);
      fireEvent.click(radioBtn2);

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
      expect(radioBtn).toHaveAccessibleDescription("Radio button description");
    });
  });

  describe("onChange", () => {
    it("checking a radio button triggers the onchange", () => {
      const onChangeSpy = vi.fn();

      const { getByRole } = render(
        <HvRadio
          name="Radio 1"
          label="Radio 1"
          value="1"
          onChange={onChangeSpy}
        />
      );

      const radioBtn = getByRole("radio");
      fireEvent.click(radioBtn);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), true, "1");
    });
  });
});
