import React, { useMemo } from "react";
import range from "lodash/range";

import Chart from "react-google-charts";

import { makeStyles } from "@material-ui/core";

import { Ban } from "@hv/uikit-react-icons";
import { HvCheckBox, HvDropDownMenu, HvEmptyState, HvTypography } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  useHvTable,
} from "../..";

import KitchenSink from "./KitchenSink";

import { makeData, getColumns, useToggleIndex } from "./utils";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hv/uikit-react-core'",
  },
  component: HvTable,
  subcomponents: {
    HvTableContainer,
    HvTableRow,
    HvTableHead,
    HvTableHeader,
    HvTableBody,
    HvTableCell,
  },
};

export const Main = () => {
  const columns = getColumns();
  const data = makeData(6);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow key={el.id} hover>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

Main.parameters = {
  docs: {
    description: { story: "A minimal table example." },
  },
};

export const Empty = () => {
  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" style={{ height: 96 }}>
        <HvEmptyState message="No data to display." icon={<Ban role="presentation" />} />
      </HvTableCell>
    </HvTableRow>
  );
  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {getColumns().map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          <EmptyRow />
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCells = () => {
  const columns = getColumns();
  const data = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow key={el.id} hover>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status ?? "—"}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

EmptyCells.parameters = {
  docs: {
    description: {
      story: "Table cells with null or empty values should instead display an em-dash (—).",
    },
  },
};

export const SelectableSimple = () => {
  const columns = getColumns();
  const data = useMemo(() => makeData(6), []);

  const actions = useMemo(() => range(3).map((i) => ({ label: `Option ${i + 1}` })), []);

  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="checkbox" />
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
            <HvTableCell variant="actions" />
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell variant="checkbox">
                <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell variant="actions">
                <HvDropDownMenu keepOpened={false} placement="left" dataList={actions} />
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SelectableSimple.parameters = {
  docs: {
    description: { story: "A table with checkboxes being managed by a simple hook." },
  },
};

export const TableRowClick = () => {
  const columns = useMemo(() => {
    const initialColumns = getColumns();
    initialColumns.push({
      Header: "Details",
      accessor: "link",
      Cell: (props) => {
        const { row } = props;
        const { original } = row;
        const { link } = original;

        return (
          <HvTypography variant="link" component="a" href={link}>
            Details Page
          </HvTypography>
        );
      },
    });

    return initialColumns;
  }, []);

  const data = useMemo(() => {
    const initialData = makeData(6);

    return initialData.map((row) => {
      const updatedRow = { ...row };
      updatedRow.link =
        "https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx";
      return updatedRow;
    });
  }, []);

  const onRowClicked = (row) => {
    const win = window.open(row.link, "_blank");
    win.focus();
  };

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow
              key={el.id}
              hover
              onClick={(e) => onRowClicked(el, e)}
              style={{ cursor: "pointer" }}
            >
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell>
                <HvTypography variant="link" component="a" href={el.link}>
                  Details Page
                </HvTypography>
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

TableRowClick.parameters = {
  docs: {
    description: { story: "A table example where you can click on a row." },
  },
};

export const NonTableLayout = () => {
  const useStyles = makeStyles((theme) => ({
    flexTable: {
      display: "flex",
      flexFlow: "column wrap",
    },
    flexRowGroup: {
      display: "flex",
      flexFlow: "column wrap",

      [theme.breakpoints.only("md")]: {
        "&:first-of-type": {
          position: "sticky",
          top: -1,
          zIndex: 3,
          backgroundColor: theme.palette.atmo1,
          borderBottom: `1px solid ${theme.palette.atmo4}`,
        },
      },
    },
    flexRow: {
      display: "flex",
      flexFlow: "row wrap",

      "&>*": {
        width: "calc(100% / 7)",

        display: "flex",
        alignItems: "center",

        [theme.breakpoints.down("md")]: {
          width: "calc(100% / 6)",
          height: 32,
          borderTop: "none",

          "&:first-of-type": {
            width: "100%",
            justifyContent: "center",
            backgroundColor: theme.palette.atmo1,
            borderTop: `1px solid ${theme.palette.atmo4}`,
          },
        },

        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
    },

    columnHeader: {
      display: "flex",
      alignItems: "start",
    },

    container: { minWidth: 200, maxHeight: 300 },
  }));

  const classes = useStyles();

  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(6), []);

  return (
    <HvTableContainer className={classes.container}>
      <HvTable component="div" className={classes.flexTable}>
        <HvTableHead className={classes.flexRowGroup}>
          <HvTableRow className={classes.flexRow}>
            {columns.map((el) => (
              <HvTableHeader key={el.Header} className={classes.columnHeader}>
                {el.Header}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody className={classes.flexRowGroup}>
          {data.map((el) => (
            <HvTableRow key={el.id} hover className={classes.flexRow}>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

NonTableLayout.parameters = {
  docs: {
    description: {
      story: "A table with non-table elements and a responsive layout (try resizing your browser).",
    },
  },
};

export const KitchenSinkSample = () => {
  return <KitchenSink />;
};

KitchenSinkSample.parameters = {
  docs: {
    description: {
      story: "A table with all features.",
    },
  },
};

export const TableWithIncludedChart = () => {
  const useStyles = makeStyles(() => ({
    container: { overflow: "hidden" },
  }));

  const classes = useStyles();

  const columns = useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Dealsize",
        accessor: "dealSize",
        align: "right",
      },
      {
        Header: "Sales",
        accessor: "sales",
        align: "right",
      },
      {
        Header: "Sales Growth",
        align: "right",
        cellType: "numeric",
        width: 170,
        minWidth: 170,
        maxWidth: 170,
        Cell: (cellData) => {
          const value = [
            [" ", " ", { role: "style" }],
            [
              " ",
              Number(cellData.row.original.salesGrowth),
              `color:${cellData.row.original.color}`,
            ],
          ];
          return (
            <div
              style={{
                display: "flex",
                minWidth: "170px",
                width: "170px",
                justifyContent: "flex-end",
                margin: "auto",
                marginRight: 0,
              }}
            >
              <div style={{ alignSelf: "center" }}>{`${cellData.row.original.salesGrowth}€`}</div>
              <div style={{ alignSelf: "center" }}>
                <Chart
                  width="55px"
                  height="30px"
                  chartType="BarChart"
                  loader={<div>Loading Chart</div>}
                  data={value}
                  options={{
                    legend: "none",
                    hAxis: {
                      minValue: 0,
                      maxValue: 1001,
                    },
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            </div>
          );
        },
      },
      {
        Header: "Order Number",
        accessor: "orderNumber",
        align: "right",
      },
    ],
    []
  );

  const data = [
    {
      id: 1,
      customer: "Blauer See Auto, Co.",
      dealSize: "Small",
      sales: "2871.0",
      salesGrowth: "925.7",
      orderNumber: "10100",
      color: "red",
    },
    {
      id: 2,
      customer: "Blauer See Auto, Co.",
      dealSize: "Small",
      sales: "2765.9",
      salesGrowth: "119.3",
      orderNumber: "10100",
      color: "orange",
    },
    {
      id: 3,
      customer: "Blauer See Auto, Co.",
      dealSize: "Medium",
      sales: "3884.3",
      salesGrowth: "94.7",
      orderNumber: "10101",
      color: "blue",
      checkboxProps: { disabled: true },
    },
    {
      id: 4,
      customer: "Online Diecast Creation",
      dealSize: "Medium",
      sales: "3746.7",
      salesGrowth: "30.2",
      orderNumber: "10102",
      color: "yellow",
    },
    {
      id: 5,
      customer: "Vitachrome Inc.",
      dealSize: "Small",
      sales: "5205.3",
      salesGrowth: "1000.6",
      orderNumber: "10102",
      color: "green",
      checkboxProps: { disabled: true },
    },
    {
      id: 6,
      customer: "Quartz co.",
      dealSize: "Big",
      sales: "7205.3",
      salesGrowth: "21670.6",
      orderNumber: "11234",
      color: "cyan",
    },
    {
      id: 7,
      customer: "Plumb inc.",
      dealSize: "small",
      sales: "105.3",
      salesGrowth: "1370.6",
      orderNumber: "114",
      color: "yellow",
    },
  ];

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable({
    columns,
    data,
  });

  return (
    <HvTableContainer className={classes.container}>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

TableWithIncludedChart.parameters = {
  docs: {
    description: { story: "A table example with a chart included for each row." },
  },
  eyes: {
    // waiting until external charts are rendered (issue #1792)
    waitBeforeScreenshot: "[id|=reactgooglegraph]",
  },
};

export const WithSecondaryActions = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name",
      },
      {
        Header: "Time",
        accessor: "createdDate",
      },
      {
        Header: "Event Type",
        accessor: "eventType",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Probability",
        accessor: "riskScore",
      },
      {
        Header: "Severity",
        accessor: "severity",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Asset",
        accessor: "link",
        Cell: (props) => {
          const { row } = props;
          const { original } = row;
          const { link } = original;

          return (
            <HvTypography variant="link" component="a" href={link.url}>
              {link.displayText}
            </HvTypography>
          );
        },
      },
      {
        accessor: "blank",
        variant: "actions",
        Cell: (props) => {
          const { row } = props;
          return (
            <HvDropDownMenu
              onClick={(e, item) => {
                alert(`${item.label} ${JSON.stringify(row.original)}`);
                console.log(item.label);
              }}
              dataList={[
                {
                  label: "Share",
                },
                {
                  label: "Hide",
                },
                {
                  label: "Remove",
                },
              ]}
            />
          );
        },
      },
    ],
    []
  );

  const data = [
    {
      pid: 14,
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
      pid: 13,
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
      pid: 12,
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
      pid: 11,
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
      pid: 10,
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
      pid: 8,
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
      pid: 7,
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
      pid: 6,
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
      pid: 5,
      name: "Event 9",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
      noActions: true,
    },
    {
      pid: 4,
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
      pid: 3,
      name: "Event 10",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Major",
      priority: "High",
      link: { displayText: "Asset 1", url: "blablabla" },
      noActions: true,
    },
    {
      pid: 2,
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
      pid: 1,
      name: "Event 12",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
      noActions: true,
    },
  ];

  const { getTableProps, getTableBodyProps, prepareRow, headers, rows } = useHvTable({
    columns,
    data,
  });

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            {headers.map((col) => (
              <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

WithSecondaryActions.parameters = {
  docs: {
    description: { story: "A table example with secondary actions." },
  },
};
