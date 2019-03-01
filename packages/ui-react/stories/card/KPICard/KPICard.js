import React from "react";
import Typography from "@material-ui/core/Typography";

import { HvKpi } from "../../../src";

const data = {
  firstTitle: "Related assets",
  firstContent: "Primary asset to be worked on, other asset, other asset",
  secondTitle: "Description",
  secondContent:
    "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary."
};

const ThroughputKpiTextConfiguration = score => ({
  title: "Confidence score",
  indicator: `${score}%`
});

/* eslint react/prop-types: 0 */
const Content = ({ value, icon, classes }) => (
  <div>
    <HvKpi
      kpiTextConfiguration={ThroughputKpiTextConfiguration(value)}
      visualIndicator={icon}
    />
    <div>
      <Typography variant="body1" className={classes.label}>{data.firstTitle}</Typography>
      <Typography variant="body2" className={classes.text}>{data.firstContent}</Typography>
    </div>
    <div style={{ marginTop: "15px" }}>
      <Typography variant="body1" className={classes.label}>{data.secondTitle}</Typography>
      <Typography variant="body2" className={classes.text}>{data.secondContent}</Typography>
    </div>
  </div>
);

export default Content;
