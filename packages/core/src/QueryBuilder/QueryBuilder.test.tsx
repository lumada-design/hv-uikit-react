import { useMemo } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  HvQueryBuilder,
  HvQueryBuilderProps,
  hvQueryBuilderDefaultOperators,
} from ".";

const QueryBuilder = (props: HvQueryBuilderProps) => {
  const attributes = useMemo(
    () => ({
      price: {
        label: "Price",
        type: "numeric",
      },
      category: {
        label: "Category",
        type: "text",
      },
      in_stock: {
        label: "In stock",
        type: "boolean",
      },
      release: {
        label: "Release",
        type: "dateandtime",
      },
      custom: {
        label: "Custom",
        type: "custom",
      },
    }),
    []
  );

  const operators = useMemo(
    () => ({
      ...hvQueryBuilderDefaultOperators,
      custom: [...hvQueryBuilderDefaultOperators.text],
    }),
    []
  );

  return (
    <HvQueryBuilder operators={operators} attributes={attributes} {...props} />
  );
};

const initialQuery = {
  id: 1,
  combinator: "and",
  rules: [
    {
      id: 2,
      attribute: "price",
      operator: "lessThan",
      value: 10,
    },
    {
      id: 3,
      attribute: "category",
      operator: "equals",
      value: "Movies",
    },
    {
      id: 9,
      attribute: "custom",
      operator: "equals",
      value: "1234",
    },
    {
      id: 10,
      attribute: "category",
      operator: "Empty",
    },
    {
      id: 4,
      combinator: "and",
      rules: [
        {
          id: 5,
          attribute: "in_stock",
          operator: "equalsTo",
          value: true,
        },
        {
          id: 6,
          attribute: "release",
          operator: "greaterThan",
          value: {
            date: "2021-01-01",
            time: "00:00:00",
          },
        },
      ],
    },
    {
      id: 7,
      combinator: "or",
      rules: [
        {
          id: 8,
          attribute: "in_stock",
          operator: "equalsTo",
          value: false,
        },
      ],
    },
  ],
};

