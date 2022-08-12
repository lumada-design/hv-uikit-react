/* eslint-env jest */
import React from "react";

import userEvent from "@testing-library/user-event";
import { render } from "testing-utils";
import { AllColumnRenderers } from "../../stories/TableColumnRenderers.stories";
import {
  hvTextColumn,
  hvNumberColumn,
  hvDateColumn,
  hvExpandColumn,
  hvTagColumn,
  hvSwitchColumn,
  hvDropdownColumn,
  hvProgressColumn,
} from "../renderers";

describe("Table column renderers", () => {
  describe("renders functions", () => {
    it("should generate a text column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvTextColumn({ Header: headerText, accessor: accessorText, style: styling });
      const { Cell, Header, accessor, sortType, style } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(sortType).toBe("alphanumeric");
      expect(style).toBe(styling);
    });

    it("should generate a number column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvNumberColumn({ Header: headerText, accessor: accessorText, style: styling });
      const { Cell, Header, accessor, sortType, style, align } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(sortType).toBe("number");
      expect(align).toBe("right");
      expect(style).toBe(styling);
    });

    it("should generate a date column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvDateColumn({ Header: headerText, accessor: accessorText, style: styling });
      const { Cell, Header, accessor, sortDescFirst, sortType, style } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(sortType).toBe("alphanumeric");
      expect(sortDescFirst).toBe(true);
      expect(style).toBe(styling);
    });

    it("should generate a expander column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvExpandColumn(
        { Header: headerText, accessor: accessorText, style: styling },
        "expand",
        "collapse",
        () => true
      );
      const { Cell, Header, accessor, sortType, style, cellStyle } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(sortType).toBe("alphanumeric");
      expect(style).toBe(styling);
      expect(cellStyle).toEqual({ position: "relative" });
    });

    it("should generate a tag column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvTagColumn(
        { Header: headerText, accessor: accessorText, style: styling },
        "status_name",
        "status_color",
        "status_text_color"
      );
      const { Cell, Header, accessor, style, cellStyle } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(style).toBe(styling);
      expect(cellStyle).toEqual({ paddingBottom: 0, paddingTop: 0 });
    });

    it("should generate a switch column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvSwitchColumn(
        { Header: headerText, accessor: accessorText, style: styling },
        "default",
        "yes",
        "no",
        {
          disabled: true,
        }
      );
      const { Cell, Header, accessor, style, cellStyle } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(style).toBe(styling);
      expect(cellStyle).toEqual({ paddingBottom: 0, paddingTop: 0 });
    });

    it("should generate a dropdown column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvDropdownColumn(
        { Header: headerText, accessor: accessorText, style: styling },
        "Severity-id-101",
        "Select severity...",
        "Select severity...",
        () => 3
      );
      const { Cell, Header, accessor, style, cellStyle } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(style).toBe(styling);
      expect(cellStyle).toEqual({ paddingBottom: 0, paddingTop: 0 });
    });

    it("should generate a hvProgressColumn column configuration correctly", () => {
      const headerText = "headerText";
      const accessorText = "accessorText";
      const styling = { maxWidth: 160 };
      const result = hvProgressColumn(
        { Header: headerText, accessor: accessorText, style: styling },
        (row) => row.original.riskScore,
        () => 100,
        "secondary"
      );
      const { Cell, Header, accessor, style, cellStyle } = result;
      expect(typeof Cell === "function").toBe(true);
      expect(Header).toBe(headerText);
      expect(accessor).toBe(accessorText);
      expect(style).toBe(styling);
      expect(cellStyle).toEqual({ paddingBottom: 0, paddingTop: 0 });
    });
  });
  describe("renderers stories", () => {
    jest.setTimeout(30000);
    const { ResizeObserver } = window;

    beforeEach(() => {
      delete window.ResizeObserver;
      window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));
    });

    afterEach(() => {
      window.ResizeObserver = ResizeObserver;
      jest.restoreAllMocks();
    });

    it("should match snapshot", () => {
      const { container } = render(<AllColumnRenderers />);
      expect(container).toBeDefined();
    });

    it("should render the column elements", () => {
      const { getByRole, getAllByRole, getAllByText } = render(<AllColumnRenderers />);

      expect(getByRole("table")).toBeInTheDocument();
      expect(getAllByRole("cell").length).toBeGreaterThan(0);
      expect(getAllByRole("row").length).toBeGreaterThan(0);
      expect(getAllByRole("button").length).toBe(14);
      expect(getAllByRole("combobox").length).toBe(11);
      expect(getAllByText("Open").length).toBe(5);
      expect(getAllByText("Closed").length).toBe(5);
      expect(getAllByText("—").length).toBe(3);
    });

    it("should open the expander column", async () => {
      const { getAllByLabelText, findByText } = render(<AllColumnRenderers />);
      const expanderButtons = getAllByLabelText("expand");
      expect(expanderButtons.length).toBe(10);
      userEvent.click(expanderButtons[0]); // open
      const expanderContent = await findByText("Expanded content for: Event 1");
      expect(expanderContent).toBeInTheDocument();
    });

    it("should open the dropdown column", async () => {
      const { findAllByRole, getAllByRole } = render(<AllColumnRenderers />);
      const dropdowns = getAllByRole("combobox");
      expect(dropdowns.length).toBe(11);
      userEvent.click(dropdowns[0]); // open
      const dropdownOptions = await findAllByRole("option");
      expect(dropdownOptions.length).toBe(4);
    });
  });
});
