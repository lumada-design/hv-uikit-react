/* eslint-env jest */
import React from "react";
import range from "lodash/range";
import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, EmptyCells } from "../stories/Table.stories";

import { Pagination, Sortable, BulkActions } from "../stories/TableHooks.stories";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
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

  describe("Simple Table", () => {
    const NUM_ROWS = 6;
    const NUM_COLS = 3;

    const SimpleTable = () => (
      <HvTableContainer>
        <HvTable>
          <HvTableHead>
            <HvTableRow>
              {range(NUM_COLS).map((id) => (
                <HvTableCell key={id}>{`Sample Header ${id}`}</HvTableCell>
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
                <HvTableCell key={id}>{`Header ${id}`}</HvTableCell>
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
      expect(getEvent(0)).toHaveTextContent("Event 3");

      // Desc sorting
      userEvent.click(severityButton);
      expect(getEvent(0)).toHaveTextContent("Event 4");

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
                    <HvTableCell key={id}>{`Sample Header ${id}`}</HvTableCell>
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
