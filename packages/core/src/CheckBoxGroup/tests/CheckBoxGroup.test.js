/* eslint-env jest */

import React from "react";

import userEvent from "@testing-library/user-event";

import { render } from "testing-utils";

import { HvCheckBox, HvCheckBoxGroup } from "../..";

describe("HvCheckBoxGroup", () => {
  describe("general", () => {
    it("renders a group with checkboxes in the expected order", () => {
      const { getByRole, getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group", { name: "Favorite Pet" });
      expect(checkboxGroup).toBeInTheDocument();

      // defaults
      expect(checkboxGroup).not.toHaveAttribute("aria-disabled");
      expect(checkboxGroup).toBeValid();
      expect(checkboxGroup).not.toHaveAccessibleDescription();

      // children ordered and rendered as expected
      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes.length).toBe(3);

      expect(checkboxes[0].value).toBe("dogs");
      expect(checkboxes[1].value).toBe("cats");
      expect(checkboxes[2].value).toBe("dragons");
      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[0]).not.toHaveAttribute("name");
      expect(checkboxes[1]).not.toHaveAttribute("name");
      expect(checkboxes[2]).not.toHaveAttribute("name");
      expect(checkboxes[0]).toBeEnabled();
      expect(checkboxes[1]).toBeEnabled();
      expect(checkboxes[2]).toBeEnabled();
    });

    it("supports custom props", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" data-testid="favorite-pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");

      expect(checkboxGroup).toHaveAttribute("data-testid", "favorite-pet");
    });
  });

  describe("name", () => {
    it("child checkboxes can have names", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" name="snoopy" />
          <HvCheckBox value="cats" label="Cats" name="garfield" />
          <HvCheckBox value="dragons" label="Dragons" name="falkor" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).toHaveAttribute("name", "snoopy");
      expect(checkboxes[1]).toHaveAttribute("name", "garfield");
      expect(checkboxes[2]).toHaveAttribute("name", "falkor");
    });

    it("group name propagates to child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet" name="awesome-react-aria">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      // but not to the select all checkbox
      expect(checkboxes[0]).not.toHaveAttribute("name");

      expect(checkboxes[1]).toHaveAttribute("name", "awesome-react-aria");
      expect(checkboxes[2]).toHaveAttribute("name", "awesome-react-aria");
      expect(checkboxes[3]).toHaveAttribute("name", "awesome-react-aria");
    });

    it("child can override name", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" name="awesome-react-aria">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox name="another-name" value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).toHaveAttribute("name", "awesome-react-aria");
      expect(checkboxes[1]).toHaveAttribute("name", "another-name");
      expect(checkboxes[2]).toHaveAttribute("name", "awesome-react-aria");
    });
  });

  describe("value", () => {
    it("can have a controlled value", () => {
      const { getAllByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" value={["cats"]}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });

    it("can have a uncontrolled default value", () => {
      const onChangeSpy = jest.fn();

      const { getAllByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" defaultValue={["cats"]} onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), ["cats", "dragons"]);

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
    });

    it("can have a uncontrolled default value from the children state", () => {
      const onChangeSpy = jest.fn();

      const { getAllByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" defaultChecked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), ["cats"]);

      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });

    it("children state is ignored when group has defaultValue", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" defaultValue={["dogs"]}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" defaultChecked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });

    it("children state is ignored when group has value", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" value={["dogs"]}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" defaultChecked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");

      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });
  });

  describe("required", () => {
    it("required adds an asterisk to the group label", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" required>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      const labelId = checkboxGroup.getAttribute("aria-labelledby");

      // direct node access is intentional
      // eslint-disable-next-line testing-library/no-node-access
      const label = document.getElementById(labelId);
      expect(label).toHaveTextContent("Favorite Pet*");
    });

    it("required does not propagate to the child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" required>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes[0]).not.toBeRequired();
      expect(checkboxes[1]).not.toBeRequired();
      expect(checkboxes[2]).not.toBeRequired();
    });
  });

  describe("readonly", () => {
    it("readonly propagates to child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" readOnly>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes[0]).toHaveAttribute("readonly");
      expect(checkboxes[1]).toHaveAttribute("readonly");
      expect(checkboxes[2]).toHaveAttribute("readonly");
    });

    it("clicking readonly checkbox does not update state", () => {
      const groupOnChangeSpy = jest.fn();
      const checkboxOnChangeSpy = jest.fn();

      const { getAllByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" readOnly onChange={groupOnChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" onChange={checkboxOnChangeSpy} />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxes[2]).not.toBeChecked();
    });
  });

  describe("disabled", () => {
    it("can be disabled", () => {
      const groupOnChangeSpy = jest.fn();
      const checkboxOnChangeSpy = jest.fn();

      const { getByRole, getAllByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" disabled onChange={groupOnChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" onChange={checkboxOnChangeSpy} />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toHaveAttribute("aria-disabled", "true");

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes[0]).toBeDisabled();
      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).toBeDisabled();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxes[2]).not.toBeChecked();
    });

    it("supports disabled child checkboxes", () => {
      const groupOnChangeSpy = jest.fn();
      const checkboxOnChangeSpy = jest.fn();

      const { getAllByRole, getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" onChange={groupOnChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" disabled onChange={checkboxOnChangeSpy} />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).not.toHaveAttribute("aria-disabled");

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes[0]).toBeEnabled();
      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).toBeEnabled();

      expect(groupOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxOnChangeSpy).toHaveBeenCalledTimes(0);
      expect(checkboxes[1]).not.toBeChecked();
    });
  });

  describe("label", () => {
    it("can show a label", () => {
      const { getByText, getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      // there is a visible label element
      getByText("Favorite Pet", { selector: "label" });

      // that label content is properly associated with the group
      getByRole("group", { name: "Favorite Pet" });
    });

    it("supports an external label", () => {
      const { getByRole } = render(
        <>
          <span id="label-element-id">An external label</span>
          <HvCheckBoxGroup aria-labelledby="label-element-id">
            <HvCheckBox value="dogs" label="Dogs" />
            <HvCheckBox value="cats" label="Cats" />
            <HvCheckBox value="dragons" label="Dragons" />
          </HvCheckBoxGroup>
        </>
      );

      const checkboxGroup = getByRole("group", { name: "An external label" });
      expect(checkboxGroup).toHaveAttribute("aria-labelledby", "label-element-id");
    });

    it("supports aria-label", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup aria-label="My Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toHaveAttribute("aria-label", "My Favorite Pet");
    });
  });

  describe("description", () => {
    it("can show a description", () => {
      const { getByRole, getByText } = render(
        <HvCheckBoxGroup label="Favorite Pet" description="Choose an animal">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      // the description text is visible
      getByText("Choose an animal");

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toHaveAccessibleDescription("Choose an animal");
    });

    it("supports an external description", () => {
      const { getByRole } = render(
        <>
          <span id="description-element-id">An external description</span>
          <HvCheckBoxGroup label="Favorite Pet" aria-describedby="description-element-id">
            <HvCheckBox value="dogs" label="Dogs" />
            <HvCheckBox value="cats" label="Cats" />
            <HvCheckBox value="dragons" label="Dragons" />
          </HvCheckBoxGroup>
        </>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toHaveAccessibleDescription("An external description");
    });
  });

  describe("onChange", () => {
    it("checking a checkbox triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), ["dragons"]);
    });

    it("unchecking a checkbox triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), []);
    });

    it("checking select all triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet" onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const selectAll = getByLabelText("All (3)");
      userEvent.click(selectAll);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), ["dogs", "cats", "dragons"]);
    });

    it("unchecking select all triggers the onchange", () => {
      const onChangeSpy = jest.fn();

      const { getByLabelText } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet" onChange={onChangeSpy}>
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const selectAll = getByLabelText("3 / 3");
      userEvent.click(selectAll);

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(expect.anything(), []);
    });
  });

  describe("status", () => {
    it("displays the statusMessage when the status is invalid", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" status="invalid" statusMessage="The error message">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeInvalid();
      expect(checkboxGroup).toHaveErrorMessage("The error message");
    });

    it("doesn't display the statusMessage when the status is valid", () => {
      const { getByRole, queryByText } = render(
        <HvCheckBoxGroup label="Favorite Pet" status="valid" statusMessage="The error message">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeValid();

      const error = queryByText("The error message");
      expect(error).not.toBeInTheDocument();
    });

    it("sets the group invalid, not the child checkboxes", () => {
      const { getByRole, getAllByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" status="invalid">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeInvalid();

      const checkboxes = getAllByRole("checkbox");
      expect(checkboxes[0]).toBeValid();
      expect(checkboxes[1]).toBeValid();
      expect(checkboxes[2]).toBeValid();
    });

    it("built-in validation: displays error when required and no checkbox is selected", () => {
      const { getByRole, getByLabelText } = render(
        <HvCheckBoxGroup label="Favorite Pet" required>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeValid();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);

      expect(checkboxGroup).toBeInvalid();
      expect(checkboxGroup).toHaveErrorMessage("Required");
    });

    it("built-in validation: displays error when required and select all is unchecked", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup label="Favorite Pet" showSelectAll required>
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeValid();

      const selectAll = getByRole("checkbox", { name: "3 / 3" });
      userEvent.click(selectAll);

      expect(checkboxGroup).toBeInvalid();
      expect(checkboxGroup).toHaveErrorMessage("Required");
    });

    it("built-in validation: doesn't display error before user interaction", () => {
      const { getByRole, getByLabelText, queryByText } = render(
        <HvCheckBoxGroup label="Favorite Pet" required>
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxGroup = getByRole("group");
      expect(checkboxGroup).toBeValid();
      expect(queryByText("Required")).not.toBeInTheDocument();

      const dragons = getByLabelText("Dragons");
      userEvent.click(dragons);
      userEvent.click(dragons);

      expect(checkboxGroup).toBeInvalid();
      expect(checkboxGroup).toHaveErrorMessage("Required");
    });
  });

  describe("selectAll", () => {
    it("select all initial state is unchecked when no child checkbox is selected", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const selectAll = getByRole("checkbox", { name: "All (3)" });
      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("select all initial state is checked when all child checkboxes are selected", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const selectAll = getByRole("checkbox", { name: "3 / 3" });
      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("select all initial state is indeterminate when only some child checkboxes are selected", () => {
      const { getByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const selectAll = getByRole("checkbox", { name: "2 / 3" });
      expect(selectAll).not.toBeChecked();
      expect(selectAll).toHaveAttribute("data-indeterminate", "true");
    });

    it("clicking an unchecked select all box selects all child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();

      userEvent.click(selectAll);

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("clicking an checked select all box unselects all child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      userEvent.click(selectAll);

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();

      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("clicking an indeterminate select all box selects all child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      userEvent.click(selectAll);

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("unchecked select all box becomes indeterminate when selecting a child checkbox", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();

      userEvent.click(checkboxes[2]);

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();

      expect(selectAll).not.toBeChecked();
      expect(selectAll).toHaveAttribute("data-indeterminate", "true");
    });

    it("unchecked select all box becomes checked when selecting the only child checkbox", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).not.toBeChecked();

      userEvent.click(checkboxes[1]);

      expect(checkboxes[1]).toBeChecked();

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("checked select all box becomes indeterminate when unselecting a child checkbox", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" checked />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      userEvent.click(checkboxes[2]);

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      expect(selectAll).not.toBeChecked();
      expect(selectAll).toHaveAttribute("data-indeterminate", "true");
    });

    it("checked select all box becomes unchecked when unselecting the only child checkbox", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).toBeChecked();

      userEvent.click(checkboxes[1]);

      expect(checkboxes[1]).not.toBeChecked();

      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("indeterminate select all box becomes unchecked when unselecting all child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).not.toBeChecked();
      expect(selectAll).toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      userEvent.click(checkboxes[3]);

      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).not.toBeChecked();

      expect(selectAll).not.toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });

    it("indeterminate select all box becomes checked when selecting all child checkboxes", () => {
      const { getAllByRole } = render(
        <HvCheckBoxGroup showSelectAll label="Favorite Pet">
          <HvCheckBox value="dogs" label="Dogs" checked />
          <HvCheckBox value="cats" label="Cats" />
          <HvCheckBox value="dragons" label="Dragons" checked />
        </HvCheckBoxGroup>
      );

      const checkboxes = getAllByRole("checkbox");
      const selectAll = checkboxes[0];

      expect(selectAll).not.toBeChecked();
      expect(selectAll).toHaveAttribute("data-indeterminate", "true");

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      userEvent.click(checkboxes[2]);

      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      expect(checkboxes[3]).toBeChecked();

      expect(selectAll).toBeChecked();
      expect(selectAll).not.toHaveAttribute("data-indeterminate", "true");
    });
  });
});
