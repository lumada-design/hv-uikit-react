import React from "react";
import HvDatePickerDS from "@hv/uikit-react-lab/dist/DatePickerDS";

const labels = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  placeholder: "Select a range"
};
export default (
  <HvDatePickerDS
    labels={labels}
    rangeMode
    startValue="2019-06-05"
    endValue="2019-06-10"
  />
);
