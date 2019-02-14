import React from "react";
import { storiesOf } from "@storybook/react";
import withStyles from "@material-ui/core/styles/withStyles";
import ActionsPopover from "./table/ActionsPopover";
import ActionsList from "./table/ActionsList";
import { HvTable } from "../src";
import getColumns from "./table/columns";
import data from "./table/data.json";
import dataTypicalExample from "./table/typicalTableExample/data";
import getColumnsTypicalExample from "./table/typicalTableExample/columns";
import dataExpandableExample from "./table/ExpandableExample/data";
import getColumnsExpandableExample from "./table/ExpandableExample/columns";
import theme from "../src/theme";

const defaults = {
  pageSize: 10,
  pages: data.length,
  sorted: [{ id: "createdDate", desc: true }],
  titleText: "This is The Title",
  subtitleText: "This is The Subtitle"
};

const dismiss = () => {};

const subElementTemplate = row => (
  <div>
    <table>
      <tr>
        <th>first</th>
        <th>second</th>
      </tr>
      <tr>
        <td>{row.original.subElementTitle}</td>
        <td>{row.original.subElementTitle2}</td>
      </tr>
    </table>
  </div>
);

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
      titleText={defaults.titleText}
      subtitleText={defaults.subtitleText}
    />
  ))
  .add("Table with expander", () => (
    <HvTable
      data={data}
      columns={getColumns(theme, dismiss)}
      defaultPageSize={defaults.pageSize}
      pageSize={defaults.pageSize}
      resizable
      pages={defaults.pages}
      defaultSorted={defaults.sorted}
      titleText={defaults.titleText}
      subtitleText={defaults.subtitleText}
      subElementTemplate={subElementTemplate}
    />
  ))
  .add("Table with checkbox", () => (
    <HvTable
      data={data}
      columns={getColumns(theme, dismiss)}
      defaultPageSize={defaults.pageSize}
      pageSize={defaults.pageSize}
      resizable
      pages={defaults.pages}
      defaultSorted={defaults.sorted}
      titleText={defaults.titleText}
      subtitleText={defaults.subtitleText}
      idForCheckbox="id"
    />
  ))

  //---------------------------------------

  .add("Typical table", () => (
    <HvTable
      data={dataTypicalExample}
      columns={getColumnsTypicalExample(theme, dismiss)}
      defaultPageSize={defaults.pageSize}
      pageSize={defaults.pageSize}
      resizable
      pages={defaults.pages}
      defaultSorted={defaults.sorted}
      titleText="Sales overview"
      subtitleText="Click on a row to see store details"
      idForCheckbox="id"
    />
  ))
  .add("Expandable table with horizontal scrolling", () => (
    <div style={{ width: "1000px" }}>
      <HvTable
        data={dataExpandableExample}
        columns={getColumnsExpandableExample(theme, dismiss)}
        defaultPageSize={defaults.pageSize}
        pageSize={defaults.pageSize}
        pages={defaults.pages}
        defaultSorted={defaults.sorted}
        titleText="Storage arrays"
        subtitleText="Click data centers or storage arrays to drill down"
        subElementTemplate={(row) => (
          <div>
            <table>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
              </tr>
              <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
              </tr>
              <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
              </tr>
              <tr>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
              </tr>
              <tr>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
              </tr>
              <tr>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
              </tr>
              <tr>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
              </tr>
            </table>
          </div>
        )}
      />
    </div>
  ));
