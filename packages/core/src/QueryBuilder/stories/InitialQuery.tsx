import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvQueryBuilder,
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
  combinator: "and",
  rules: [
    {
      attribute: "price",
      operator: "lessThan",
      value: 10,
    },
    {
      attribute: "category",
      operator: "equals",
      value: "Movies",
    },
    {
      combinator: "and",
      rules: [
        {
          attribute: "in_stock",
          operator: "equalsTo",
          value: true,
        },
        {
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
      combinator: "or",
      rules: [
        {
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
