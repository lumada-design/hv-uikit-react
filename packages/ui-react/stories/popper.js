import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "@material-ui/core/Button";
import withPopper from "../src/Popper/withPopper";

storiesOf("Popper", module).add("Popper", () => {
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

  return <Result />;
});
