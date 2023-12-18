import { useState } from "react";
import { HvQueryBuilder } from "@hitachivantara/uikit-react-core";

import queryToMongo from "./queryToMongo";

const attributes = {
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
};

export const ReadOnly = () => {
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
