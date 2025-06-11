import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
} from ".";
import { ResponsiveTable } from "./stories/TableSamples/ResponsiveTable";

describe("Table", () => {
  it("can render a different component and sets roles", () => {
    const { getByRole, getAllByRole } = render(<ResponsiveTable />);

    const table = getByRole("table");
    expect(table).toBeInTheDocument();

    expect(table.nodeName).toEqual("DIV");
    expect(table).toHaveAttribute("role", "table");

    const rowgroups = getAllByRole("rowgroup");
    expect(rowgroups.length).toBe(2);

    expect(rowgroups[0].nodeName).toEqual("DIV");
    expect(rowgroups[0]).toHaveAttribute("role", "rowgroup");

    expect(rowgroups[1].nodeName).toEqual("DIV");
    expect(rowgroups[1]).toHaveAttribute("role", "rowgroup");

    const headerRows = within(rowgroups[0]).getAllByRole("row");
    expect(headerRows.length).toBe(1);

    expect(headerRows[0].nodeName).toEqual("DIV");
    expect(headerRows[0]).toHaveAttribute("role", "row");

    const headerCells = within(headerRows[0]).getAllByRole("columnheader");
    expect(headerCells.length).toBe(7);

    expect(headerCells[0].nodeName).toEqual("DIV");
    expect(headerCells[0]).toHaveAttribute("role", "columnheader");

    const bodyRows = within(rowgroups[1]).getAllByRole("row");
    expect(bodyRows.length).toBe(20);

    expect(bodyRows[0].nodeName).toEqual("DIV");
    expect(bodyRows[0]).toHaveAttribute("role", "row");

    const bodyCells = within(bodyRows[0]).getAllByRole("cell");
    expect(bodyCells.length).toBe(7);

    expect(bodyCells[0].nodeName).toEqual("DIV");
    expect(bodyCells[0]).toHaveAttribute("role", "cell");
  });
});

describe("Simple Table", () => {
  const NUM_ROWS = 6;
  const NUM_COLS = 3;

  const SimpleTable = () => (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {[...Array(NUM_COLS).keys()].map((id) => (
              <HvTableHeader key={id}>{`Sample Header ${id}`}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {[...Array(NUM_ROWS).keys()].map((id) => (
            <HvTableRow key={id}>
              {[...Array(NUM_COLS).keys()].map((id2) => (
                <HvTableCell key={id2}>{`Sample Cell ${id2}`}</HvTableCell>
              ))}
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );

  it("should render the rows and cells", () => {
    const { getAllByRole } = render(<SimpleTable />);

    expect(getAllByRole("rowgroup").length).toBe(2); // thead & tbody
    expect(getAllByRole("row").length).toBe(NUM_ROWS + 1);
    expect(getAllByRole("columnheader").length).toBe(NUM_COLS);
    expect(getAllByRole("cell").length).toBe(NUM_COLS * NUM_ROWS);
  });
});

describe("List Row", () => {
  const NUM_ROWS = 6;
  const NUM_COLS = 3;

  const ListRow = () => (
    <HvTableContainer>
      <HvTable variant="listrow">
        <HvTableHead>
          <HvTableRow>
            {[...Array(NUM_COLS).keys()].map((id) => (
              <HvTableHeader key={id}>{`Sample Header ${id}`}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody withNavigation>
          {[...Array(NUM_ROWS).keys()].map((id) => (
            <HvTableRow key={id}>
              {[...Array(NUM_COLS).keys()].map((id2) => (
                <HvTableCell key={id2}>{`Sample Cell ${id2}`}</HvTableCell>
              ))}
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );

  it("should render the rows and cells", () => {
    const { getAllByRole } = render(<ListRow />);

    expect(getAllByRole("rowgroup").length).toBe(2); // thead & tbody
    expect(getAllByRole("row").length).toBe(NUM_ROWS + 1);
    expect(getAllByRole("columnheader").length).toBe(NUM_COLS);
    expect(getAllByRole("cell").length).toBe(NUM_COLS * NUM_ROWS);
  });

  it("should have the list row variant", () => {
    const { getAllByRole } = render(<ListRow />);
    const rows = getAllByRole("row");
    rows.forEach((element, index) => {
      expect(element.className).toMatch(
        index !== 0 ? /HvTableRow-variantList/ : /HvTableRow-variantListHead/,
      );
    });
  });
});

describe("Header Only Table", () => {
  const NUM_COLS = 6;

  const HeadersOnlyTable = () => (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {[...Array(NUM_COLS).keys()].map((id) => (
              <HvTableHeader key={id}>{`Header ${id}`}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>{null}</HvTableBody>
      </HvTable>
    </HvTableContainer>
  );

  it("should render single row and its cells", () => {
    const { getAllByRole } = render(<HeadersOnlyTable />);

    expect(getAllByRole("row").length).toBe(1);
    expect(getAllByRole("columnheader").length).toBe(NUM_COLS);
  });
});
