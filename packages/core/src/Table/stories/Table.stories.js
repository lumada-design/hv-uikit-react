import React, { useState } from "react";
import moment from "moment";
import Chart from "react-google-charts";
import orderBy from "lodash/orderBy";
import { HvTable } from "../..";

export default {
  title: "Visualizations/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hv/uikit-react-core/dist'",
    docs: {
      inlineStories: false
    }
  },
  component: HvTable
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
      subElementTitle2: "cell_2"
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 3", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
    }
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
      sortable: false
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      fixed: "right",
      sortable: false
    }
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
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
        labels={labels}
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
      sortable: false
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      fixed: "right",
      sortable: false
    }
  ];

  const [pageSize, setPageSize] = useState(0);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
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
        labels={labels}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

Empty.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample without data.",
      inlineStories: false
    }
  }
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
      subElementTitle2: "cell_2"
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 3", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
    }
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
      sortable: false
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      fixed: "right",
      sortable: false
    }
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
  };

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

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        labels={labels}
        subElementTemplate={subElementTemplate}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

WithExpander.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample that shows the ability to add an expander.",
      inlineStories: false
    }
  }
};

export const WithExpanderAndCustomContent = () => {
  const data = [
    {
      id: 1,
      dataCenter: "Bob Route",
      storageSegment: "Open systems",
      storageArray: 3,
      allocateVsCapability: 2.5,
      averageCompression: 1.62,
      totalIOPS: 18649,
      totalThroughput: 1963.28,
      averageServiceTime: 1.2,
      averageReadTime: 1.83
    },
    {
      id: 2,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2.5,
      averageCompression: 1.7,
      totalIOPS: 8652,
      totalThroughput: 1013.01,
      averageServiceTime: 5.16,
      averageReadTime: 1.45
    },
    {
      id: 4,
      dataCenter: "Chris1",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    },
    {
      id: 5,
      dataCenter: "Jeans Data Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    },
    {
      id: 6,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    },
    {
      id: 7,
      dataCenter: "Bob Route",
      storageSegment: "Open systems",
      storageArray: 3,
      allocateVsCapability: 2.5,
      averageCompression: 1.62,
      totalIOPS: 18649,
      totalThroughput: 1963.28,
      averageServiceTime: 1.2,
      averageReadTime: 1.83
    },
    {
      id: 8,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2.5,
      averageCompression: 1.7,
      totalIOPS: 8652,
      totalThroughput: 1013.01,
      averageServiceTime: 5.16,
      averageReadTime: 1.45
    },
    {
      id: 9,
      dataCenter: "Chris1",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    },
    {
      id: 10,
      dataCenter: "Jeans Data Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    },
    {
      id: 11,
      dataCenter: "Captain America Route",
      storageSegment: "Tandem",
      storageArray: 3,
      allocateVsCapability: 2,
      averageCompression: 1.91,
      totalIOPS: 10459,
      totalThroughput: 923.65,
      averageServiceTime: 1.38,
      averageReadTime: 1.05
    }
  ];

  const getColumns = () => [
    {
      headerText: "Data Center",
      accessor: "dataCenter",
      cellType: "alpha-numeric"
    },
    {
      headerText: "Storage segment",
      width: 120,
      accessor: "storageSegment",
      cellType: "alpha-numeric"
    },
    {
      headerText: "Storage array",
      accessor: "storageArray",
      cellType: "numeric"
    },
    {
      headerText: "Allocated vs avail.capability",
      cellType: "numeric",
      minWidth: 140,
      Cell: cellData => {
        const value = [
          [" ", " ", { role: "style" }],
          // eslint-disable-next-line no-underscore-dangle
          [" ", Number(cellData.row._original.allocateVsCapability), "color:black"]
        ];
        return (
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "5px", alignSelf: "center" }}>
              {/* eslint-disable-next-line no-underscore-dangle */}
              {cellData.row._original.allocateVsCapability}
              /1 TB
            </div>
            <Chart
              width="80px"
              height="30px"
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={value}
              options={{
                legend: "none",
                hAxis: {
                  minValue: 0,
                  maxValue: 3
                },
                backgroundColor: "transparent"
              }}
            />
          </div>
        );
      }
    },
    {
      headerText: "Average compression rt",
      accessor: "averageCompression",
      minWidth: 150,
      cellType: "numeric",
      // eslint-disable-next-line no-underscore-dangle
      Cell: cellData => `${cellData.row._original.averageCompression}:1`
    },
    {
      headerText: "Total IOPS",
      accessor: "totalIOPS",
      cellType: "numeric",
      // eslint-disable-next-line no-underscore-dangle
      Cell: cellData => cellData.row._original.totalIOPS.toLocaleString("en-US")
    },
    {
      headerText: "Total throughput",
      accessor: "totalThroughput",
      minWidth: 130,
      cellType: "numeric",
      // eslint-disable-next-line no-underscore-dangle
      Cell: cellData => `${cellData.row._original.totalThroughput.toLocaleString("en-US")} MB/s`
    },
    {
      headerText: "Average service time",
      accessor: "averageServiceTime",
      minWidth: 130,
      cellType: "numeric",
      // eslint-disable-next-line no-underscore-dangle
      Cell: cellData => `${cellData.row._original.averageServiceTime} ms`
    },
    {
      headerText: "Average read time",
      accessor: "averageReadTime",
      minWidth: 130,
      cellType: "numeric",
      // eslint-disable-next-line no-underscore-dangle
      Cell: cellData => `${cellData.row._original.averageReadTime} ms`
    }
  ];

  const defaultSorted = [{ id: "name", desc: true }];

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
  };

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
        labels={labels}
        subElementTemplate={subElementTemplate}
      />
    </div>
  );
};

