import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

// To ensure conformity with the design specs for this component,
// import the styling provided with the component
import tooltipStyling from "@hv/uikit-react-core/dist/Tooltip/styles";

const styling = {
  placeholder: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "center",
    paddingTop: 170
  }
};

const data = [
  { name: "Status", value: "Open" },
  { name: "Date", value: "12/08/2018" },
  { name: "Assignee", value: "Management" },
  { name: "Approval", value: "Not yet requested" }
];

const TooltipContent = ({ classes }) => (
  <div className={classes.valueWrapper}>
    {data.map(element => (
      <div key={element.name} className={classes.values}>
        <HvTypography variant="labelText">{element.name}</HvTypography>
        <div className={classes.separator} />
        <HvTypography variant="sText">{element.value}</HvTypography>
      </div>
    ))}
  </div>
);

const TooltipContentWithStyles = withStyles(tooltipStyling)(TooltipContent);

const TooltipControl = (
  <HvTypography tabIndex="0" variant="normalText">
    Tooltip open
  </HvTypography>
);

export default (
  <div style={styling.placeholder}>
    <Tooltip
      tooltipData={<TooltipContentWithStyles />}
      useSingle={false}
      tooltipAnchor={TooltipControl}
      open
    />
  </div>
);
