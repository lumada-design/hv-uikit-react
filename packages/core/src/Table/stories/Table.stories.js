import { Delete, Fail, Lock, Preview } from "@hv/uikit-react-icons";
import { makeStyles } from "@material-ui/core/styles";
import orderBy from "lodash/orderBy";
import React, { useState } from "react";
import Chart from "react-google-charts";

import { HvEmptyState, HvTable, HvButton } from "../..";

/* eslint-disable no-underscore-dangle */

export default {
  title: "Visualizations/Table",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTable } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.2.1",
  },
  component: HvTable,
};

export const Main = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
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

  return (
    <div style={{ padding: "10px" }}>
      <HvTable
        data={data}
        id="test"
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export const Empty = () => {
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

  const [pageSize, setPageSize] = useState(0);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div style={{ padding: "10px" }}>
      <HvTable
        data={[]}
        id="test"
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

Empty.parameters = {
  docs: {
    description: { story: "Table sample without data." },
  },
};

export const CustomEmpty = () => {
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

  const [pageSize, setPageSize] = useState(0);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const NoDataComponent = () => {
    const useStyles = makeStyles({
      root: {
        padding: "30px",
      },
    });
    const classes = useStyles();
    return (
      <HvEmptyState
        id="emptyState"
        className={classes.root}
        message="No data to display."
        icon={<Fail iconSize="M" color="sema14" role="presentation" />}
      />
    );
  };

  return (
    <div style={{ padding: "10px" }}>
      <HvTable
        data={[]}
        id="test"
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
        noDataComponent={<NoDataComponent />}
      />
    </div>
  );
};

CustomEmpty.parameters = {
  docs: {
    description: { story: "Table sample without data." },
  },
};

export const WithExpander = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
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

  const subElementTemplate = (row) => (
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

  return (
    <div>
      <HvTable
        id="table"
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        subElementTemplate={subElementTemplate}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

WithExpander.parameters = {
  docs: {
    description: { story: "Table sample that shows the ability to add an expander." },
  },
};

export const WithExpanderAndCustomContent = () => {
  const data = [
    {
      id: 1,
      dataCenter: "Bob Route",
      storageSegment: "Open systems",
      storageArray: 3,

      averageCompression: 1.62,
      totalIOPS: 18649,
      totalThroughput: 1963.28,
      averageServiceTime: 1.2,
      averageReadTime: 1.83,
    },
    {
      id: 2,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.7,
      totalIOPS: 8652,
      totalThroughput: 1013.01,
      averageServiceTime: 5.16,
      averageReadTime: 1.45,
    },
    {
      id: 4,
      dataCenter: "Chris1",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
    {
      id: 5,
      dataCenter: "Jeans Data Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
    {
      id: 6,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
    {
      id: 7,
      dataCenter: "Bob Route",
      storageSegment: "Open systems",
      storageArray: 3,

      averageCompression: 1.62,
      totalIOPS: 18649,
      totalThroughput: 1963.28,
      averageServiceTime: 1.2,
      averageReadTime: 1.83,
    },
    {
      id: 8,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.7,
      totalIOPS: 8652,
      totalThroughput: 1013.01,
      averageServiceTime: 5.16,
      averageReadTime: 1.45,
    },
    {
      id: 9,
      dataCenter: "Chris1",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
    {
      id: 10,
      dataCenter: "Jeans Data Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
    {
      id: 11,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,

      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05,
    },
  ];

  const getColumns = () => [
    {
      headerText: "Data Center",
      accessor: "dataCenter",
      cellType: "alpha-numeric",
    },
    {
      headerText: "Storage segment",
      width: 120,
      accessor: "storageSegment",
      cellType: "alpha-numeric",
    },
    {
      headerText: "Storage array",
      accessor: "storageArray",
      cellType: "numeric",
    },
    {
      headerText: "Average compression rt",
      accessor: "averageCompression",
      minWidth: 150,
      cellType: "numeric",
      Cell: (cellData) => `${cellData.row._original.averageCompression}:1`,
    },
    {
      headerText: "Total IOPS",
      accessor: "totalIOPS",
      cellType: "numeric",
      Cell: (cellData) => cellData.row._original.totalIOPS.toLocaleString("en-US"),
    },
    {
      headerText: "Total throughput",
      accessor: "totalThroughput",
      minWidth: 130,
      cellType: "numeric",
      Cell: (cellData) => `${cellData.row._original.totalThroughput.toLocaleString("en-US")} MB/s`,
    },
    {
      headerText: "Average service time",
      accessor: "averageServiceTime",
      minWidth: 130,
      cellType: "numeric",
      Cell: (cellData) => `${cellData.row._original.averageServiceTime} ms`,
    },
    {
      headerText: "Average read time",
      accessor: "averageReadTime",
      minWidth: 130,
      cellType: "numeric",
      Cell: (cellData) => `${cellData.row._original.averageReadTime} ms`,
    },
  ];

  const defaultSorted = [{ id: "name", desc: true }];

  const subElementTemplate = () => (
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
  );

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        resizable={false}
        defaultSorted={defaultSorted}
        subElementTemplate={subElementTemplate}
      />
    </div>
  );
};

WithExpanderAndCustomContent.parameters = {
  docs: {
    description: {
      story: "Table sample that shows the ability to add a complex expander and custom cell.",
    },
  },
};

export const WithCheckbox = () => {
  const initialData = [
    {
      pid: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
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

  const [data, setData] = useState(initialData);
  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const actions = [
    { id: "delete", label: "Delete", icon: <Delete /> },
    { id: "lock", label: "Lock", icon: <Lock /> },
    { id: "put", label: "Preview", icon: <Preview /> },
  ];

  const handleAction = (event, id, action, selection = []) => {
    switch (action.id) {
      case "delete":
        setData(data.filter((el) => !selection.includes(el.pid)));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <HvTable
        id="table"
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
        idForCheckbox="pid"
        actions={actions}
        actionsCallback={handleAction}
        maxVisibleActions={1}
      />
    </div>
  );
};

WithCheckbox.parameters = {
  docs: {
    description: { story: "Table sample that shows the ability to add checkboxes." },
  },
};

export const WithCheckboxCustomContent = () => {
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

  const getColumns = () => [
    {
      headerText: "Customer",
      accessor: "customer",
      cellType: "alpha-numeric",
    },
    {
      headerText: "Dealsize",
      accessor: "dealSize",
      cellType: "numeric",
    },
    {
      headerText: "Sales",
      accessor: "sales",
      cellType: "numeric",
    },
    {
      headerText: "Sales Growth",
      cellType: "numeric",
      minWidth: 170,
      Cell: (cellData) => {
        const value = [
          [" ", " ", { role: "style" }],
          [
            " ",
            Number(cellData.row._original.salesGrowth),
            `color:${cellData.row._original.color}`,
          ],
        ];
        return (
          <div style={{ display: "flex" }}>
            <div style={{ alignSelf: "center" }}>{`${cellData.row._original.salesGrowth}€`}</div>
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
      headerText: "Order Number",
      accessor: "orderNumber",
      cellType: "numeric",
    },
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={5}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        resizable={false}
        defaultSorted={defaultSorted}
        selections={[1, 3]}
        idForCheckbox="id"
      />
    </div>
  );
};

WithCheckboxCustomContent.parameters = {
  docs: {
    description: { story: "Table sample that shows the ability to add use a checkbox." },
  },
  eyes: {
    // waiting until external charts are rendered (issue #1792)
    waitBeforeScreenshot: "[id|=reactgooglegraph]",
  },
};

export const WithCheckboxAndSecondaryActions = () => {
  const data = [
    {
      pid: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
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
      fixed: "left",
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
      sortable: false,
    },
  ];
  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div>
      <HvTable
        id="table"
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
        idForCheckbox="pid"
        secondaryActions={[
          {
            label: "Share",
            action: (event, value) => {
              alert(`Sharing ${JSON.stringify(value)}`);
            },
          },
          {
            label: "Hide",
            action: (event, value) => {
              alert(`Hiding ${JSON.stringify(value)}`);
            },
          },
          {
            label: "Remove",
            action: (event, value) => {
              alert(`Removing ${JSON.stringify(value)}`);
            },
          },
        ]}
      />
    </div>
  );
};

WithCheckboxAndSecondaryActions.parameters = {
  docs: {
    description: { story: "Table sample that shows the ability to add a secondary action column." },
  },
};

export const WithNullValues = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ssssssssssssssssssssssssssssssssssssssssssssssssssss",
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
      riskScore: null,
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
      riskScore: null,
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
      createdDate: null,
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
      createdDate: null,
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
      createdDate: null,
      eventType: "Anomaly detection",
      status: "Open",
      riskScore: "98",
      severity: "Critical",
      priority: null,
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 4,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: null,
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
      status: null,
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
      severity: null,
      priority: "Critical",
      link: { displayText: "Asset 1", url: "blablabla" },
    },
    {
      id: 1,
      name: "Event 12",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: null,
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
      fixed: "left",
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
      sortable: false,
    },
  ];
  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div>
      <HvTable
        id="table"
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

WithNullValues.parameters = {
  docs: {
    description: { story: "Table sample with that has cell values that are null." },
  },
};

export const TableWithChangingData = () => {
  // Table data manipulation
  const initialData = [
    { id: 1, name: "Aaron", surname: "Melantha", email: "melantha@mail.com" },
    { id: 2, name: "Jeanette", surname: "Gentle", email: "gentle@mail.com" },
    { id: 3, name: "Michael", surname: "Neil", email: "neil@mail.com" },
    { id: 4, name: "Walter", surname: "Allegro", email: "allegro@mail.com" },
    { id: 5, name: "James", surname: "Jonah", email: "allegro@mail.com" },
    { id: 6, name: "Mary", surname: "Monroe", email: "monroe@mail.com" },
    { id: 7, name: "Katherine", surname: "Kubrick", email: "kubrick@mail.com" },
    { id: 8, name: "Peter", surname: "Portland", email: "portland@mail.com" },
    { id: 9, name: "Yuri", surname: "York", email: "york@mail.com" },
    { id: 10, name: "Howard", surname: "Holmes", email: "holmes@mail.com" },
  ];

  const [enabledUsers, setEnabledUsers] = useState(initialData.slice(0, 5));
  const [disabledUsers, setDisabledUsers] = useState(initialData.slice(5));

  // Table columns
  const getColumns = () => [
    {
      headerText: "ID",
      accessor: "id",
      cellType: "alpha-numeric",
      width: 50,
    },
    {
      headerText: "Name",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left",
    },
    {
      headerText: "Surname",
      accessor: "surname",
      cellType: "alpha-numeric",
      fixed: "left",
    },
    {
      headerText: "Email",
      accessor: "email",
      cellType: "alpha-numeric",
      fixed: "left",
    },
  ];

  const handleBulkDisable = (event, id, action, selection = []) => {
    const elementsToMove = initialData.filter((el) => selection.includes(el.id));
    setDisabledUsers([...disabledUsers, ...elementsToMove]);
    setEnabledUsers(enabledUsers.filter((el) => !selection.includes(el.id)));
  };
  const handleBulkEnable = (event, id, action, selection) => {
    const elementsToMove = initialData.filter((el) => selection.includes(el.id));
    setEnabledUsers([...enabledUsers, ...elementsToMove]);
    setDisabledUsers(disabledUsers.filter((el) => !selection.includes(el.id)));
  };

  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "space-evenly",
      "&>*": {
        flexGrow: 1,
        margin: 20,
      },
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <HvTable
        id="table1"
        data={enabledUsers}
        columns={getColumns()}
        defaultSorted={[{ id: "id" }]}
        idForCheckbox="id"
        actions={[{ id: "disable", label: "Disable" }]}
        actionsCallback={handleBulkDisable}
        secondaryActions={[
          {
            label: "Disable",
            action: (event, row) => handleBulkDisable(null, null, null, [row.id]),
          },
        ]}
        labels={{ titleText: "Enabled users" }}
      />
      <HvTable
        id="table2"
        data={disabledUsers}
        columns={getColumns()}
        defaultSorted={[{ id: "id" }]}
        idForCheckbox="id"
        actions={[{ id: "enable", label: "Enable" }]}
        actionsCallback={handleBulkEnable}
        secondaryActions={[
          {
            label: "Enable",
            action: (event, row) => handleBulkEnable(null, null, null, [row.id]),
          },
        ]}
        labels={{ titleText: "Disabled users" }}
      />
    </div>
  );
};

TableWithChangingData.parameters = {
  docs: {
    description: { story: "Sample showcasing the table component behavior with changing data." },
  },
};

export const TableWithGrowingDataAndNoPagination = () => {
  const initialData = [
    {
      number: 1,
      description: "Event 1",
    },
    {
      number: 2,
      description: "Event 2",
    },
    {
      number: 3,
      description: "Event 3",
    },
    {
      number: 4,
      description: "Event 4",
    },
  ];

  const getColumns = () => [
    {
      headerText: "Number",
      accessor: "number",
      cellType: "numeric",
      width: 100,
    },
    {
      headerText: "Description",
      accessor: "name",
      cellType: "alpha-numeric",
    },
  ];

  const [data, setData] = useState(initialData);

  const createEvent = (number) => ({ number, description: `Event ${number}` });

  const addEvent = () => {
    setData(data.concat(createEvent(data.length + 1)));
  };

  const onPageSizeChange = (newPageSize) => {
    console.log(`onPageSizeChange: ${newPageSize}`);
  };

  return (
    <div>
      <HvButton onClick={addEvent}>Add row</HvButton>
      <p>&nbsp;</p>
      <HvTable
        id="table"
        data={data}
        columns={getColumns()}
        resizable={false}
        showPagination={false}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export const ServerSidePagination = () => {
  const start = new Date(2001, 0);
  const end = new Date(2020, 0);

  const getRand = (id) => (Math.abs(Math.sin(id)) * 10 ** 4) % 1;
  const getRandom = (id = 0, max = 100, min = 1) => {
    const r = getRand(id);
    return Math.floor(r * (max - min)) + min;
  };

  const randomDate = (id = 0) => new Date(getRandom(id, end.getTime(), start.getTime()));

  const newEntry = (value, i) => {
    const status = getRand(i);
    const severity = getRand(i + 1);
    const priority = getRand(i + 2);
    const id = i;
    return {
      id,
      name: `Event ${id}`,
      createdDate: randomDate(id).toDateString(),
      status: (status > 0.66 && "Open") || (status > 0.33 && "Pending") || "Closed",
      riskScore: getRandom(id),
      severity: (severity > 0.66 && "Critical") || (severity > 0.33 && "Moderate") || "Low",
      priority: (priority > 0.66 && "Critical") || (priority > 0.33 && "Moderate") || "Low",
    };
  };

  const makeData = (len = 553) => Array.from(Array(len), newEntry);

  let serverData = makeData();

  const requestData = (pageSize, cursor, sorted) => {
    return new Promise((resolve) => {
      // You can retrieve your data however you want, in this case, we will just use some local data.
      const filteredData = serverData;
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = orderBy(
        filteredData,
        sorted.map((sort) => {
          return (row) => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string" ? row[sort.id].toLowerCase() : row[sort.id];
          };
        }),
        sorted.map((d) => (d.desc ? "desc" : "asc"))
      );
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      const res = {
        cursor,
        rows: sortedData.slice(Number(cursor), Number(cursor) + pageSize),
        pages: Math.ceil(filteredData.length / pageSize),
        dataSize: sortedData.length,
      };
      // Here we'll simulate a server response with 500ms of delay.
      setTimeout(() => resolve(res), 500);
    });
  };

  class Sample extends React.Component {
    /* eslint-disable react/no-this-in-sfc */
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        pages: null,
        cursor: undefined,
        sorted: [{ id: "name", desc: true }],
        dataSize: 10,
        pageSize: 10,
      };
      this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
      const { pageSize, sorted } = this.state;
      this.fetchData(0, pageSize, sorted);
    }

    getColumns = () => [
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
    ];

    onPageSizeChange = (newPageSize) => {
      this.setState({
        pageSize: newPageSize,
      });
    };

    handleAction = (event, id, action, selection = []) => {
      const { pageSize, cursor, sorted } = this.state;
      serverData = serverData.filter((el) => !selection.includes(el.id));
      this.fetchData(cursor, pageSize, sorted);
    };

    fetchData(cursor, pageSize, sorted) {
      // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
      // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
      // Request the data however you want.  Here, we'll use our mocked service we created earlier
      requestData(pageSize, cursor, sorted).then((res) => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          cursor: res.cursor,
          data: res.rows,
          pages: res.pages,
          dataSize: res.dataSize,
        });
      });
    }

    render() {
      const { pages, pageSize, dataSize, sorted, data } = this.state;

      return (
        <HvTable
          id="test"
          idForCheckbox="id"
          data={data}
          actions={[{ id: "delete", label: "Delete", icon: <Delete /> }]}
          actionsCallback={this.handleAction}
          columns={this.getColumns()}
          defaultPageSize={10}
          dataSize={dataSize}
          pageSize={pageSize}
          pages={pages}
          resizable={false}
          defaultSorted={sorted}
          onPageSizeChange={this.onPageSizeChange}
          paginationServerSide
          onFetchData={this.fetchData} // Request new data when things change
        />
      );
    }
  }

  return <Sample />;
};

ServerSidePagination.parameters = {
  docs: {
    description: {
      story:
        "Table sample that shows how to use the table with server side pagination. Bulk Actions",
    },
  },
  eyes: {
    waitBeforeScreenshot: "div[role=cell][id*='createdDate']",
  },
};

export const ConditionalPaginationDisplay = () => {
  const data = [
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

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        resizable={false}
        showPagination={false}
      />
    </div>
  );
};

ConditionalPaginationDisplay.parameters = {
  docs: {
    description: {
      story:
        "Table pagination control conditionally displayed. In this case, when there are not enough records for multiple pages, Pagination can be disabled",
    },
  },
};

export const TableDataDeletion = () => {
  // Table data manipulation
  const initialData = [
    { id: 1, name: "Aaron", surname: "Melantha", email: "melantha@mail.com" },
    { id: 2, name: "Jeanette", surname: "Gentle", email: "gentle@mail.com" },
    { id: 3, name: "Michael", surname: "Neil", email: "neil@mail.com" },
    { id: 4, name: "Walter", surname: "Allegro", email: "allegro@mail.com" },
    { id: 5, name: "James", surname: "Jonah", email: "allegro@mail.com" },
    { id: 6, name: "Mary", surname: "Monroe", email: "monroe@mail.com" },
    { id: 7, name: "Katherine", surname: "Kubrick", email: "kubrick@mail.com" },
    { id: 8, name: "Peter", surname: "Portland", email: "portland@mail.com" },
    { id: 9, name: "Yuri", surname: "York", email: "york@mail.com" },
    { id: 10, name: "Howard", surname: "Holmes", email: "holmes@mail.com" },
  ];

  const [enabledUsers, setEnabledUsers] = useState(initialData.slice(0, 5));
  const [disabledUsers, setDisabledUsers] = useState(initialData.slice(5));

  // Table columns
  const getColumns = () => [
    {
      headerText: "ID",
      accessor: "id",
      cellType: "alpha-numeric",
      width: 50,
    },
    {
      headerText: "Name",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left",
    },
    {
      headerText: "Surname",
      accessor: "surname",
      cellType: "alpha-numeric",
      fixed: "left",
    },
    {
      headerText: "Email",
      accessor: "email",
      cellType: "alpha-numeric",
      fixed: "left",
    },
  ];

  const handleBulkDisable = (event, id, action, selection = []) => {
    const elementsToMove = initialData.filter((el) => selection.includes(el.id));
    setDisabledUsers([...disabledUsers, ...elementsToMove]);
    setEnabledUsers(enabledUsers.filter((el) => !selection.includes(el.id)));
  };

  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "space-evenly",
      "&>*": {
        flexGrow: 1,
        margin: 20,
      },
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <HvTable
        id="table1"
        data={enabledUsers}
        columns={getColumns()}
        defaultSorted={[{ id: "id" }]}
        idForCheckbox="id"
        actions={[{ id: "disable", label: "Disable" }]}
        actionsCallback={handleBulkDisable}
        secondaryActions={[
          {
            label: "Delete",
            action: (event, row) => handleBulkDisable(null, null, null, [row.id]),
          },
        ]}
        labels={{ titleText: "Enabled users" }}
      />
    </div>
  );
};

TableDataDeletion.parameters = {
  docs: {
    description: { story: "Sample showcasing data deletion with transition to empty state." },
  },
};
