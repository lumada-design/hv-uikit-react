import { waitFor, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React, { useState } from "react";

import { HvTable, HvInput } from "../..";
import {
  WithExpanderAndCustomContent,
  WithCheckbox,
  WithCheckboxAndSecondaryActions,
  Main,
} from "./Table.stories";

export default {
  title: "Tests/Table",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios

// test scenario, Expanded
export const ContentExpanded = () => WithExpanderAndCustomContent();

ContentExpanded.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getAllByRole("button", { name: /row expander button/i })[2]);
      return waitFor(
        () => screen.getAllByRole("table")[4] && document.querySelector("[id|=reactgooglegraph]")
      );
    },
  },
};

// test scenario, rows selected and unselected
export const mixSelection = () => WithCheckbox();

mixSelection.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByRole("checkbox", { name: /select-2-select/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /select-3-select/i }));
      fireEvent.click(screen.getByRole("checkbox", { name: /select-7-select/i }));
      return waitFor(() => document.querySelectorAll("[aria-selected=true]")[2]);
    },
  },
};

// test scenario, opened row action dropdownmenu
export const RowActionOpened = () => WithCheckboxAndSecondaryActions();

RowActionOpened.parameters = {
  eyes: {
    runBefore: async () => {
      fireEvent.click(screen.getAllByRole("button", { name: /dropdown menu/i })[0]);

      const menu = await screen.findByRole("menu");

      // extra buffer to allow popper layout
      return new Promise((resolve) => setTimeout(() => resolve(menu), 1000));
    },
  },
};

// test scenario, all selected
export const AllRowsSelected = () => WithCheckboxAndSecondaryActions();

AllRowsSelected.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByRole("checkbox", { name: /all/i }));
      return waitFor(() => document.querySelectorAll("[aria-selected=true]")[9]);
    },
  },
};

// test scenario, sort column
export const SortColumn = () => Main();

SortColumn.parameters = {
  eyes: {
    runBefore() {
      fireEvent.click(screen.getByRole("button", { name: /test-column-priority-sort-button/i }));
      return waitFor(() => screen.getByText("Event 2"));
    },
  },
};

// test scenario with page definition

export const WithSearch = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
      subElementTitle: "cell_1",
      subElementTitle2: "cell_2",
    },
    {
      id: 13,
      name: "Event 2",
      createdDate: "10/14/2018",
      eventType: "Risk of failure profile",
      status: "Pending",
      riskScore: "90",
      severity: "Catastrophic",
      priority: "High",
      link: { displayText: "Asset 2", url: "blablabla" },
    },
    {
      id: 12,
      name: "Event 3",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
      riskScore: "98",
      severity: "Moderate",
      priority: "Medium",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 11,
      name: "Event 4",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Low",
      priority: "Low",
      link: { displayText: "Asset 3", url: "blablabla" },
    },
    {
      id: 10,
      name: "Event 5",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 2", url: "blablabla" },
    },
    {
      id: 8,
      name: "Event 6",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
      riskScore: "98",
      severity: "Major",
      priority: "High",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 7,
      name: "Event 7",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 6,
      name: "Event 8",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
      riskScore: "98",
      severity: "Moderate",
      priority: "Medium",
      link: { displayText: "Asset 2", url: "blablabla" },
    },
    {
      id: 5,
      name: "Event 9",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 4,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 3,
      name: "Event 10",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Major",
      priority: "High",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 2,
      name: "Event 11",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 1,
      name: "Event 12",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
  ];

  const getColumns = () => [
    {
      headerText: "Title",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left",
      sortMethod: (a, b) => {
        if (a === b) {
          return 0;
        }
        const aReverse = Number(a.split(" ")[1]);
        const bReverse = Number(b.split(" ")[1]);
        return aReverse > bReverse ? 1 : -1;
      },
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      cellType: "numeric",
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: (value) => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
    },
    {
      headerText: "Status",
      accessor: "status",
      format: (value) => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: (value) => `${value.original.riskScore}%`,
      cellType: "numeric",
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: (value) => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
      sortable: false,
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: (value) => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      fixed: "right",
      sortable: false,
    },
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const [page, setPage] = useState(0);
  const [payload, setPayload] = useState(data);

  return (
    <div style={{ padding: "10px" }}>
      <HvInput
        type="search"
        onChange={(e, value) => {
          const filteredData = data.filter((dt) =>
            dt.name.toUpperCase().includes(value.toUpperCase())
          );
          if (filteredData) {
            setPayload(filteredData);
            setPage(0);
          }
          return value;
        }}
      />
      <HvTable
        data={payload.slice()}
        id="test"
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        page={page}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};
