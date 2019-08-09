import React from "react";
import List from "@hv/uikit-react-core/dist/List";

const data = [
  {
    label: "98069 Bribie Island",
    selected: false
  },
  {
    label: "98401 Gatton",
    selected: false
  },
  {
    label: "98443 Ingham",
    selected: true
  },
  {
    label: "98456 Moranbah",
    selected: false
  },
  {
    label: "98124 Perkes (New South Wales)",
    selected: false
  }
];

export default (
  <div style={{ width: 200 }}>
    <List values={data} multiSelect />
  </div>
);