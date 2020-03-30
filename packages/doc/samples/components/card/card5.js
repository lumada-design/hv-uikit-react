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
      checkboxProps={{
        value: "value",
        "aria-label": "leaf checkbox",
        inputProps: {
          "aria-label": "leaf input"
        }
      }}
      cardButtonProps={{
        "aria-label": "leaf"
      }}
      headerProps={{
        "aria-label": "leaf"
      }}
      footerProps={{
        "aria-label": "leaf"
      }}
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
