import React from "react";
import { storiesOf } from "@storybook/react";
import withStyles from "@material-ui/core/styles/withStyles";

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

storiesOf("Table", module)
  .add("Table", () => (
    <HvTable
      data={data}
      columns={getColumns(theme, dismiss)}
      defaultPageSize={defaults.pageSize}
      pageSize={defaults.pageSize}
      resizable
      pages={defaults.pages}
      defaultSorted={defaults.sorted}
    />
  ))
  .add("Table Styled", () => {
    const styles = () => ({
      root: {
        "& $table": {
          border: "solid 3px red",
          "& $thead": {
            "& $theadTh": {
              height: 40
            }
          }
        }
      },
      table: {},
      thead: {},
      theadTh: {}
    });

    const HvTableWithStyles = withStyles(styles)(HvTable);

    return (
      <HvTableWithStyles
        data={data}
        columns={getColumns(theme, dismiss)}
        defaultPageSize={defaults.pageSize}
        pageSize={defaults.pageSize}
        resizable
        pages={defaults.pages}
        defaultSorted={defaults.sorted}
      />
    );
  })
  .add("Table with no pagination",  () => (
    <HvTable
      data={data}
      columns={getColumns(theme, dismiss)}
      pageSize={data.length}
      resizable={false}
      showPagination={false}
      defaultSorted={defaults.sorted}
    />
  ))
  .add("Table with no sort",  () => (
    <HvTable
      data={data}
      columns={getColumns(theme, dismiss)}
      pageSize={data.length}
      resizable={false}
      showPagination={false}
      sortable={false}
    />
  ));
