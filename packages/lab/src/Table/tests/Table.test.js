/* eslint-env jest */
import React from "react";
import range from "lodash/range";
import { render, within } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, EmptyCells, NonTableLayout } from "../stories/Table.stories";

import { Pagination, Sortable, BulkActions } from "../stories/TableHooks.stories";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
} from "../..";

describe("Table", () => {
  describe("Main Story", () => {
    it("should match snapshot", () => {
      const { container } = render(<Main />);
      expect(container).toBeDefined();
    });

    it("should render the table elements", () => {
      const { getByRole, getAllByRole } = render(<Main />);

      expect(getByRole("table")).toBeInTheDocument();

      expect(getAllByRole("cell").length).toBeGreaterThan(0);
      expect(getAllByRole("row").length).toBeGreaterThan(0);
    });
  });

  describe("non-table elements support", () => {
    it("defaults to table elements", () => {
      const { getByRole, getAllByRole } = render(<Main />);

      const table = getByRole("table");
      expect(table).toBeInTheDocument();

      expect(table.nodeName).toEqual("TABLE");
      expect(table).not.toHaveAttribute("role");

      const rowgroups = getAllByRole("rowgroup");
      expect(rowgroups.length).toBe(2);

      expect(rowgroups[0].nodeName).toEqual("THEAD");
      expect(rowgroups[0]).not.toHaveAttribute("role");

      expect(rowgroups[1].nodeName).toEqual("TBODY");
      expect(rowgroups[1]).not.toHaveAttribute("role");

      const headerRows = within(rowgroups[0]).getAllByRole("row");
      expect(headerRows.length).toBe(1);

      expect(headerRows[0].nodeName).toEqual("TR");
      expect(headerRows[0]).not.toHaveAttribute("role");

      const headerCells = within(headerRows[0]).getAllByRole("columnheader");
      expect(headerCells.length).toBe(7);

      expect(headerCells[0].nodeName).toEqual("TH");
      expect(headerCells[0]).not.toHaveAttribute("role");

      const bodyRows = within(rowgroups[1]).getAllByRole("row");
      expect(bodyRows.length).toBe(6);

      expect(bodyRows[0].nodeName).toEqual("TR");
      expect(bodyRows[0]).not.toHaveAttribute("role");

      const bodyCells = within(bodyRows[0]).getAllByRole("cell");
      expect(bodyCells.length).toBe(7);

      expect(bodyCells[0].nodeName).toEqual("TD");
      expect(bodyCells[0]).not.toHaveAttribute("role");
    });

    it("can render a different component and sets roles", () => {
      const { getByRole, getAllByRole } = render(<NonTableLayout />);

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
      expect(bodyRows.length).toBe(6);

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
              {range(NUM_COLS).map((id) => (
                <HvTableHeader key={id}>{`Sample Header ${id}`}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {range(NUM_ROWS).map((id) => (
              <HvTableRow key={id}>
                {range(NUM_COLS).map((id2) => (
                  <HvTableCell key={id2}>{`Sample Cell ${id2}`}</HvTableCell>
                ))}
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    );

    it("should be defined", () => {
      const { container } = render(<SimpleTable />);

      expect(container).toBeDefined();
      expect(container).toMatchSnapshot();
    });

    it("should render the rows and cells", () => {
      const { getAllByRole } = render(<SimpleTable />);

      expect(getAllByRole("rowgroup").length).toBe(2); // thead & tbody
      expect(getAllByRole("row").length).toBe(NUM_ROWS + 1);
      expect(getAllByRole("columnheader").length).toBe(NUM_COLS);
      expect(getAllByRole("cell").length).toBe(NUM_COLS * NUM_ROWS);
    });
  });

  describe("Header Only Table", () => {
    const NUM_COLS = 6;

    const HeadersOnlyTable = () => (
      <HvTableContainer>
        <HvTable>
          <HvTableHead>
            <HvTableRow>
              {range(NUM_COLS).map((id) => (
                <HvTableHeader key={id}>{`Header ${id}`}</HvTableHeader>
              ))}
            </HvTableRow>
          </HvTableHead>
          <HvTableBody />
        </HvTable>
      </HvTableContainer>
    );

    it("should render single row and its cells", () => {
      const { getAllByRole } = render(<HeadersOnlyTable />);

      expect(getAllByRole("row").length).toBe(1);
      expect(getAllByRole("columnheader").length).toBe(NUM_COLS);
    });
  });

  describe("EmptyCells Story", () => {
    it("should be defined", () => {
      const { container } = render(<EmptyCells />);
      expect(container).toBeDefined();
    });

    it("should contain the em-dashes", () => {
      const { getAllByText } = render(<EmptyCells />);

      expect(getAllByText("—").length).toBe(3);
    });
  });

  describe("Pagination Story", () => {
    it("should be defined", () => {
      const { container } = render(<Pagination />);
      expect(container).toBeDefined();
    });

    it("should render the table elements", () => {
      const { getByRole, getAllByRole } = render(<Pagination />);

      expect(getByRole("table")).toBeInTheDocument();

      expect(getAllByRole("cell").length).toBeGreaterThan(0);
      expect(getAllByRole("row").length).toBeGreaterThan(0);
    });

    it("should contain the correct page elements", () => {
      const { getByLabelText, queryByText, getAllByRole } = render(<Pagination />);

      const [fistPage, previousPage, nextPage, lastPage] = [
        "First Page",
        "Previous Page",
        "Next Page",
        "Last Page",
      ].map(getByLabelText);

      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();

      userEvent.click(fistPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();

      userEvent.click(previousPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();

      userEvent.click(nextPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).not.toBeInTheDocument();
      expect(queryByText("Event 11")).toBeInTheDocument();

      userEvent.click(lastPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).not.toBeInTheDocument();
      expect(queryByText("Event 30")).not.toBeInTheDocument();
      expect(queryByText("Event 31")).toBeInTheDocument();
    });
  });

  describe("Sortable Story", () => {
    it("should be defined", () => {
      const { container } = render(<Sortable />);
      expect(container).toBeDefined();
    });

    it("should render the table elements", () => {
      const { getByRole, getAllByRole } = render(<Sortable />);

      expect(getByRole("table")).toBeInTheDocument();

      expect(getAllByRole("cell").length).toBeGreaterThan(0);
      expect(getAllByRole("row").length).toBeGreaterThan(0);
    });

    it("should single-sort as expected", () => {
      const { getByText, queryAllByText } = render(<Sortable />);
      const severityButton = getByText("Severity");

      const getEvent = (i) => queryAllByText(/^Event \d+$/g)[i];

      // Default sorting
      expect(getEvent(0)).toHaveTextContent("Event 1");

      // Asc sorting
      userEvent.click(severityButton);
      expect(getEvent(0)).toHaveTextContent("Event 4");

      // Desc sorting
      userEvent.click(severityButton);
      expect(getEvent(0)).toHaveTextContent("Event 5");

      // Back to default sorting
      userEvent.click(severityButton);
      expect(getEvent(0)).toHaveTextContent("Event 1");
    });
  });

  describe("BulkActions Story", () => {
    it("should be defined", () => {
      const { container } = render(<BulkActions />);
      expect(container).toBeDefined();
    });

    it("should render the table elements", () => {
      const { getByRole, getAllByRole } = render(<BulkActions />);

      expect(getByRole("table")).toBeInTheDocument();

      expect(getAllByRole("cell").length).toBeGreaterThan(0);
      expect(getAllByRole("row").length).toBeGreaterThan(0);
    });

    it("should select rows accordingly expected", () => {
      const { getByLabelText, getAllByRole, queryAllByRole } = render(<BulkActions />);
      const bulkCheckbox = getAllByRole("checkbox")[0];
      const firstCheckbox = getAllByRole("checkbox")[1];
      const secondCheckbox = getAllByRole("checkbox")[2];

      expect(getByLabelText("All (64)")).toBeInTheDocument();
      expect(bulkCheckbox).toBeInTheDocument();
      expect(firstCheckbox).toBeInTheDocument();
      expect(secondCheckbox).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0);
      expect(queryAllByRole("checkbox", { checked: false }).length).toBe(10 + 1);

      // Click a checkbox
      userEvent.click(firstCheckbox);
      expect(getByLabelText("1 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(1 + 1);

      // Click another checkbox
      userEvent.click(secondCheckbox);
      expect(getByLabelText("2 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(2 + 1);

      // Click Bulk Actions - should deselect all in page when any selected
      userEvent.click(bulkCheckbox);
      expect(getByLabelText("All (64)")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0);

      // Click Bulk Actions - should select all in page when none selected
      userEvent.click(bulkCheckbox);
      expect(getByLabelText("10 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(10 + 1);
    });
  });

  describe("Table line click", () => {
    it("executes the provided callback", () => {
      const onClickSpy = jest.fn();

      const TableWithRowClick = () => {
        const NUM_ROWS = 6;
        const NUM_COLS = 3;

        return (
          <HvTableContainer>
            <HvTable>
              <HvTableHead>
                <HvTableRow>
                  {range(NUM_COLS).map((id) => (
                    <HvTableHeader key={id}>{`Sample Header ${id}`}</HvTableHeader>
                  ))}
                </HvTableRow>
              </HvTableHead>
              <HvTableBody>
                {range(NUM_ROWS).map((id) => (
                  <HvTableRow key={id} onClick={(e) => onClickSpy(id, e)}>
                    {range(NUM_COLS).map((id2) => (
                      <HvTableCell key={id2}>{`Sample Cell ${id2}`}</HvTableCell>
                    ))}
                  </HvTableRow>
                ))}
              </HvTableBody>
            </HvTable>
          </HvTableContainer>
        );
      };

      const { getAllByRole } = render(<TableWithRowClick />);

      const rowsInTable = getAllByRole("row");

      userEvent.click(rowsInTable[1]);
      userEvent.click(rowsInTable[3]);

      expect(onClickSpy).toHaveBeenCalledTimes(2);

      expect(onClickSpy).toHaveBeenNthCalledWith(1, 0, expect.anything());
      expect(onClickSpy).toHaveBeenNthCalledWith(2, 2, expect.anything());
    });
  });
});
