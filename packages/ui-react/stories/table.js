import React from "react";
import { storiesOf } from "@storybook/react";
import { HvTable } from "../src";
import getColumns from "./table/columns";
import data from "./table/data.json";
import theme from "../src/theme";

const defaults = {
  pageSize: 10,
  pages: data.length,
  sorted: [{ id: "createdDate", desc: true }]
};

const dismiss = () => {};

storiesOf("Table", module).add("Table", () => (
  <HvTable
    data={data}
    columns={getColumns(theme, dismiss)}
    cellHeight={64}
    headerHeight={32}
    defaultPageSize={defaults.pageSize}
    pageSize={defaults.pageSize}
    resizable
    pages={defaults.pages}
    defaultSorted={defaults.sorted}
  />
));