describe("QueryBuilder", () => {
  describe("structure", () => {
    it("renders the component as expected", () => {
      render(<QueryBuilder />);

      const noConditions = screen.getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const andButton = screen.getByRole("button", { name: /AND/i });
      expect(andButton).toBeInTheDocument();

      const orButton = screen.getByRole("button", { name: /OR/i });
      expect(orButton).toBeInTheDocument();

      const addConditionButton = screen.getByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButton).toBeInTheDocument();

      const createConditionLink = screen.getByText("Create a condition");
      expect(createConditionLink).toBeInTheDocument();

      const addGroupButton = screen.getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      const createGroupLink = screen.getByText("condition group");
      expect(createGroupLink).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("adds new condition (button)", async () => {
      render(<QueryBuilder />);

      const noConditions = screen.getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addConditionButton = screen.getByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = await screen.findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });

    it("adds new condition (link)", async () => {
      render(<QueryBuilder />);

      const noConditions = screen.getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createConditionLink = screen.getByRole("button", {
        name: /Create a condition/i,
      });
      expect(createConditionLink).toBeInTheDocument();

      userEvent.click(createConditionLink);

      const attributeDropdown = await screen.findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });

    it("adds new group (button)", async () => {
      render(<QueryBuilder />);

      const noConditions = screen.getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addGroupButton = screen.getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const attributeDropdown = await screen.findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButtons = await screen.findAllByRole("button", { name: /AND/i });
      expect(andButtons).toHaveLength(2);

      const addConditionButtons = await screen.findAllByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("adds new group (link)", async () => {
      render(<QueryBuilder />);

      const noConditions = screen.getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createGroupLink = screen.getByRole("button", {
        name: /condition group/i,
      });
      expect(createGroupLink).toBeInTheDocument();

      userEvent.click(createGroupLink);

      const attributeDropdown = await screen.findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButton = await screen.findAllByRole("button", { name: /AND/i });
      expect(andButton).toHaveLength(2);

      const addConditionButtons = await screen.findAllByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("removes created condition", async () => {
      render(<QueryBuilder />);

      const addConditionButton = screen.getByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = await screen.findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();

      const removeConditionButton = screen.getByRole("button", {
        name: /Remove condition/i,
      });
      expect(removeConditionButton).toBeInTheDocument();

      userEvent.click(removeConditionButton);

      const confirmButton = await screen.findByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = await screen.findByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });

    it("removes created group", async () => {
      render(<QueryBuilder />);

      const addGroupButton = screen.getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const removeGroupButton = await screen.findByRole("button", {
        name: /Remove group/i,
      });
      expect(removeGroupButton).toBeInTheDocument();

      userEvent.click(removeGroupButton);

      const confirmButton = await screen.findByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = await screen.findByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });
  });

  describe("initial query", () => {
    it("renders the query", () => {
      render(<QueryBuilder query={initialQuery} />);

      expect(() => screen.getByText("No conditions created yet")).toThrow();

      const attrs = screen.getAllByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attrs).toHaveLength(7);
    });
  });

  describe("read only", () => {
    it("should not be interactable", () => {
      render(<QueryBuilder readOnly />);

      const buttons = screen.getAllByRole("button");
      buttons.map((b) => expect(b).toBeDisabled());
    });
  });

  describe("custom renderers", () => {
    it("should render the right custom renders", async () => {
      render(
        <QueryBuilder
          query={initialQuery}
          renderers={{
            custom: {
              equals: () => <input data-testid="equals-renderer" />,
            },
            numeric: () => <input data-testid="numeric-renderer" />,
            text: {
              DEFAULT: () => <input data-testid="text-renderer" />,
              Contains: () => <input data-testid="contains-renderer" />,
              Empty: () => <input data-testid="empty-renderer" />,
            },
          }}
        />
      );

      const numericRenderer = screen.getByTestId("numeric-renderer");
      expect(numericRenderer).toBeInTheDocument();

      const textRenderer = screen.getByTestId("text-renderer");
      expect(textRenderer).toBeInTheDocument();

      const equalsRenderer = screen.getByTestId("equals-renderer");
      expect(equalsRenderer).toBeInTheDocument();

      const containsRenderer = screen.queryByTestId("contains-renderer");
      expect(containsRenderer).not.toBeInTheDocument();

      const emptyRenderer = screen.queryByTestId("empty-renderer");
      expect(emptyRenderer).not.toBeInTheDocument();
    });

    it("should render the custom render for the Empty operator", async () => {
      render(
        <QueryBuilder
          query={initialQuery}
          renderers={{
            text: {
              Empty: () => <input data-testid="empty-renderer" />,
            },
          }}
          emptyRenderer={[]}
        />
      );

      const emptyRenderer = screen.queryByTestId("empty-renderer");
      expect(emptyRenderer).toBeInTheDocument();
    });
  });

  describe("disableConfirmation", () => {
    it("should show confirmation dialog", async () => {
      render(
        <QueryBuilder
          query={{
            id: 1,
            combinator: "and",
            rules: [
              {
                id: 2,
                attribute: "price",
                operator: "lessThan",
                value: 10,
              },
            ],
          }}
        />
      );

      const removeBtn = screen.getByRole("button", {
        name: /Remove condition/i,
      });

      userEvent.click(removeBtn);

      const dialog = await screen.findByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("should remove immediately", async () => {
      render(
        <QueryBuilder
          query={{
            id: 1,
            combinator: "and",
            rules: [
              {
                id: 2,
                attribute: "price",
                operator: "lessThan",
                value: 10,
              },
            ],
          }}
          disableConfirmation
        />
      );

      const removeBtn = screen.getByRole("button", {
        name: /Remove condition/i,
      });

      userEvent.click(removeBtn);

      const noConditions = await screen.findByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });
  });
});
