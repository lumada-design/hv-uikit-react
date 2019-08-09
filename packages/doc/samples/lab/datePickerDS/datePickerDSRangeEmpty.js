import React from "react";
import HvDatePickerDS from "@hv/uikit-react-lab/dist/DatePickerDS";

const labels = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  placeholder: "Select a range"
};
export default <HvDatePickerDS labels={labels} rangeMode />;
