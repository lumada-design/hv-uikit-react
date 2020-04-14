import React from "react";
import moment from "moment";
import HvTable from "@hv/uikit-react-core/dist/Table";
import orderBy from "lodash/orderBy";

/* eslint-disable */

const start = new Date(2001, 0, 1);
const end = new Date();
function randomDate() {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};
function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newEvent(),
      children: range(10).map(newEvent)
    };
  });
}
const newEvent = () => {
  const statusChance = Math.random();
  const severityChance = Math.random();
  const priorityChance = Math.random();
  const eventNumber = Math.floor(Math.random() * 10000);
  return {
    id: eventNumber,
    name: `Event ${eventNumber}`,
    createdDate: randomDate(),
    status: statusChance > 0.66 ? "Open" : statusChance > 0.33 ? "Pending" : "Closed",
    riskScore: `${Math.floor(Math.random() * 100)}`,
    severity: severityChance > 0.66 ? "Critical" : severityChance > 0.33 ? "Moderate" : "Low",
    priority: priorityChance > 0.66 ? "Critical" : priorityChance > 0.33 ? "Moderate" : "Low"
  };
};
const rawData = makeData();
const requestData = (pageSize, cursor, sorted) => {
  console.log("Fetch data: sorted -> ", JSON.stringify(sorted));
  console.log("Fetch data: pageSize -> ", JSON.stringify(pageSize));
  console.log("Fetch data: cursor -> ", JSON.stringify(cursor));
  return new Promise((resolve, reject) => {
    // You can retrieve your data however you want, in this case, we will just use some local data.
    let filteredData = rawData;
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
      rows: sortedData.slice(parseInt(cursor), parseInt(cursor) + pageSize),
      pages: Math.ceil(filteredData.length / pageSize)
    };
    // Here we'll simulate a server response with 500ms of delay.
    setTimeout(() => resolve(res), 500);
  });
};
class Wrapper extends React.Component {
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
    this.fetchData(0, this.state.pageSize, this.state.sorted);
  }
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
  render() {
    const { pages, pageSize, sorted, data, titleText, subtitleText } = this.state;
    const labels = {
      titleText: "This is a title",
      subtitleText: "This is a subtitle"
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
        paginationServerSide={true}
        onFetchData={this.fetchData} // Request new data when things change
      />
    );
  }
}
export default <Wrapper />;
