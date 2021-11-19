/* eslint-env jest */
import React, { useState } from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { HvRadioGroup, HvRadio } from "../..";

import { Main, Horizontal, ErrorMessage } from "../stories/RadioGroup.stories";

// eslint-disable-next-line react/prop-types
const RadioGroupComp = ({ onChange = () => {}, defaultValue = "2" }) => {
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState("standBy");

  const handleOnChange = (_evt, newValue) => {
    setValue(newValue);

    if (newValue === "none") {
      setStatus("invalid");
    } else {
      setStatus("valid");
    }

    onChange();
  };

  return (
    <HvRadioGroup
      label="Choose the best checkbox"
      value={value}
      onChange={handleOnChange}
      status={status}
      statusMessage={'Don\'t select "None"!'}
      defaultValue={defaultValue}
    >
      <HvRadio label="None" value="none" />
      <HvRadio label="Radio 1" value="1" />
      <HvRadio label="Radio 2" value="2" />
    </HvRadioGroup>
  );
};

describe("HvRadioGroup", () => {
  describe("sample snapshot testing", () => {
    it("Main (Vertical)", () => {
      const { container } = render(<Main />);
      expect(container).toMatchSnapshot();
    });

    it("Horizontal", () => {
      const { container } = render(<Horizontal />);
      expect(container).toMatchSnapshot();
    });

    it("ErrorMessage", () => {
      const { container } = render(<ErrorMessage />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("general", () => {
    it("renders a group with radio buttons in the expected order", () => {
      const { getByRole, getAllByRole } = render(
        <HvRadioGroup label="Choose your favorite checkboxes">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioGroup = getByRole("radiogroup", { name: "Choose your favorite checkboxes" });
      expect(radioGroup).toBeInTheDocument();

      // defaults
      expect(radioGroup).not.toHaveAttribute("aria-disabled");
      expect(radioGroup).toBeValid();
      expect(radioGroup).not.toHaveDescription();

      // children ordered and rendered as expected
      const radiobuttons = getAllByRole("radio");
      expect(radiobuttons.length).toBe(3);

      expect(radiobuttons[0].value).toBe("1");
      expect(radiobuttons[1].value).toBe("2");
      expect(radiobuttons[2].value).toBe("3");
      expect(radiobuttons[0]).not.toBeChecked();
      expect(radiobuttons[1]).toBeChecked();
      expect(radiobuttons[2]).not.toBeChecked();
      expect(radiobuttons[0]).toHaveAttribute("name");
      expect(radiobuttons[1]).toHaveAttribute("name");
      expect(radiobuttons[2]).toHaveAttribute("name");
      expect(radiobuttons[0]).toBeEnabled();
      expect(radiobuttons[1]).toBeEnabled();
      expect(radiobuttons[2]).toBeEnabled();
    });

    it("supports custom props", () => {
      const { getByRole } = render(
        <HvRadioGroup label="Choose your favorite checkboxes" data-testid="favorite-pet">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioGroup = getByRole("radiogroup");

      expect(radioGroup).toHaveAttribute("data-testid", "favorite-pet");
    });
  });

  describe("value", () => {
    it("can have a controlled value", () => {
      const { getAllByRole, getByLabelText } = render(<RadioGroupComp />);

      const radiobtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2, radioBtn3] = [...radiobtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();

      const radioBtn = getByLabelText("Radio 1");
      userEvent.click(radioBtn);

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
      expect(radioBtn3).not.toBeChecked();
    });

    it("can have a uncontrolled default value", () => {
      const onChangeSpy = jest.fn();

      const { getAllByRole, getByLabelText } = render(<RadioGroupComp onChange={onChangeSpy} />);

      const radiobtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2, radioBtn3] = [...radiobtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();

      const clickBtn = getByLabelText("Radio 1");
      userEvent.click(clickBtn);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).toBeChecked();
      expect(radioBtn3).not.toBeChecked();
    });

    it("children state is ignored when group has defaultValue", () => {
      const { getAllByRole } = render(
        <HvRadioGroup
          label="Choose the best checkbox"
          statusMessage="A status message"
          defaultValue="3"
        >
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radiobtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2, radioBtn3] = [...radiobtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();
    });

    it("children state is ignored when group has value", () => {
      const { getAllByRole } = render(
        <HvRadioGroup label="Choose the best checkbox" statusMessage="A status message" value="3">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radiobtns = getAllByRole("radio");

      const [radioBtn1, radioBtn2, radioBtn3] = [...radiobtns];

      expect(radioBtn1).not.toBeChecked();
      expect(radioBtn2).not.toBeChecked();
      expect(radioBtn3).toBeChecked();
    });
  });

  describe("required", () => {
    it("required adds an asterisk to the group label", () => {
      const { getByRole } = render(
        <HvRadioGroup label="Choose your favorite checkboxes" name="favorite" required>
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioGroup = getByRole("radiogroup");
      const labelId = radioGroup.getAttribute("aria-labelledby");
      // the direct node access is intentional
      // eslint-disable-next-line testing-library/no-node-access
      const label = document.getElementById(labelId);
      expect(label).toHaveTextContent("Choose your favorite checkboxes*");
    });
  });

  describe("readonly", () => {
    it("readonly propagates to child checkboxes", () => {
      const { getAllByRole } = render(
        <HvRadioGroup label="Choose your favorite checkboxes" name="favorite" readOnly>
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioBtns = getAllByRole("radio");
      const [radioBtn1, radioBtn2, radioBtn3] = [...radioBtns];
      expect(radioBtn1).toHaveAttribute("readonly");
      expect(radioBtn2).toHaveAttribute("readonly");
      expect(radioBtn3).toHaveAttribute("readonly");
    });

    it("clicking readonly checkbox does not update state", () => {
      const groupOnChangeSpy = jest.fn();
      const radioBtnOnChangeSpy = jest.fn();

      const { getAllByRole, getByLabelText } = render(
        <HvRadioGroup
          label="Choose your favorite checkboxes"
          name="favorite"
          readOnly
          onChange={groupOnChangeSpy}
        >
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" onChange={radioBtnOnChangeSpy} />
        </HvRadioGroup>
      );

      const radioBtns = getAllByRole("radio");
      const [, , radioBtn3] = [...radioBtns];

      const radio3 = getByLabelText("Radio 3");
      userEvent.click(radio3);

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtnOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtn3).not.toBeChecked();
    });
  });

  describe("disabled", () => {
    it("can be disabled", () => {
      const groupOnChangeSpy = jest.fn();
      const radioBtnOnChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvRadioGroup
          label="Choose your favorite radio button"
          name="favorite"
          readOnly
          onChange={groupOnChangeSpy}
        >
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" onChange={radioBtnOnChangeSpy} />
        </HvRadioGroup>
      );

      const radio3 = getByLabelText("Radio 3");
      userEvent.click(radio3);

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtnOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radio3).not.toBeChecked();
    });

    it("supports disabled child checkboxes", () => {
      const groupOnChangeSpy = jest.fn();
      const radioBtnOnChangeSpy = jest.fn();

      const { getAllByRole, getByRole } = render(
        <HvRadioGroup
          label="Choose your favorite radio button"
          name="favorite"
          onChange={groupOnChangeSpy}
        >
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" disabled onChange={radioBtnOnChangeSpy} />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).not.toHaveAttribute("aria-disabled");

      const radioBtns = getAllByRole("radio");
      const [radioBtn1, radioBtn2, radioBtn3] = [...radioBtns];

      expect(radioBtn1).toBeEnabled();
      expect(radioBtn2).toBeDisabled();
      expect(radioBtn3).toBeEnabled();

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtnOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(radioBtn2).not.toBeChecked();
    });
  });

  describe("label", () => {
    it("can show a label", () => {
      const { getByText, getByRole } = render(
        <HvRadioGroup label="Choose your favorite radio button" name="favorite">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      // there is a visible label element
      getByText("Choose your favorite radio button", { selector: "label" });

      // that label content is properly associated with the group
      getByRole("radiogroup", { name: "Choose your favorite radio button" });
    });

    it("supports an external label", () => {
      const { getByRole } = render(
        <>
          <span id="label-element-id">An external label</span>
          <HvRadioGroup aria-labelledby="label-element-id">
            <HvRadio label="Radio 1" value="1" />
            <HvRadio label="Radio 2" value="2" />
            <HvRadio label="Radio 3" value="3" />
          </HvRadioGroup>
        </>
      );

      const radioGroup = getByRole("radiogroup", { name: "An external label" });
      expect(radioGroup).toHaveAttribute("aria-labelledby", "label-element-id");
    });

    it("supports aria-label", () => {
      const { getByRole } = render(
        <HvRadioGroup aria-label="My Favorite Radio">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toHaveAttribute("aria-label", "My Favorite Radio");
    });
  });

  describe("description", () => {
    it("can show a description", () => {
      const { getByRole, getByText } = render(
        <HvRadioGroup aria-label="My Favorite Radio" description="Choose a radio">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      // the description text is visible
      getByText("Choose a radio");

      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toHaveDescription("Choose a radio");
    });

    it("supports an external description", () => {
      const { getByRole } = render(
        <>
          <span id="description-element-id">An external description</span>
          <HvRadioGroup aria-label="My Favorite Radio" aria-describedby="description-element-id">
            <HvRadio label="Radio 1" value="1" />
            <HvRadio label="Radio 2" value="2" />
            <HvRadio label="Radio 3" value="3" />
          </HvRadioGroup>
        </>
      );

      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toHaveDescription("An external description");
    });
  });

  describe("onChange", () => {
    it("checking a radio triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvRadioGroup aria-label="My Favorite Radio" onChange={onChangeSpy}>
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );

      const radio1 = getByLabelText("Radio 1");
      userEvent.click(radio1);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("status", () => {
    it("displays the statusMessage when the status is invalid", () => {
      const { getByRole } = render(
        <HvRadioGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );
      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toBeInvalid();
      expect(radioGroup).toHaveErrorMessage("No way for this to be valid!");
    });
    it("doesn't display the statusMessage when the status is valid", () => {
      const { getByRole, queryByText } = render(
        <HvRadioGroup status="valid" statusMessage="No way for this to be valid!" label="Choose">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );
      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toBeValid();
      const error = queryByText("No way for this to be valid!");
      expect(error).not.toBeInTheDocument();
    });
    it("sets the group invalid, not the child radio buttons", () => {
      const { getByRole, getAllByRole } = render(
        <HvRadioGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
          <HvRadio label="Radio 1" value="1" />
          <HvRadio label="Radio 2" value="2" checked />
          <HvRadio label="Radio 3" value="3" />
        </HvRadioGroup>
      );
      const radioGroup = getByRole("radiogroup");
      expect(radioGroup).toBeInvalid();

      const radioBtns = getAllByRole("radio");
      const [radioBtn1, radioBtn2, radioBtn3] = [...radioBtns];

      expect(radioBtn1).toBeValid();
      expect(radioBtn2).toBeValid();
      expect(radioBtn3).toBeValid();
    });
  });
});
