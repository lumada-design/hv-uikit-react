import React from "react";
import Button from "@hv-ui/react/core/Button";
import withPopper from "@hv-ui/react/core/Popper/withPopper";

const btn = props => (
  <Button variant="contained" {...props}>
    popper
  </Button>
);

const Result = withPopper(btn, {
  "Asset ID": 2678213,
  Location: "MKT08-Space Mountain",
  "Asset Type": "BS - Brake System"
});

export default <Result />;