WithExpanderAndCustomContent.story = {
  parameters: {
    docs: {
      storyDescription:
        "Table sample that shows the ability to add a complex expander and custom cell.",
      inlineStories: false
    }
  }
};

export const WithCheckbox = () => {
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
      subElementTitle2: "cell_2"
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 3", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
    }
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      fixed: "right",
      sortable: false
    }
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
  };

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        labels={labels}
        onPageSizeChange={onPageSizeChange}
        idForCheckbox="id"
      />
    </div>
  );
};

WithCheckbox.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample that shows the ability to add an expander.",
      inlineStories: false
    }
  }
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
      color: "red"
    },
    {
      id: 2,
      customer: "Blauer See Auto, Co.",
      dealSize: "Small",
      sales: "2765.9",
      salesGrowth: "119.3",
      orderNumber: "10100",
      color: "orange"
    },
    {
      id: 3,
      customer: "Blauer See Auto, Co.",
      dealSize: "Medium",
      sales: "3884.3",
      salesGrowth: "94.7",
      orderNumber: "10101",
      color: "blue"
    },
    {
      id: 4,
      customer: "Online Diecast Creation",
      dealSize: "Medium",
      sales: "3746.7",
      salesGrowth: "30.2",
      orderNumber: "10102",
      color: "yellow"
    },
    {
      id: 5,
      customer: "Vitachrome Inc.",
      dealSize: "Small",
      sales: "5205.3",
      salesGrowth: "1000.6",
      orderNumber: "10102",
      color: "green"
    }
  ];

  const getColumns = () => [
    {
      headerText: "Customer",
      accessor: "customer",
      cellType: "alpha-numeric"
    },
    {
      headerText: "Dealsize",
      accessor: "dealSize",
      cellType: "numeric"
    },
    {
      headerText: "Sales",
      accessor: "sales",
      cellType: "numeric"
    },
    {
      headerText: "Sales Growth",
      cellType: "numeric",
      minWidth: 170,
      Cell: cellData => {
        const value = [
          [" ", " ", { role: "style" }],
          // eslint-disable-next-line no-underscore-dangle
          [" ", Number(cellData.row._original.salesGrowth), `color:${cellData.row._original.color}`]
        ];
        return (
          <div style={{ display: "flex" }}>
            <div style={{ alignSelf: "center" }}>
              {/* eslint-disable-next-line no-underscore-dangle */}
              {`${cellData.row._original.salesGrowth}€`}
            </div>
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
                    maxValue: 1001
                  },
                  backgroundColor: "transparent"
                }}
              />
            </div>
          </div>
        );
      }
    },
    {
      headerText: "Order Number",
      accessor: "orderNumber",
      cellType: "numeric"
    }
  ];

  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "Sales overview",
    subtitleText: "Click on a row to see store details"
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
        labels={labels}
        idForCheckbox="id"
      />
    </div>
  );
};

WithCheckboxCustomContent.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample that shows the ability to add use a checkbox.",
      inlineStories: false
    }
  }
};

export const WithCheckboxAndSecondaryActions = () => {
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
      subElementTitle2: "cell_2"
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 3", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      noActions: true
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      noActions: true
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      noActions: true
    }
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric",
      fixed: "left"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      sortable: false
    }
  ];
  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
  };

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        labels={labels}
        onPageSizeChange={onPageSizeChange}
        idForCheckbox="id"
        secondaryActions={[
          {
            label: "Share",
            action: (event, value) => {
              alert(`Sharing ${JSON.stringify(value)}`);
            }
          },
          {
            label: "Hide",
            action: (event, value) => {
              alert(`Hiding ${JSON.stringify(value)}`);
            }
          },
          {
            label: "Remove",
            action: (event, value) => {
              alert(`Removing ${JSON.stringify(value)}`);
            }
          }
        ]}
      />
    </div>
  );
};

