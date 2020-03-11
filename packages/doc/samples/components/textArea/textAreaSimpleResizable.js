import React from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

export default <HvTextArea label="Text Area" labels={labels} id="test" rows={5} resizable />;
