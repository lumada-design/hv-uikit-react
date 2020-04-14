import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert your postal code",
  infoText: "Group of letters and numbers added to your address to assist the sorting of mail",
  inputLabel: "Postal code",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default <HvInput labels={labels} maxCharQuantity={5} />;
