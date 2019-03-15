import React from "react";
import HvTextArea from "@hv-ui/react/core/TextArea";

const inputTextConfiguration= {
    inputLabel: "Label",
    placeholder: "Enter value"
}

export default <HvTextArea label="Text Area" rows={5} inputTextConfiguration={inputTextConfiguration} maxCharQuantity={1500} />;
