import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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

const tooltipData = {
  title: "January",
  elements: [
    { name: "Sales", value: "52,000 units" },
    { name: "Profit", value: "50%" }
  ]
};

const TooltipContent = ({ classes }) => (
  <div>
    <div className={classes.title}>
      <div>
        <HvTypography variant="labelText">{tooltipData.title}</HvTypography>
      </div>
    </div>
    <div className={classes.valueWrapper}>
      {tooltipData.elements.map(element => (
        <div key={element.name} className={classes.values}>
          <HvTypography variant="labelText">{element.name}</HvTypography>
          <div className={classes.separator} />
          <HvTypography variant="sText">{element.value}</HvTypography>
        </div>
      ))}
    </div>
  </div>
);

const TooltipContentWithStyles = withStyles(tooltipStyling)(TooltipContent);

const TooltipControl = (
  <HvTypography tabIndex="0" variant="normalText">
    Hover here
  </HvTypography>
);

export default (
  <div style={styling.placeholder}>
    <Tooltip tooltipData={<TooltipContentWithStyles />} useSingle={false}>
      {TooltipControl}
    </Tooltip>
  </div>
);
