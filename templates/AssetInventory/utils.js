// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import {
  Cards,
  List,
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Add,
  Delete,
  Preview,
} from "@hitachivantara/uikit-react-icons";

export const makeIcon = (color) => {
  switch (color) {
    case "sema1":
      return <Level0Good semantic="sema1" />;
    case "sema2":
      return <Level1 semantic="sema2" />;
    case "sema3":
      return <Level2Average semantic="sema3" />;
    case "sema4":
      return <Level3Bad semantic="sema4" />;
    default:
      return undefined;
  }
};

export const actions = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "put", label: "Preview", icon: <Preview /> },
];

export const views = [
  { id: "card", icon: <Cards />, "aria-label": "Select card view" },
  { id: "list", icon: <List />, "aria-label": "Select list view" },
];

export const idsToControl = {
  cards: "cardsGrid",
  list: "itemList",
};
