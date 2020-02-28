import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
