import React from "react";
import Button from "@hv/uikit-react-core/dist/Button";
import withPopper from "@hv/uikit-react-lab/dist/Popper/withPopper";

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
