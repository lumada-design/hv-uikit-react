import React from "react";
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";

const labels = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  placeholder: "Select a range",
  rangeStart: "Start date",
  rangeEnd: "End date"
};
export default (
  <HvDatePicker
    id="DatePicker"
    labels={labels}
    rangeMode
    startValue="2019-06-05"
    endValue="2019-06-10"
  />
);
