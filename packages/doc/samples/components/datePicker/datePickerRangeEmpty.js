import React from "react";
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";

const labels = {
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  placeholder: "Select a range"
};
export default <HvDatePicker labels={labels} rangeMode />;
