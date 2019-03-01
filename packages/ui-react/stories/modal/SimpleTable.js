import React from "react";
import { HvTable } from "../../src";


const getColumns = () => [
  {
    headerText: "Customer",
    accessor: "customer",
    cellType: "alpha-numeric",
    sortable: false,
    width: "150px"
  },
  {
    headerText: "Dealsize",
    accessor: "dealSize",
    cellType: "alpha-numeric",
    sortable: false,
    width: "150px"
  }
];

const dataTypicalExample = [
  {
    id: 1,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small"
  },
  {
    id: 2,
    customer: "Blauer See Auto, Co.",
    dealSize: "Small"
  },
  {
    id: 3,
    customer: "Blauer See Auto, Co.",
    dealSize: "Medium"
  },
  {
    id: 4,
    customer: "Online Diecast Creation",
    dealSize: "Medium"
  },
  {
    id: 5,
    customer: "Vitachrome Inc.",
    dealSize: "Small"
  }
];

const SimpleTable = () => (
  <HvTable
    data={dataTypicalExample}
    columns={getColumns()}
    showPagination={false}
  />
);

export default SimpleTable;
