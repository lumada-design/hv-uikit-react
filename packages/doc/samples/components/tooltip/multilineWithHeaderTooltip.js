import React from "react";
import Tooltip from "@hv/uikit-react-core/dist/Tooltip";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@material-ui/core/styles/withStyles";


/* ******************************************************************************
*  ******************************************************************************
*  ******************************************************************************
*
*
*  IMPORTANT - To ensure conformity with the design specs for this component, import
*   the styling provided with the component
*
** ******************************************************************************
* *******************************************************************************
* ***************************************************************************** */
import tooltipStyling from "@hv/uikit-react-core/dist/Tooltip/styles";

const styling = {
  wrapper: {
    height: 170
  },

  placeholder: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 150
  },

  container: {
    width: 100,
    cursor: "pointer",
    color: "#414141"
  },

  typographyAligner: {
    textAlign: "center"
  }
};

const TooltipContent = ({ classes }) => (
  <>
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
  </>
);

const TooltipContentWithStyles = withStyles(tooltipStyling, {
  withTheme: true
})(TooltipContent);


const TooltipControl = (() => {
  return (
    <div tabIndex="0" style={styling.container}>
      <div style={styling.typographyAligner}>
        <HvTypography variant="normalText">Hover here</HvTypography>
      </div>
    </div>
  );
})();

const tooltipData = {
  title: "January",
  elements: [
    {
      name: "Sales",
      value: "52,000 units"
    },
    {
      name: "Profit",
      value: "50%"
    }
  ]
};

export default (
  <div style={styling.wrapper}>
    <div style={styling.placeholder}>
      <>
        <Tooltip
          tooltipData={<TooltipContentWithStyles />}
          useSingle={false}
          tooltipAnchor={TooltipControl}
        />
      </>
    </div>
  </div>
);
