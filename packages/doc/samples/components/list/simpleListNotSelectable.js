import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "Share"
  },
  {
    label: "Edit"
  },
  {
    label: "Remove",
    path: "https://www.hitachivantara.com"
  },
  {
    label: "Delete"
  },
  {
    label: "Update",
    path: "https://www.hitachivantara.com"
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} selectable={false} />
  </div>
);
