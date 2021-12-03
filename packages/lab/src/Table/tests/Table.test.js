/* eslint-env jest */
import React from "react";
import range from "lodash/range";

import userEvent from "@testing-library/user-event";
import { render, within, fireEvent, waitFor, screen } from "testing-utils";

import { Main } from "../stories/Table.stories";
import {
  Pagination,
  Sortable,
  BulkActions,
  KitchenSink,
  AlternativeLayout,
  EmptyCells,
} from "../stories/TableHooks.stories";

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
      const { getByRole, getAllByRole } = render(<AlternativeLayout />);

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

  describe("No Data Story", () => {
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
      const { getByLabelText, getByText, queryByText, getAllByRole } = render(<Pagination />);

      const [fistPage, previousPage, nextPage, lastPage] = [
        "First Page",
        "Previous Page",
        "Next Page",
        "Last Page",
      ].map(getByLabelText);

      expect(getAllByRole("row").length).toBe(11);
      expect(getByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();

      expect(fistPage).toBeDisabled();
      expect(previousPage).toBeDisabled();

      userEvent.click(nextPage);

      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).not.toBeInTheDocument();
      expect(getByText("Event 11")).toBeInTheDocument();

      userEvent.click(previousPage);

      expect(getAllByRole("row").length).toBe(11);
      expect(getByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();

      userEvent.click(lastPage);

      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 1")).not.toBeInTheDocument();
      expect(queryByText("Event 30")).not.toBeInTheDocument();
      expect(getByText("Event 31")).toBeInTheDocument();

      userEvent.click(fistPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(getByText("Event 1")).toBeInTheDocument();
      expect(queryByText("Event 11")).not.toBeInTheDocument();
    });

    it("should change current page when next and previous page is clicked sequentially", () => {
      const { getByLabelText, getByRole } = render(<Pagination />);

      const [fistPage, previousPage, nextPage, lastPage] = [
        "First Page",
        "Previous Page",
        "Next Page",
        "Last Page",
      ].map(getByLabelText);

      const input = getByRole("spinbutton", { name: "Current page" });
      expect(input).toBeInTheDocument();
      // value before page navigation
      expect(input.value).toBe("1");
      // Navigate to next page
      userEvent.click(nextPage);
      expect(input.value).toBe("2");
      // navigate to last page
      userEvent.click(lastPage);
      expect(input.value).toBe("4");
      // navigate to previous page
      userEvent.click(previousPage);
      expect(input.value).toBe("3");
      // jump to first page
      userEvent.click(fistPage);
      expect(input.value).toBe("1");
      // enter value and navigate to page
      userEvent.type(input, "4{enter}");
      expect(input.value).toBe("4");
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

    it("should select rows as expected", () => {
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

      expect(bulkCheckbox).not.toBeChecked();
      expect(bulkCheckbox).not.toHaveAttribute("data-indeterminate", "true");

      // Click a checkbox
      userEvent.click(firstCheckbox);
      expect(getByLabelText("1 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(1 + 1);

      // Click another checkbox
      userEvent.click(secondCheckbox);
      expect(getByLabelText("2 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(2 + 1);

      expect(bulkCheckbox).toBeChecked();
      expect(bulkCheckbox).toHaveAttribute("data-indeterminate", "true");

      // Click Bulk Actions - should deselect all in page when any selected
      userEvent.click(bulkCheckbox);
      expect(getByLabelText("All (64)")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0);
      expect(bulkCheckbox).not.toBeChecked();
      expect(bulkCheckbox).not.toHaveAttribute("data-indeterminate", "true");

      // Click Bulk Actions - should select all in page when none selected
      userEvent.click(bulkCheckbox);
      expect(getByLabelText("10 / 64")).toBeInTheDocument();
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(10 + 1);

      expect(bulkCheckbox).toBeChecked();
      expect(bulkCheckbox).toHaveAttribute("data-indeterminate", "true");
    });
  });

  describe("Bulk Actions with Page Interactions", () => {
    it("selections are retained when navigating to other pages", () => {
      const { getByLabelText, getAllByRole, queryAllByRole, getByRole } = render(<BulkActions />);

      const firstCheckbox = getAllByRole("checkbox")[1];
      const secondCheckbox = getAllByRole("checkbox")[2];
      // selection is retained when navigating to next page
      // selection is retained when page size changes
      const [previousPage, nextPage] = ["Previous Page", "Next Page"].map(getByLabelText);

      expect(getByLabelText("All (64)")).toBeInTheDocument();

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

      const input = getByRole("spinbutton", { name: "Current page" });
      expect(input).toBeInTheDocument();
      // Navigate to next page
      userEvent.click(nextPage);
      expect(input.value).toBe("2");
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0 + 1);

      // navigate to previous page
      userEvent.click(previousPage);
      expect(input.value).toBe("1");
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(2 + 1);

      // navigate to random page select items
      userEvent.type(input, "7{enter}");
      expect(input.value).toBe("7");
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0 + 1);
      expect(getByLabelText("2 / 64")).toBeInTheDocument();

      const firstCheckboxLastPage = getAllByRole("checkbox")[1];
      const secondCheckboxLastPage = getAllByRole("checkbox")[2];
      const thirdCheckboxLastPage = getAllByRole("checkbox")[3];

      userEvent.click(firstCheckboxLastPage);
      userEvent.click(secondCheckboxLastPage);
      userEvent.click(thirdCheckboxLastPage);
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(3 + 1);
      expect(getByLabelText("5 / 64")).toBeInTheDocument();
    });

    it("navigate to last page and delete rows should render previous page", () => {
      const { getByLabelText, getAllByRole, queryAllByRole, getByRole } = render(<KitchenSink />);

      const bulkCheckbox = getAllByRole("checkbox")[0];

      const [lastPage] = ["Last Page"].map(getByLabelText);

      expect(getByLabelText("All (64)")).toBeInTheDocument();
      userEvent.click(lastPage);
      userEvent.click(bulkCheckbox);
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(4 + 1);

      const deleteButton = getByRole("button", { name: "Delete" });
      expect(deleteButton).toBeInTheDocument();
      userEvent.click(deleteButton);
      expect(queryAllByRole("checkbox", { checked: true }).length).toBe(0);
      expect(getByLabelText("All (60)")).toBeInTheDocument();
    });

    it("selections are retained when changing  number of rows in page", async () => {
      const { getByLabelText, getAllByRole, getByRole } = render(<KitchenSink />);

      expect(getByLabelText("All (64)")).toBeInTheDocument();
      // select all rows in first page
      const bulkCheckbox = getAllByRole("checkbox")[0];
      fireEvent.click(bulkCheckbox);
      const selectedCheckboxes = screen.queryAllByRole("checkbox", { checked: true });
      expect(selectedCheckboxes.length).toBe(10 + 1);

      const numberOfRowsSelector = getByRole("textbox", { name: "Select how many to display" });
      expect(numberOfRowsSelector).toBeInTheDocument();

      fireEvent.click(screen.getByRole("textbox", { name: "Select how many to display" }));

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(6);
      });

      const options = screen.getAllByRole("option");
      const fiveRows = options[0];
      const twentyRows = options[2];
      const hundredRows = options[5];

      expect(fiveRows).toBeInTheDocument();
      expect(twentyRows).toBeInTheDocument();
      expect(hundredRows).toBeInTheDocument();
      fireEvent.click(hundredRows);

      const visibleCheckboxes = screen.queryAllByRole("checkbox", { checked: false });

      expect(visibleCheckboxes.length).toBe(54);

      const selectedVisibleCheckboxes = screen.queryAllByRole("checkbox", { checked: true });
      expect(selectedVisibleCheckboxes.length).toBe(10 + 1);
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
