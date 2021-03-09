/* eslint-env jest */

import React from "react";
import range from "lodash/range";
import { render } from "testing-utils";
import userEvent from "@testing-library/user-event";

import { Main, Pagination } from "../stories/Table.stories";
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
      expect(container).toMatchSnapshot();
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
      expect(queryByText("Event 0")).toBeInTheDocument();
      expect(queryByText("Event 10")).not.toBeInTheDocument();

      userEvent.click(fistPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 0")).toBeInTheDocument();
      expect(queryByText("Event 10")).not.toBeInTheDocument();

      userEvent.click(previousPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 0")).toBeInTheDocument();
      expect(queryByText("Event 10")).not.toBeInTheDocument();

      userEvent.click(nextPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 0")).not.toBeInTheDocument();
      expect(queryByText("Event 10")).toBeInTheDocument();

      userEvent.click(lastPage);
      expect(getAllByRole("row").length).toBe(11);
      expect(queryByText("Event 0")).not.toBeInTheDocument();
      expect(queryByText("Event 29")).not.toBeInTheDocument();
      expect(queryByText("Event 30")).toBeInTheDocument();
    });
  });
});
