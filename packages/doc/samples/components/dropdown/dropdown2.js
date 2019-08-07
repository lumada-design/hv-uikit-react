import React from "react";
import HvDropdown from "@hv/uikit-react-core/dist/Dropdown";

const data = [
  {
    label: "value 1",
    selected: false
  },
  {
    label: "value 2",
    selected: false
  },
  {
    label: "value 3",
    selected: true
  },
  {
    label: "value 4",
    selected: false
  },
  {
    label: "value 5 value 5 value 5 555555555555 value value 5",
    selected: false
  },
  {
    label: "value 6"
  },
  {
    label: "value 7"
  },
  {
    label: "value 8",
    selected: true
  },
  {
    label: "value 9",
    selected: true
  },
  {
    label: "value 10"
  },
  {
    label: "value 11"
  },
  {
    label: "value 12"
  }
];

const labels = {
  title: "some label",
  select: "some select",
  selectAll: "some select all",
  cancelLabel: "L-cancel",
  applyLabel: "L-apply",
  multiSelectionAction: "multi",
  multiSelectionConjunction: "and-l"
}

export default (
  <HvDropdown values={data} multiSelect showSearch labels={labels} />
);