WithCheckboxAndSecondaryActions.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample that shows the ability to add a secondary action column.",
      inlineStories: false
    }
  }
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
      subElementTitle2: "cell_2"
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 3", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 2", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
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
      link: { displayText: "Asset 1", url: "blablabla" }
    }
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
      }
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric",
      fixed: "left"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Probability",
      accessor: "riskScore",
      format: value => `${value.original.riskScore}%`,
      cellType: "numeric"
    },
    {
      headerText: "Severity",
      accessor: "severity",
      format: value => value.original.severity.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Priority",
      accessor: "priority",
      format: value => value.original.priority.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Asset",
      accessor: "asset",
      cellType: "link",
      sortable: false
    }
  ];
  const [pageSize, setPageSize] = useState(10);
  const defaultSorted = [{ id: "name", desc: true }];

  const onPageSizeChange = newPageSize => {
    setPageSize(newPageSize);
  };

  const labels = {
    titleText: "This is a Title",
    subtitleText: "This is a Subtitle"
  };

  return (
    <div>
      <HvTable
        data={data}
        columns={getColumns()}
        defaultPageSize={10}
        pageSize={pageSize}
        resizable={false}
        defaultSorted={defaultSorted}
        labels={labels}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

WithNullValues.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample with that has cell values that are null.",
      inlineStories: false
    }
  }
};

export const ServerSidePagination = () => {
  const start = new Date(2001, 0, 1);
  const end = new Date();
  const randomDate = () =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const newEvent = () => {
    const statusChance = Math.random();
    const severityChance = Math.random();
    const priorityChance = Math.random();
    const eventNumber = Math.floor(Math.random() * 10000);
    return {
      id: eventNumber,
      name: `Event ${eventNumber}`,
      createdDate: randomDate(),
      // eslint-disable-next-line no-nested-ternary
      status: statusChance > 0.66 ? "Open" : statusChance > 0.33 ? "Pending" : "Closed",
      riskScore: `${Math.floor(Math.random() * 100)}`,
      // eslint-disable-next-line no-nested-ternary
      severity: severityChance > 0.66 ? "Critical" : severityChance > 0.33 ? "Moderate" : "Low",
      // eslint-disable-next-line no-nested-ternary
      priority: priorityChance > 0.66 ? "Critical" : priorityChance > 0.33 ? "Moderate" : "Low"
    };
  };

  const range = len => {
    const arr = [];
    for (let i = 0; i < len; i += 1) {
      arr.push(i);
    }
    return arr;
  };

  const makeData = (len = 5553) => {
    return range(len).map(() => {
      return {
        ...newEvent(),
        children: range(10).map(newEvent)
      };
    });
  };

  const rawData = makeData();
  const requestData = (pageSize, cursor, sorted) => {
    console.log("Fetch data: sorted -> ", JSON.stringify(sorted));
    console.log("Fetch data: pageSize -> ", JSON.stringify(pageSize));
    console.log("Fetch data: cursor -> ", JSON.stringify(cursor));
    return new Promise(resolve => {
      // You can retrieve your data however you want, in this case, we will just use some local data.
      const filteredData = rawData;
      // You can also use the sorting in your request, but again, you are responsible for applying it.
      const sortedData = orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string" ? row[sort.id].toLowerCase() : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
      // You must return an object containing the rows of the current page, and optionally the total pages number.
      const res = {
        rows: sortedData.slice(Number(cursor), Number(cursor) + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
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
        sorted: [{ id: "name", desc: true }],
        pageSize: 10
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
        }
      },
      {
        headerText: "Time",
        accessor: "createdDate",
        format: value => moment(value.original.createdDate).format("MM/DD/YYYY"),
        cellType: "numeric"
      },
      {
        headerText: "Status",
        accessor: "status",
        format: value => value.original.status.toLowerCase(),
        style: { textTransform: "capitalize" },
        cellType: "alpha-numeric"
      },
      {
        headerText: "Probability",
        accessor: "riskScore",
        format: value => `${value.original.riskScore}%`,
        cellType: "numeric"
      },
      {
        headerText: "Severity",
        accessor: "severity",
        format: value => value.original.severity.toLowerCase(),
        style: { textTransform: "capitalize" },
        cellType: "alpha-numeric",
        sortable: false
      },
      {
        headerText: "Priority",
        accessor: "priority",
        format: value => value.original.priority.toLowerCase(),
        style: { textTransform: "capitalize" },
        cellType: "alpha-numeric"
      }
    ];

    onPageSizeChange = newPageSize => {
      this.setState({
        pageSize: newPageSize
      });
    };

    fetchData(cursor, pageSize, sorted) {
      // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
      // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
      // Request the data however you want.  Here, we'll use our mocked service we created earlier
      requestData(pageSize, cursor, sorted).then(res => {
        // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
        this.setState({
          data: res.rows,
          pages: res.pages
        });
      });
    }

    render() {
      const { pages, pageSize, sorted, data } = this.state;
      const labels = {
        titleText: "This is a Title",
        subtitleText: "This is a Subtitle"
      };
      return (
        <HvTable
          data={data}
          id="test"
          columns={this.getColumns()}
          defaultPageSize={10}
          pageSize={pageSize}
          pages={pages}
          resizable={false}
          defaultSorted={sorted}
          labels={labels}
          onPageSizeChange={this.onPageSizeChange}
          paginationServerSide
          onFetchData={this.fetchData} // Request new data when things change
        />
      );
    }
  }

  return <Sample />;
};

ServerSidePagination.story = {
  parameters: {
    docs: {
      storyDescription: "Table sample that shows how to use the table with server side pagination.",
      inlineStories: false
    }
  }
};
