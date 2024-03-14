import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvQueryBuilder,
  HvButton,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Topics } from "@hitachivantara/uikit-react-icons";

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
};

const classes = {
  button: css({ marginBottom: theme.space.sm }),
};

export const InitialQuery = () => {
  const [mongoQuery, setMongoQuery] = useState(queryToMongo(initialQuery));
  const [disable, setDisable] = useState(false);

  return (
    <>
      <HvButton
        variant="secondarySubtle"
        startIcon={<Topics />}
        onClick={() => setDisable(!disable)}
        className={classes.button}
      >
        {disable ? "Show" : "Hide"} confirmation dialogs
      </HvButton>
      <HvQueryBuilder
        attributes={attributes}
        defaultValue={initialQuery}
        onChange={(query) => {
          try {
            setMongoQuery(queryToMongo(query));
          } catch (error: any) {
            console.log("error: ", error.toString());
          }
        }}
        disableConfirmation={disable}
      />
      <pre>{JSON.stringify(mongoQuery, null, 2)}</pre>
    </>
  );
};
