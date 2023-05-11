import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMemo, useState } from "react";
import { HvQueryBuilder } from "./";
import { defaultOperators } from "./Context";
import queryToMongo from "./queryToMongo";

export const Main = () => {
  const attributes = {
    key1: {
      label: "Numeric",
      type: "numeric",
    },
    key2: {
      label: "Text",
      type: "text",
    },
    key3: {
      label: "Text Area",
      type: "textarea",
    },
    key4: {
      label: "Boolean",
      type: "boolean",
    },
    key5: {
      label: "Date & Time",
      type: "dateandtime",
    },
    key6: {
      label: "Custom",
      type: "customType",
    },
  };

  const operators = {
    ...defaultOperators,
    customType: [...defaultOperators.text],
  };

  return <HvQueryBuilder attributes={attributes} operators={operators} />;
};

export const InitialQuery = () => {
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
    }),
    []
  );

  const initialQuery = useMemo(
    () => ({
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
    }),
    []
  );

  const [mongoQuery, setMongoQuery] = useState(queryToMongo(initialQuery));

  return (
    <>
      <HvQueryBuilder
        attributes={attributes}
        query={initialQuery}
        onChange={(query) => {
          try {
            setMongoQuery(queryToMongo(query));
          } catch (error: any) {
            console.log("error: ", error.toString());
          }
        }}
      />
      <pre>{JSON.stringify(mongoQuery, null, 2)}</pre>
    </>
  );
};

export const ReadOnly = () => {
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
    }),
    []
  );

  const initialQuery = useMemo(
    () => ({
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
      ],
    }),
    []
  );

  const [, setMongoQuery] = useState(queryToMongo(initialQuery));

  return (
    <HvQueryBuilder
      readOnly
      attributes={attributes}
      query={initialQuery}
      onChange={(query) => {
        try {
          setMongoQuery(queryToMongo(query));
        } catch (error: any) {
          console.log("error: ", error.toString());
        }
      }}
    />
  );
};

describe("QueryBuilder", () => {
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

      const addConditionButton = getByRole("button", {
        name: /Add condition/i,
      });
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
    it("adds new condition (button)", async () => {
      const { getByRole, getByText, findByRole } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addConditionButton = getByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = await findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });

    it("adds new condition (link)", async () => {
      const { getByText, findByRole } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createConditionLink = getByText("Create a condition");
      expect(createConditionLink).toBeInTheDocument();

      userEvent.click(createConditionLink);

      const attributeDropdown = await findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();
    });
    it("adds new group (button)", async () => {
      const { getByRole, getByText, findAllByRole, findByRole } = render(
        <Main />
      );

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const addGroupButton = getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const attributeDropdown = await findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButtons = await findAllByRole("button", { name: /AND/i });
      expect(andButtons).toHaveLength(2);

      const addConditionButtons = await findAllByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("adds new group (link)", async () => {
      const { getByText, findAllByRole, findByRole } = render(<Main />);

      const noConditions = getByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();

      const createGroupLink = getByText("condition group");
      expect(createGroupLink).toBeInTheDocument();

      userEvent.click(createGroupLink);

      const attributeDropdown = await findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();
      expect(noConditions).not.toBeInTheDocument();

      const andButton = await findAllByRole("button", { name: /AND/i });
      expect(andButton).toHaveLength(2);

      const addConditionButtons = await findAllByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButtons).toHaveLength(2);
    });

    it("removes created condition", async () => {
      const { getByRole, findByText, findByRole } = render(<Main />);

      const addConditionButton = getByRole("button", {
        name: /Add condition/i,
      });
      expect(addConditionButton).toBeInTheDocument();

      userEvent.click(addConditionButton);

      const attributeDropdown = await findByRole("combobox", {
        name: /Attribute/i,
      });
      expect(attributeDropdown).toBeInTheDocument();

      const removeConditionButton = getByRole("button", {
        name: /Remove condition/i,
      });
      expect(removeConditionButton).toBeInTheDocument();

      userEvent.click(removeConditionButton);

      const confirmButton = await findByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = await findByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });

    it("removes created group", async () => {
      const { getByRole, findByRole, findByText } = render(<Main />);

      const addGroupButton = getByRole("button", { name: /Add group/i });
      expect(addGroupButton).toBeInTheDocument();

      userEvent.click(addGroupButton);

      const removeGroupButton = await findByRole("button", {
        name: /Remove group/i,
      });
      expect(removeGroupButton).toBeInTheDocument();

      userEvent.click(removeGroupButton);

      const confirmButton = await findByRole("button", { name: /Yes/i });
      expect(confirmButton).toBeInTheDocument();

      userEvent.click(confirmButton);

      const noConditions = await findByText("No conditions created yet");
      expect(noConditions).toBeInTheDocument();
    });
  });

  describe("initial query", () => {
    it("matches snapshot", () => {
      const { container } = render(<InitialQuery />);

      expect(container).toBeDefined();
    });
  });

  describe("read only", () => {
    it("should not be interactable", () => {
      const { getAllByRole } = render(<ReadOnly />);

      const buttons = getAllByRole("button");
      buttons.map((b) => expect(b).toBeDisabled());
    });
  });
});
