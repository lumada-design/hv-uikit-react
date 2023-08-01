import {
  HvQueryBuilder,
  HvQueryBuilderProps,
} from "@hitachivantara/uikit-react-core";
import { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { defaultOperators } from "./Context";

import queryToMongo from "./queryToMongo";

const meta: Meta<typeof HvQueryBuilder> = {
  title: "Widgets/Query Builder",
  component: HvQueryBuilder,
};
export default meta;

export const Main: StoryObj<HvQueryBuilderProps> = {
  args: {
    attributes: {
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
    },
    operators: {
      ...defaultOperators,
      customType: [...defaultOperators.text],
    },
    readOnly: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvQueryBuilder {...args} />;
  },
};

export const InitialQuery: StoryObj<HvQueryBuilderProps> = {
  render: () => {
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
  },
};

InitialQuery.parameters = {
  docs: {
    description: {
      story: "With query parsed to Mongo",
    },
  },
};

export const ReadOnly: StoryObj<HvQueryBuilderProps> = {
  render: () => {
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
  },
};

ReadOnly.parameters = {
  docs: {
    description: {
      story: "A Query Builder in read only mode.",
    },
  },
};
