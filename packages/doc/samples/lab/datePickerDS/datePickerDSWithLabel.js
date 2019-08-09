import React from "react";
import HvDatePickerDS from "@hv/uikit-react-lab/dist/DatePickerDS";

const labels = {
  applyLabel: "Ok",
  cancelLabel: "Close",
  title: "This is the title for the date picker",
  placeholder: "Custom placeholder"
}
export default <HvDatePickerDS labels={labels} showActions />;

