/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";
import { render } from "testing-utils";

import { Main, InitialQuery } from "../stories/QueryBuilder.stories";

const consoleWarnSpy = jest.fn();
const originalWarn = console.warn;

describe("QueryBuilder", () => {
  beforeEach(() => {
    console.warn = consoleWarnSpy;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  jest.setTimeout(30000);
  describe("snapshot", () => {
    it("matches snapshot", () => {
      const { container } = render(<Main />);
      expect(container).toBeDefined();
      expect(container).toMatchSnapshot();
    });
  });

  describe("structure", () => {
    it("renders the component as expected", () => {
      const { getByRole, getByText } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const andButton = getByRole("button", { name: /AND/i });
      expect(andButton).toBeInTheDocument();

      const orButton = getByRole("button", { name: /OR/i });
      expect(orButton).toBeInTheDocument();

      const addConditionButton = getByRole("button", { name: /Add condition/i });
      expect(addConditionButton).toBeInTheDocument();

      const createConditionLink = getByText("Create a condition");
      expect(createConditionLink).toBeInTheDocument();

      const addGroupButton = getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      const createGroupLink = getByText("condition group");
      expect(createGroupLink).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("adds new condition (button)", () => {
      const { getByRole, getByText } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addConditionButton = getByRole("button", { name: /Add condition/i });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = getByRole("combobox", { name: /Attribute/i });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });

    it("adds new condition (link)", () => {
      const { getByRole, getByText } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createConditionLink = getByText("Create a condition");
      expect(createConditionLink).toBeInTheDocument();

      userEvent.click(createConditionLink);

      const attributeDropdown = getByRole("combobox", { name: /Attribute/i });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });

    it("adds new group (button)", async () => {
      const { getByRole, getByText, findAllByRole } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addGroupButton = getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const attributeDropdown = getByRole("combobox", { name: /Attribute/i });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButtons = await findAllByRole("button", { name: /AND/i });
      expect(andButtons).toHaveLength(2);

      const addConditionButtons = await findAllByRole("button", { name: /Add condition/i });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("adds new group (link)", async () => {
      const { getByRole, getByText, findAllByRole } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createGroupLink = getByText("condition group");
      expect(createGroupLink).toBeInTheDocument();

      userEvent.click(createGroupLink);

      const attributeDropdown = getByRole("combobox", { name: /Attribute/i });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButton = await findAllByRole("button", { name: /AND/i });
      expect(andButton).toHaveLength(2);

      const addConditionButtons = await findAllByRole("button", { name: /Add condition/i });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("removes created condition", async () => {
      const { getByRole, getByText } = render(<Main />);

      const addConditionButton = getByRole("button", { name: /Add condition/i });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = getByRole("combobox", { name: /Attribute/i });
      expect(attributeDropdown).toBeInTheDocument();

      const removeConditionButton = getByRole("button", { name: /Remove condition/i });
      expect(removeConditionButton).toBeInTheDocument();

      userEvent.click(removeConditionButton);

      const confirmButton = getByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });

    it("removes created group", async () => {
      const { getByRole, getByText } = render(<Main />);

      const addGroupButton = getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const removeGroupButton = getByRole("button", { name: /Remove group/i });
      expect(removeGroupButton).toBeInTheDocument();

      userEvent.click(removeGroupButton);

      const confirmButton = getByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });
  });

  describe("initial query", () => {
    it("matches snapshot", () => {
      const { container } = render(<InitialQuery />);

      expect(container).toBeDefined();
    });
  });
});
