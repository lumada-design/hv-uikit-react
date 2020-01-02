import React from "react";
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";

const labels = {
  applyLabel: "Ok",
  cancelLabel: "Close",
  title: "This is the title for the date picker",
  placeholder: "Custom placeholder"
};
export default <HvDatePicker labels={labels} showActions />;
