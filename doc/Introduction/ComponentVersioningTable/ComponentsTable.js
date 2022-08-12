import React from "react";

import { HvTable } from "@hitachivantara/uikit-react-compat";

const ComponentsTable = ({ tableData, tableColumnsConfig }) => {
  return (
    <HvTable
      data={tableData}
      columns={tableColumnsConfig}
      resizable={false}
      sortable={true}
      defaultSorted={[{ id: "component", desc: false }]}
      showPagination={false}
    />
  );
};

export default ComponentsTable;
