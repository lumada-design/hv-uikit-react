import React from "react";
import HvCard from "@hv-ui/react/core/Card";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      HeaderTitle={configurationNoMedia.title}
      variant="none"
      checkboxValue="value"
      onSelect={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
